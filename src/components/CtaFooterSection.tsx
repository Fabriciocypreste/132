import React, { useState } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import {
  FOOTER_COLUMNS,
  PlanId,
  resolveInfoTopic,
} from '../utils/streaming';
import { BrandLogo } from './BrandLogo';
import { HlsBackgroundVideo } from './HlsBackgroundVideo';
import { ActiveModal, StreamingModals } from './StreamingModals';

export const CtaFooterSection: React.FC = () => {
  const [modal, setModal] = useState<ActiveModal>({ type: 'none' });

  const openTrial = (planId: PlanId = 'familia') => {
    setModal({ type: 'trial', initialPlan: planId });
  };

  const openCatalog = () => {
    setModal({ type: 'catalog' });
  };

  const openTopic = (topicId: string) => {
    setModal({ type: 'topic', topic: resolveInfoTopic(topicId) });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#842000] text-[#FFF8F2]">
      {/* =================================================================== */}
      {/* CTA HERO SECTION WITH FULLSCREEN HLS VIDEO + ORANGE CINEMATIC DEPTH */}
      {/* =================================================================== */}
      <section
        aria-label="Chamada principal My Family Plus"
        className="relative flex min-h-[78vh] w-full flex-col justify-between overflow-hidden"
      >
        <HlsBackgroundVideo />

        {/* Subtle Top Editorial Brand Header */}
        <header className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between gap-8 px-6 py-6 sm:px-10">
          <a
            href="#inicio"
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFF8F2]"
            aria-label="Página inicial My Family Plus"
          >
            <BrandLogo size="footer" />
          </a>

          <nav
            aria-label="Navegação rápida"
            className="hidden items-center gap-7 text-sm font-medium text-[#FFF8F2]/90 md:flex"
          >
            <button
              type="button"
              onClick={openCatalog}
              className="whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFF8F2]"
            >
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => openTopic('originais')}
              className="whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFF8F2]"
            >
              Originais 4K
            </button>
            <button
              type="button"
              onClick={() => openTopic('kids')}
              className="whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFF8F2]"
            >
              Espaço Kids
            </button>
            <button
              type="button"
              onClick={() => openTopic('planos')}
              className="whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFF8F2]"
            >
              Planos
            </button>
          </nav>

          <button
            type="button"
            onClick={() => openTrial('familia')}
            className="mfp-liquid-glass-primary min-h-[42px] shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold tracking-wide sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
          >
            Entrar no M+
          </button>
        </header>

        {/* Central Cinematic CTA Content */}
        <main
          id="inicio"
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-24"
        >
          <div className="mb-6 flex justify-center">
            <BrandLogo size="hero" showWordmark={false} />
          </div>

          <h1
            className="font-display max-w-4xl text-[clamp(2.25rem,4.6vw,4.15rem)] leading-[1.08] font-extrabold tracking-tight text-[#FFF8F2] drop-shadow-[0_6px_28px_rgba(132,32,0,0.75)]"
            style={{ textWrap: 'balance' }}
          >
            Grandes histórias para reunir toda a família na mesma tela.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed font-normal text-[#FFF8F2]/92 sm:text-lg">
            Assista a estreias de cinema, séries originais, animações e documentários em 4K HDR e Dolby Atmos, sem anúncios e com perfis seguros para cada idade.
          </p>

          {/* Dual Liquid Glass Action Buttons */}
          <div className="mt-9 flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary Button: Translucent Liquid Glass with Luminous Orange Contour */}
            <button
              type="button"
              onClick={() => openTrial('familia')}
              className="mfp-liquid-glass-primary inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl px-7 py-3.5 text-base font-bold sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
            >
              <span>Começar 7 dias grátis</span>
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </button>

            {/* Secondary Button: Warm White with Dark Orange Text (#C83200) */}
            <button
              type="button"
              onClick={openCatalog}
              className="mfp-liquid-glass-secondary inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl px-7 py-3.5 text-base font-bold sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
            >
              <PlayCircle className="h-5 w-5 shrink-0 text-[#C83200]" aria-hidden="true" />
              <span>Explorar catálogo e planos</span>
            </button>
          </div>

          {/* Unboxed Typographic Metadata Strip (Zero-Pill Rule) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium tracking-wide text-[#FFF8F2]/80 sm:text-sm">
            <span>4K Ultra HD + HDR10</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Até 5 telas simultâneas</span>
            <span aria-hidden="true">·</span>
            <span>Espaço Kids com PIN</span>
            <span aria-hidden="true">·</span>
            <span>Cancele quando quiser</span>
          </div>
        </main>
      </section>

      {/* =================================================================== */}
      {/* FOOTER WITH TRANSLUCENT DIVIDERS, WHITE LINKS & VIBRANT ORANGE HOVER */}
      {/* =================================================================== */}
      <footer
        aria-label="Rodapé My Family Plus"
        className="relative z-10 border-t border-[#FFF8F2]/20"
        style={{
          background:
            'linear-gradient(180deg, rgba(168, 42, 0, 0.96) 0%, #842000 55%, #661700 100%)',
        }}
      >
        {/* Subtle luminous orange hairline top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF790E]/75 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <BrandLogo size="footer" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FFF8F2]/80">
                A casa do entretenimento familiar em alta definição. Filmes, séries, animações e cultura compartilhados com segurança em qualquer dispositivo.
              </p>
              <div className="mt-6 border-t border-[#FFF8F2]/15 pt-4 text-xs text-[#FFF8F2]/75">
                Smart TVs · Web · iOS &amp; Android · Apple TV · Chromecast
              </div>
            </div>

            {/* Navigation Link Columns */}
            <div className="grid grid-cols-1 gap-8 border-t border-[#FFF8F2]/15 pt-8 sm:grid-cols-3 lg:col-span-8 lg:border-t-0 lg:border-l lg:border-[#FFF8F2]/15 lg:pt-0 lg:pl-12">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title}>
                  <h2 className="font-display text-sm font-bold tracking-wide text-[#FFF8F2]">
                    {column.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5 border-t border-[#FFF8F2]/12 pt-4">
                    {column.links.map((link) => (
                      <li key={link.id}>
                        <button
                          type="button"
                          onClick={() => openTopic(link.topicId)}
                          className="group inline-flex min-h-[32px] cursor-pointer items-center text-left text-sm font-medium text-[#FFF8F2]/88 transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF790E]"
                        >
                          <span>{link.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Copyright & Translucent Divider */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#FFF8F2]/15 pt-7 text-xs text-[#FFF8F2]/75 sm:flex-row sm:items-center">
            <p>© 2026 My Family Plus (M+). Todos os direitos reservados.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={() => openTopic('privacidade')}
                className="cursor-pointer text-[#FFF8F2]/85 transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF790E]"
              >
                Política de Privacidade
              </button>
              <span aria-hidden="true" className="text-[#FFF8F2]/35">
                |
              </span>
              <button
                type="button"
                onClick={() => openTopic('termos')}
                className="cursor-pointer text-[#FFF8F2]/85 transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF790E]"
              >
                Termos de Serviço
              </button>
              <span aria-hidden="true" className="text-[#FFF8F2]/35">
                |
              </span>
              <button
                type="button"
                onClick={() => openTopic('ajuda')}
                className="cursor-pointer text-[#FFF8F2]/85 transition-colors duration-150 hover:text-[#FF790E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF790E]"
              >
                Português (Brasil)
              </button>
            </div>
          </div>
        </div>
      </footer>

      <StreamingModals
        modal={modal}
        onClose={() => setModal({ type: 'none' })}
        onOpenTrial={(planId) => openTrial(planId ?? 'familia')}
      />
    </div>
  );
};
