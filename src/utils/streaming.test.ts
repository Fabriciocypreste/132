import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePlanPricing,
  formatBrl,
  FOOTER_COLUMNS,
  resolveInfoTopic,
  selectHlsPlaybackStrategy,
  validateTrialSignup,
} from './streaming';

test('selectHlsPlaybackStrategy prefers hls.js when supported, then native, then fallback', () => {
  assert.equal(
    selectHlsPlaybackStrategy({ isHlsJsSupported: true, canPlayNativeHls: true }),
    'hls.js',
  );
  assert.equal(
    selectHlsPlaybackStrategy({ isHlsJsSupported: false, canPlayNativeHls: true }),
    'native',
  );
  assert.equal(
    selectHlsPlaybackStrategy({ isHlsJsSupported: false, canPlayNativeHls: false }),
    'fallback',
  );
});

test('calculatePlanPricing computes monthly and annual BRL pricing with discount', () => {
  const monthly = calculatePlanPricing('familia', 'monthly');
  assert.equal(monthly.monthlyEquivalent, 39.9);
  assert.equal(monthly.billedTotal, 39.9);
  assert.equal(monthly.discountPercent, 0);
  assert.equal(monthly.formattedMonthly, 'R$ 39,90');

  const annual = calculatePlanPricing('familia', 'annual');
  assert.equal(annual.monthlyEquivalent, 31.9);
  assert.equal(annual.billedTotal, 382.8);
  assert.equal(annual.discountPercent, 20);
  assert.equal(annual.formattedMonthly, 'R$ 31,90');
  assert.equal(annual.formattedTotal, 'R$ 382,80');
});

test('formatBrl formats Brazilian Real currency consistently', () => {
  assert.equal(formatBrl(24.9), 'R$ 24,90');
  assert.equal(formatBrl(19.9), 'R$ 19,90');
});

test('validateTrialSignup validates required name and email fields', () => {
  const invalid = validateTrialSignup({
    name: 'A',
    email: 'invalid-email',
    planId: 'familia',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);

  const valid = validateTrialSignup({
    name: 'Mariana Silva',
    email: 'mariana@familia.com.br',
    planId: 'familia',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('all footer links resolve to a matching topic detail', () => {
  for (const col of FOOTER_COLUMNS) {
    for (const link of col.links) {
      const detail = resolveInfoTopic(link.topicId);
      assert.equal(detail.id, link.topicId);
      assert.ok(detail.title.length > 0);
      assert.ok(detail.highlights.length >= 3);
    }
  }
});
