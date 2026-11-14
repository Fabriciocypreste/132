export type BillingCycle = 'monthly' | 'annual';
export type PlanId = 'essencial' | 'familia';
export type HlsStrategy = 'hls.js' | 'native' | 'fallback';

export interface HlsStreamSource {
  id: string;
  label: string;
  url: string;
}

export const HLS_STREAM_SOURCES: HlsStreamSource[] = [
  {
    id: 'mux-showcase',
    label: 'My Family Plus Showcase 4K',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    id: 'apple-bipbop',
    label: 'My Family Plus Backup Stream',
    url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
  },
];

export interface StreamingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  maxScreens: number;
  resolution: string;
  audio: string;
  features: string[];
}

export const STREAMING_PLANS: Record<PlanId, StreamingPlan> = {
  essencial: {
    id: 'essencial',
    name: 'M+ Essencial',
    tagline: 'Ideal para assistir em Full HD sem anúncios',
    monthlyPrice: 24.9,
    annualMonthlyPrice: 19.9,
    maxScreens: 2,
    resolution: 'Full HD 1080p',
    audio: 'Áudio Espacial Estéreo',
    features: [
      '2 telas simultâneas',
      'Catálogo completo sem anúncios',
      'Perfis infantis com controle parental',
      'Downloads para assistir offline',
    ],
  },
  familia: {
    id: 'familia',
    name: 'M+ Família 4K',
    tagline: 'Cinema em casa com 4K HDR e Dolby Atmos',
    monthlyPrice: 39.9,
    annualMonthlyPrice: 31.9,
    maxScreens: 5,
    resolution: '4K Ultra HD + HDR10',
    audio: 'Dolby Atmos Imersivo',
    features: [
      'Até 5 telas simultâneas',
      'Qualidade 4K Ultra HD e HDR10',
      'Até 6 perfis personalizados',
      'Estreias simultâneas e modo família',
    ],
  },
};

export interface CalculatedPricing {
  plan: StreamingPlan;
  cycle: BillingCycle;
  monthlyEquivalent: number;
  billedTotal: number;
  discountPercent: number;
  formattedMonthly: string;
  formattedTotal: string;
}

export function formatBrl(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function calculatePlanPricing(
  planId: PlanId,
  cycle: BillingCycle,
): CalculatedPricing {
  const plan = STREAMING_PLANS[planId];
  const monthlyEquivalent =
    cycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;
  const billedTotal =
    cycle === 'annual'
      ? Number((plan.annualMonthlyPrice * 12).toFixed(2))
      : plan.monthlyPrice;
  const discountPercent =
    cycle === 'annual'
      ? Math.round((1 - plan.annualMonthlyPrice / plan.monthlyPrice) * 100)
      : 0;

  return {
    plan,
    cycle,
    monthlyEquivalent,
    billedTotal,
    discountPercent,
    formattedMonthly: formatBrl(monthlyEquivalent),
    formattedTotal: formatBrl(billedTotal),
  };
}

export function selectHlsPlaybackStrategy(capabilities: {
  isHlsJsSupported: boolean;
  canPlayNativeHls: boolean;
}): HlsStrategy {
  if (capabilities.isHlsJsSupported) {
    return 'hls.js';
  }
  if (capabilities.canPlayNativeHls) {
    return 'native';
  }
  return 'fallback';
}

export interface TrialSignupInput {
  name: string;
  email: string;
  planId: PlanId;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateTrialSignup(input: TrialSignupInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Informe seu nome completo (mínimo 2 caracteres).';
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Digite um e-mail válido para ativar seus 7 dias grátis.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface FooterLinkItem {
  id: string;
  label: string;
  topicId: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Plataforma',
    links: [
      { id: 'catalogo', label: 'Catálogo M+', topicId: 'catalogo' },
      { id: 'originais', label: 'Originais em 4K', topicId: 'originais' },
      { id: 'planos', label: 'Planos e Preços', topicId: 'planos' },
      { id: 'dispositivos', label: 'Onde Assistir', topicId: 'dispositivos' },
    ],
  },
  {
    title: 'Experiência Família',
    links: [
      { id: 'kids', label: 'Espaço Kids', topicId: 'kids' },
      { id: 'parental', label: 'Controle Parental', topicId: 'parental' },
      { id: 'offline', label: 'Downloads Offline', topicId: 'offline' },
      { id: 'acessibilidade', label: 'Audiodescrição & Libras', topicId: 'acessibilidade' },
    ],
  },
  {
    title: 'Suporte & Legal',
    links: [
      { id: 'ajuda', label: 'Central de Ajuda', topicId: 'ajuda' },
      { id: 'privacidade', label: 'Privacidade', topicId: 'privacidade' },
      { id: 'termos', label: 'Termos de Uso', topicId: 'termos' },
      { id: 'contato', label: 'Fale Conosco', topicId: 'contato' },
    ],
  },
];

export interface TopicDetail {
  id: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
}

export const TOPIC_DETAILS: Record<string, TopicDetail> = {
  catalogo: {
    id: 'catalogo',
    category: 'Plataforma',
    title: 'Catálogo My Family Plus',
    description:
      'Mais de 4.500 títulos selecionados para reunir gerações: estreias de cinema, séries aclamadas, animações premiadas e documentários inspiradores.',
    highlights: [
      'Novos lançamentos toda sexta-feira',
      'Curadoria segura para todas as idades',
      'Sem anúncios em nenhum plano',
    ],
  },
  originais: {
    id: 'originais',
    category: 'Plataforma',
    title: 'Originais M+ em 4K HDR',
    description:
      'Produções exclusivas My Family Plus gravadas com fidelidade cinematográfica, Dolby Vision e som espacial Dolby Atmos.',
    highlights: [
      'Séries de aventura e drama familiar',
      'Especiais musicais e animações autorais',
      'Streaming adaptativo de baixa latência via HLS',
    ],
  },
  planos: {
    id: 'planos',
    category: 'Plataforma',
    title: 'Planos Flexíveis sem Fidelidade',
    description:
      'Escolha entre M+ Essencial (2 telas em Full HD) ou M+ Família 4K (5 telas simultâneas). Comece com 7 dias gratuitos.',
    highlights: [
      'Economize 20% na assinatura anual',
      'Cancelamento imediato em 1 clique',
      'Até 6 perfis individuais incluídos',
    ],
  },
  dispositivos: {
    id: 'dispositivos',
    category: 'Plataforma',
    title: 'Assista em Qualquer Tela',
    description:
      'Sincronize seu progresso automaticamente entre Smart TVs, navegadores, celulares, tablets e consoles.',
    highlights: [
      'Samsung, LG, Android TV e Apple TV',
      'iOS, Android e navegadores modernos',
      'Espelhamento nativo Chromecast e AirPlay',
    ],
  },
  kids: {
    id: 'kids',
    category: 'Experiência Família',
    title: 'Espaço Kids Seguro',
    description:
      'Um ambiente exclusivo com interface simplificada, personagens favoritos e filtros rigorosos por faixa etária.',
    highlights: [
      'Classificação indicativa verificada',
      'Bloqueio de saída por PIN familiar',
      'Temporizador de tempo de tela',
    ],
  },
  parental: {
    id: 'parental',
    category: 'Experiência Família',
    title: 'Controle Parental Inteligente',
    description:
      'Defina limites de classificação etária por perfil, gerencie horários de exibição e proteja conteúdos adultos com código PIN.',
    highlights: [
      'Perfis independentes para cada membro',
      'Histórico separado por usuário',
      'Configuração rápida no app ou navegador',
    ],
  },
  offline: {
    id: 'offline',
    category: 'Experiência Família',
    title: 'Downloads para Viagens',
    description:
      'Baixe filmes e temporadas inteiras no celular ou tablet para assistir no avião, na estrada ou sem conexão.',
    highlights: [
      'Escolha a qualidade para economizar espaço',
      'Renovação automática via Wi-Fi',
      'Até 25 títulos salvos simultaneamente',
    ],
  },
  acessibilidade: {
    id: 'acessibilidade',
    category: 'Experiência Família',
    title: 'Acessibilidade Completa',
    description:
      'Entretenimento inclusivo com legendas descritivas personalizáveis, audiodescrição em português e suporte a navegação por teclado.',
    highlights: [
      'Legendas com tamanho e contraste ajustáveis',
      'Audiodescrição nativa nos originais M+',
      'Compatível com leitores de tela',
    ],
  },
  ajuda: {
    id: 'ajuda',
    category: 'Suporte & Legal',
    title: 'Central de Ajuda 24/7',
    description:
      'Suporte humano em português todos os dias da semana para configuração de TV, faturamento ou qualidade de reprodução.',
    highlights: [
      'Atendimento via chat e e-mail em até 5 min',
      'Guias passo a passo por modelo de TV',
      'Diagnóstico automático de velocidade HLS',
    ],
  },
  privacidade: {
    id: 'privacidade',
    category: 'Suporte & Legal',
    title: 'Compromisso com Privacidade',
    description:
      'Seus dados e os perfis das crianças são protegidos em total conformidade com a LGPD, sem venda de informações para anunciantes.',
    highlights: [
      'Zero rastreamento publicitário em perfis Kids',
      'Criptografia ponta a ponta na conta',
      'Exportação e exclusão de dados sob demanda',
    ],
  },
  termos: {
    id: 'termos',
    category: 'Suporte & Legal',
    title: 'Termos de Uso Transparentes',
    description:
      'Assinatura transparente sem letras miúdas, multas de rescisão ou cobranças ocultas durante o período de teste gratuito.',
    highlights: [
      'Lembrete 48h antes do fim do teste grátis',
      'Uso pessoal e familiar garantido',
      'Reembolso integral previsto no CDC',
    ],
  },
  contato: {
    id: 'contato',
    category: 'Suporte & Legal',
    title: 'Fale com a Equipe My Family Plus',
    description:
      'Dúvidas comerciais, parcerias de operadoras ou suporte à sua assinatura? Nossa equipe responde rapidamente.',
    highlights: [
      'suporte@myfamilyplus.com.br',
      'Imprensa e parcerias: parcerias@myfamilyplus.com.br',
      'Atendimento nacional em todo o Brasil',
    ],
  },
};

export function resolveInfoTopic(topicId: string): TopicDetail {
  return TOPIC_DETAILS[topicId] ?? TOPIC_DETAILS.catalogo;
}
