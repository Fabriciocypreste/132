import React, { useEffect, useState } from 'react';
import {
  Check,
  Film,
  MonitorSmartphone,
  ShieldCheck,
  Tv,
  X,
} from 'lucide-react';
import {
  BillingCycle,
  calculatePlanPricing,
  PlanId,
  STREAMING_PLANS,
  TopicDetail,
  validateTrialSignup,
} from '../utils/streaming';
import { BrandLogo } from './BrandLogo';

export type ActiveModal =
  | { type: 'none' }
  | { type: 'trial'; initialPlan?: PlanId }
  | { type: 'catalog' }
  | { type: 'topic'; topic: TopicDetail };

interface StreamingModalsProps {
  modal: ActiveModal;
  onClose: () => void;
  onOpenTrial: (planId?: PlanId) => void;
}

const CATALOG_COLLECTIONS = [
  {
    title: 'Cinema em Família 4K',
    meta: 'Estreias · HDR10 · Áudio Original e Dublado',
    description:
      'Sucessos recentes de bilheteria e clássicos restaurados para assistir na sala com qualidade de cinema.',
    icon: Film,
  },
  {
    title: 'Originais My Family Plus',
    meta: 'Séries Exclusivas · Dolby Atmos',
    description:
      'Dramas envolventes, aventuras juvenis e documentários produzidos especialmente para o catálogo M+.',
    icon: Tv,
  },
  {
    title: 'Espaço Kids Protegido',
    meta: 'Classificação Livre · Controle por PIN',
    description:
      'Animações educativas, séries infantis e filmes escolhidos com curadoria pedagógica segura.',
    icon: ShieldCheck,
  },
  {
    title: 'Multi-Telas Sincronizadas',
    meta: 'Smart TVs · Celulares · Tablets · Web',
    description:
      'Continue exatamente de onde parou em qualquer tela da casa, com até 5 transmissões simultâneas.',
    icon: MonitorSmartphone,
  },
];

export const StreamingModals: React.FC<StreamingModalsProps> = ({
  modal,
  onClose,
  onOpenTrial,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('familia');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (modal.type === 'trial') {
      setSelectedPlan(modal.initialPlan ?? 'familia');
      setSubmitted(false);
      setErrors({});
    }
  }, [modal]);

  useEffect(() => {
    if (modal.type === 'none') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.type, onClose]);

  if (modal.type === 'none') return null;

  const pricing = calculatePlanPricing(selectedPlan, billingCycle);

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTrialSignup({
      name,
      email,
      planId: selectedPlan,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mfp-modal-title"
    >
      {/* Dark orange atmospheric backdrop */}
      <div
        className="fixed inset-0 bg-[#842000]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="mfp-glass-panel relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 text-[#FFF8F2] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#FFF8F2]/15 pb-5">
          <BrandLogo size="footer" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="mfp-glass-chip-control inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#FFF8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {modal.type === 'trial' && (
          <div className="mt-6">
            {!submitted ? (
              <form onSubmit={handleTrialSubmit} noValidate className="space-y-6">
                <div>
                  <h2
                    id="mfp-modal-title"
                    className="font-display text-2xl font-bold tracking-tight text-[#FFF8F2] sm:text-3xl"
                  >
                    Comece seus 7 dias grátis no M+
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#FFF8F2]/85">
                    Escolha o plano ideal para sua casa. Você não paga nada hoje e pode cancelar a qualquer momento.
                  </p>
                </div>

                {/* Billing Cycle Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FFF8F2]/15 bg-[#842000]/50 p-2">
                  <span className="px-2 text-sm font-medium text-[#FFF8F2]/90">
                    Ciclo de assinatura
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`min-h-[40px] whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        billingCycle === 'monthly'
                          ? 'bg-[#FFF8F2] text-[#C83200]'
                          : 'text-[#FFF8F2]/85 hover:text-[#FFF8F2]'
                      }`}
                    >
                      Mensal
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className={`min-h-[40px] whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        billingCycle === 'annual'
                          ? 'bg-[#FFF8F2] text-[#C83200]'
                          : 'text-[#FFF8F2]/85 hover:text-[#FFF8F2]'
                      }`}
                    >
                      Anual (20% off)
                    </button>
                  </div>
                </div>

                {/* Plan Selector */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(['essencial', 'familia'] as PlanId[]).map((planId) => {
                    const plan = STREAMING_PLANS[planId];
                    const planCalc = calculatePlanPricing(planId, billingCycle);
                    const isSelected = selectedPlan === planId;
                    return (
                      <button
                        key={planId}
                        type="button"
                        onClick={() => setSelectedPlan(planId)}
                        className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? 'border-[#FFF8F2] bg-[#FF5A00]/35 shadow-[0_0_24px_rgba(255,121,14,0.35)]'
                            : 'border-[#FFF8F2]/20 bg-[#842000]/45 hover:border-[#FF790E]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-lg font-bold text-[#FFF8F2]">
                              {plan.name}
                            </span>
                            {isSelected && (
                              <Check className="h-5 w-5 text-[#FFF8F2]" aria-hidden="true" />
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[#FFF8F2]/80">
                            {plan.resolution} · {plan.maxScreens} telas
                          </p>
                        </div>
                        <div className="mt-4">
                          <span className="font-display text-2xl font-extrabold tabular-nums text-[#FFF8F2]">
                            {planCalc.formattedMonthly}
                          </span>
                          <span className="text-xs text-[#FFF8F2]/75">/mês após o teste</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="mfp-signup-name"
                      className="block text-sm font-medium text-[#FFF8F2]"
                    >
                      Nome completo
                    </label>
                    <input
                      id="mfp-signup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Mariana Oliveira"
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-[#FFF8F2]/25 bg-[#842000]/55 px-4 py-2.5 text-sm text-[#FFF8F2] placeholder:text-[#FFF8F2]/50 focus:border-[#FF790E] focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-[#FFF8F2]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="mfp-signup-email"
                      className="block text-sm font-medium text-[#FFF8F2]"
                    >
                      E-mail da conta
                    </label>
                    <input
                      id="mfp-signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@exemplo.com.br"
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-[#FFF8F2]/25 bg-[#842000]/55 px-4 py-2.5 text-sm text-[#FFF8F2] placeholder:text-[#FFF8F2]/50 focus:border-[#FF790E] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-[#FFF8F2]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-stretch justify-between gap-4 border-t border-[#FFF8F2]/15 pt-5 sm:flex-row sm:items-center">
                  <div className="text-xs text-[#FFF8F2]/80">
                    Plano selecionado:{' '}
                    <strong className="text-[#FFF8F2]">{pricing.plan.name}</strong> ·{' '}
                    <span className="tabular-nums">{pricing.formattedMonthly}/mês</span>
                  </div>
                  <button
                    type="submit"
                    className="mfp-liquid-glass-secondary min-h-[46px] whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold"
                  >
                    Ativar 7 dias grátis
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5 py-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF790E] text-[#FFF8F2] shadow-[0_0_24px_rgba(255,121,14,0.6)]">
                  <Check className="h-6 w-6" />
                </div>
                <h2
                  id="mfp-modal-title"
                  className="font-display text-2xl font-bold text-[#FFF8F2] sm:text-3xl"
                >
                  Acesso M+ preparado para {name.trim()}
                </h2>
                <p className="text-sm leading-relaxed text-[#FFF8F2]/85">
                  Enviamos o link de ativação do plano{' '}
                  <strong className="text-[#FFF8F2]">{pricing.plan.name}</strong> ({pricing.formattedMonthly}/mês após 7 dias grátis) para{' '}
                  <strong className="text-[#FFF8F2]">{email.trim()}</strong>.
                </p>
                <div className="rounded-xl border border-[#FFF8F2]/20 bg-[#842000]/55 p-4 text-sm text-[#FFF8F2]/90">
                  <p className="font-semibold text-[#FFF8F2]">Incluído imediatamente:</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#FFF8F2]/85">
                    {pricing.plan.features.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#FF790E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mfp-liquid-glass-primary min-h-[44px] rounded-xl px-6 py-2.5 text-sm font-semibold"
                  >
                    Voltar para a página inicial
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {modal.type === 'catalog' && (
          <div className="mt-6 space-y-6">
            <div>
              <h2
                id="mfp-modal-title"
                className="font-display text-2xl font-bold tracking-tight text-[#FFF8F2] sm:text-3xl"
              >
                Tudo o que a sua família ama em um só lugar
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#FFF8F2]/85">
                Explore as coleções principais do My Family Plus (M+) e descubra planos sem anúncios com qualidade 4K HDR.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CATALOG_COLLECTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#FFF8F2]/18 bg-[#842000]/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0 text-[#FF790E]" aria-hidden="true" />
                      <h3 className="font-display text-base font-bold text-[#FFF8F2]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-[#FFF8F2]/70">{item.meta}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#FFF8F2]/85">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#FFF8F2]/15 pt-5">
              <p className="text-sm text-[#FFF8F2]/85">
                A partir de <strong className="tabular-nums text-[#FFF8F2]">R$ 19,90/mês</strong> no plano anual.
              </p>
              <button
                type="button"
                onClick={() => onOpenTrial('familia')}
                className="mfp-liquid-glass-secondary min-h-[44px] whitespace-nowrap rounded-xl px-6 py-2.5 text-sm font-bold"
              >
                Iniciar 7 dias grátis
              </button>
            </div>
          </div>
        )}

        {modal.type === 'topic' && (
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#FF790E] uppercase">
                {modal.topic.category}
              </p>
              <h2
                id="mfp-modal-title"
                className="mt-1 font-display text-2xl font-bold tracking-tight text-[#FFF8F2] sm:text-3xl"
              >
                {modal.topic.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#FFF8F2]/88">
                {modal.topic.description}
              </p>
            </div>

            <div className="rounded-xl border border-[#FFF8F2]/18 bg-[#842000]/55 p-4">
              <ul className="space-y-2.5 text-sm text-[#FFF8F2]/90">
                {modal.topic.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF790E]" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#FFF8F2]/15 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="mfp-liquid-glass-primary min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-semibold"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => onOpenTrial('familia')}
                className="mfp-liquid-glass-secondary min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-bold"
              >
                Assinar M+ Família
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
