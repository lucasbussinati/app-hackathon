import type { Duration, EmotionalPresence, Intensity, ReflexZone } from "../data/types";
import { LANG } from "./config";

/**
 * All user-facing UI copy, plus labels for the raw enums/tags that screens
 * render directly. Content that lives in the data modules (emotion names,
 * body regions, reflex points) is localized separately via ./content.
 */
export interface Strings {
  meta: { title: string };
  header: { tagline: string };
  nav: { home: string; history: string; about: string };
  switcher: { aria: string };
  welcome: {
    greeting: string;
    intro: string;
    start: string;
    viewPast: string;
    body: string;
    emotions: string;
    points: string;
  };
  body: {
    step: string;
    title: string;
    subtitle: string;
    feelLike: string;
    intensity: string;
    duration: string;
    back: string;
    next: string;
    intensities: Record<Intensity, string>;
    durations: Record<Duration, string>;
  };
  emotions: {
    step: string;
    title: string;
    subtitle: string;
    wheelHint: string;
    selected: string;
    nothingYet: string;
    strength: string;
    strengthHint: string;
    presence: Record<EmotionalPresence, { label: string; hint: string }>;
    ackTitle: string;
    optional: string;
    ackHint: string;
    notePlaceholder: string;
    back: string;
    next: string;
    familyTag: string;
    clusterTag: string;
    remove: string;
  };
  results: {
    step: string;
    title: string;
    subtitle: (n: number) => string;
    basedOn: string;
    whatYouNoted: string;
    howTo: string;
    whyHelps: string;
    suggestedFor: string;
    pressure: string;
    done: string;
    newSession: string;
    emptyText: string;
    beginAssessment: string;
    diagram: (name: string) => string;
  };
  history: {
    title: string;
    clearAll: string;
    clearConfirm: string;
    emptyTitle: string;
    emptyText: string;
    startNow: string;
    delete: string;
    deleteAria: string;
    body: string;
    emotions: string;
    recommended: string;
    note: string;
  };
  wheel: { aria: string; center: string; empty: string; picked: (n: number) => string };
  bodyMap: { aria: string; hint: string };
  about: {
    title: string;
    subtitle: string;
    brainLabel: string;
    role: string;
    chips: string[];
    bioBefore: string;
    bioName: string;
    bioAfter: string;
    cta: string;
    opensWhatsapp: string;
    whatsappMessage: string;
    whatIsTitle: string;
    whatIsP1: string;
    whatIsP2: string;
    howTitle: string;
    howP1: string;
    howP2: string;
  };
  enums: {
    zone: Record<ReflexZone, string>;
    pressure: Record<"light" | "medium" | "firm", string>;
    intensity: Record<Intensity, string>;
    duration: Record<Duration, string>;
    presencePhrase: Record<EmotionalPresence, string>;
  };
  /** Match-reason tags shown on the results screen. Empty in English (raw tag is shown). */
  tagLabels: Record<string, string>;
}

const en: Strings = {
  meta: { title: "Sole — Reflexology Wellness" },
  header: { tagline: "Reflexology, gently guided" },
  nav: { home: "Home", history: "History", about: "About" },
  switcher: { aria: "Switch language" },
  welcome: {
    greeting: "Hi, take a breath.",
    intro:
      "Sole maps how your body and feelings show up today, then guides you to reflexology points that may bring relief.",
    start: "Start a session",
    viewPast: "View past sessions",
    body: "Body",
    emotions: "Emotions",
    points: "Points",
  },
  body: {
    step: "Step 1 of 3",
    title: "Where does it ask for attention?",
    subtitle: "Tap the areas of your body and the type of feeling. Skip what doesn't apply.",
    feelLike: "What does it feel like?",
    intensity: "Intensity",
    duration: "How long has it been?",
    back: "Back",
    next: "Next — emotions",
    intensities: { mild: "Mild", moderate: "Moderate", intense: "Intense" },
    durations: { acute: "Just today", recurring: "On and off", chronic: "Ongoing" },
  },
  emotions: {
    step: "Step 2 of 3",
    title: "How are you feeling?",
    subtitle:
      "Start broad in the middle, or get specific on the edges. Feelings often come in layers — pick as many as resonate.",
    wheelHint: "Tap a family, a cluster, or a specific feeling — at any level.",
    selected: "Selected",
    nothingYet: "Nothing yet — tap a wedge above. You can pick more than one.",
    strength: "How strongly are these showing up?",
    strengthHint: "A gentle gauge — it helps shape your recommendations.",
    presence: {
      subtle: { label: "Subtle", hint: "in the background" },
      present: { label: "Present", hint: "clearly here" },
      intense: { label: "Intense", hint: "feels loud" },
    },
    ackTitle: "Anything you'd like to acknowledge?",
    optional: "optional",
    ackHint: "A line or two for yourself — what's brought this on. Saved with your session.",
    notePlaceholder: "e.g. Sleep was rough last night, and that presentation tomorrow…",
    back: "Back",
    next: "See my recommendations",
    familyTag: "family ·",
    clusterTag: "cluster ·",
    remove: "Remove",
  },
  results: {
    step: "Step 3 of 3",
    title: "Your reflexology plan",
    subtitle: (n) => `${n} points tailored to how you're feeling right now.`,
    basedOn: "Based on",
    whatYouNoted: "What you noted",
    howTo: "How to do it",
    whyHelps: "Why it helps",
    suggestedFor: "Suggested for:",
    pressure: "Pressure:",
    done: "Done",
    newSession: "New session",
    emptyText: "Nothing to recommend yet — let's start a session first.",
    beginAssessment: "Begin assessment",
    diagram: (name) => `${name} diagram`,
  },
  history: {
    title: "History",
    clearAll: "Clear all",
    clearConfirm: "Clear all saved sessions?",
    emptyTitle: "No sessions yet",
    emptyText: "Once you complete a session, you'll find it here to revisit.",
    startNow: "Start one now",
    delete: "Delete",
    deleteAria: "Delete session",
    body: "Body",
    emotions: "Emotions",
    recommended: "Recommended",
    note: "Note",
  },
  wheel: {
    aria: "Wheel of emotions",
    center: "You",
    empty: "tap any wedge",
    picked: (n) => `${n} picked`,
  },
  bodyMap: {
    aria: "Human body silhouette",
    hint: "Tap any area where you feel discomfort.",
  },
  about: {
    title: "About Sole",
    subtitle: "A small, calm companion for everyday self-care.",
    brainLabel: "The brain behind Sole",
    role: "Certified Reflexology Specialist",
    chips: ["Feet", "Hands", "Ears", "Holistic care"],
    bioBefore:
      "Every point, every instruction, and every connection between body and emotion in Sole comes from ",
    bioName: "Friederike's",
    bioAfter:
      " hands-on practice. The app is a small window into her work — for the real depth, the personalized touch, and the listening, you'll want a session with her.",
    cta: "Enjoyed the content? Schedule a session",
    opensWhatsapp: "Opens WhatsApp · ",
    whatsappMessage:
      "Hi Friederike! I tried Sole, the reflexology app, and I'd love to schedule a session with you.",
    whatIsTitle: "What Sole is",
    whatIsP1:
      "Reflexology is a touch practice based on the idea that points on the feet, hands and ears correspond to other parts of the body. Sole helps you find a few points to try based on how you say you feel — physically and emotionally — right now.",
    whatIsP2:
      "The point catalogue, instructions, and the connections between body areas and emotional states were curated by Friederike Portella. The app is a digital companion; the practice itself is hers.",
    howTitle: "How recommendations work",
    howP1:
      "When you complete an assessment, each saved point is scored by how many of its tags overlap with what you selected (body regions, discomfort types, emotions). Intensity, duration and emotional presence give a small extra weight. The top matches are what you see.",
    howP2:
      "Built as a hackathon MVP — the engine is intentionally transparent so you can see why a point appeared.",
  },
  enums: {
    zone: { foot: "foot", hand: "hand", ear: "ear" },
    pressure: { light: "light", medium: "medium", firm: "firm" },
    intensity: { mild: "mild", moderate: "moderate", intense: "intense" },
    duration: { acute: "acute", recurring: "recurring", chronic: "chronic" },
    presencePhrase: {
      subtle: "subtle presence",
      present: "present presence",
      intense: "intense presence",
    },
  },
  tagLabels: {},
};

const pt: Strings = {
  meta: { title: "Sole — Bem-estar com Reflexologia" },
  header: { tagline: "Reflexologia, com cuidado" },
  nav: { home: "Início", history: "Histórico", about: "Sobre" },
  switcher: { aria: "Trocar idioma" },
  welcome: {
    greeting: "Oi, respire fundo.",
    intro:
      "O Sole mapeia como seu corpo e suas emoções estão hoje e indica pontos de reflexologia que podem trazer alívio.",
    start: "Começar uma sessão",
    viewPast: "Ver sessões anteriores",
    body: "Corpo",
    emotions: "Emoções",
    points: "Pontos",
  },
  body: {
    step: "Etapa 1 de 3",
    title: "Onde seu corpo pede atenção?",
    subtitle: "Toque nas áreas do corpo e no tipo de sensação. Pule o que não se aplica.",
    feelLike: "Como é a sensação?",
    intensity: "Intensidade",
    duration: "Há quanto tempo?",
    back: "Voltar",
    next: "Próximo — emoções",
    intensities: { mild: "Leve", moderate: "Moderada", intense: "Intensa" },
    durations: { acute: "Só hoje", recurring: "Vai e volta", chronic: "Contínuo" },
  },
  emotions: {
    step: "Etapa 2 de 3",
    title: "Como você está se sentindo?",
    subtitle:
      "Comece amplo no centro ou seja específico nas bordas. Sentimentos vêm em camadas — escolha quantos fizerem sentido.",
    wheelHint: "Toque em uma família, um grupo ou um sentimento específico — em qualquer nível.",
    selected: "Selecionados",
    nothingYet: "Nada ainda — toque em uma fatia acima. Você pode escolher mais de um.",
    strength: "Com que intensidade eles aparecem?",
    strengthHint: "Uma medida gentil — ajuda a moldar suas recomendações.",
    presence: {
      subtle: { label: "Sutil", hint: "ao fundo" },
      present: { label: "Presente", hint: "claramente aqui" },
      intense: { label: "Intensa", hint: "bem forte" },
    },
    ackTitle: "Algo que você queira reconhecer?",
    optional: "opcional",
    ackHint: "Uma linha ou duas para você — o que trouxe isso. Salvo com sua sessão.",
    notePlaceholder: "ex.: Dormi mal ontem, e tem aquela apresentação amanhã…",
    back: "Voltar",
    next: "Ver minhas recomendações",
    familyTag: "família ·",
    clusterTag: "grupo ·",
    remove: "Remover",
  },
  results: {
    step: "Etapa 3 de 3",
    title: "Seu plano de reflexologia",
    subtitle: (n) =>
      `${n} ${n === 1 ? "ponto personalizado" : "pontos personalizados"} para como você está agora.`,
    basedOn: "Com base em",
    whatYouNoted: "O que você anotou",
    howTo: "Como fazer",
    whyHelps: "Por que ajuda",
    suggestedFor: "Indicado para:",
    pressure: "Pressão:",
    done: "Concluir",
    newSession: "Nova sessão",
    emptyText: "Nada para recomendar ainda — vamos começar uma sessão primeiro.",
    beginAssessment: "Iniciar avaliação",
    diagram: (name) => `Diagrama de ${name}`,
  },
  history: {
    title: "Histórico",
    clearAll: "Limpar tudo",
    clearConfirm: "Apagar todas as sessões salvas?",
    emptyTitle: "Nenhuma sessão ainda",
    emptyText: "Quando você concluir uma sessão, ela aparecerá aqui para revisitar.",
    startNow: "Começar agora",
    delete: "Excluir",
    deleteAria: "Excluir sessão",
    body: "Corpo",
    emotions: "Emoções",
    recommended: "Recomendados",
    note: "Nota",
  },
  wheel: {
    aria: "Roda das emoções",
    center: "Você",
    empty: "toque em uma fatia",
    picked: (n) => (n === 1 ? "1 escolhido" : `${n} escolhidos`),
  },
  bodyMap: {
    aria: "Silhueta do corpo humano",
    hint: "Toque em qualquer área onde sente desconforto.",
  },
  about: {
    title: "Sobre o Sole",
    subtitle: "Um companheiro pequeno e calmo para o autocuidado do dia a dia.",
    brainLabel: "A mente por trás do Sole",
    role: "Especialista Certificada em Reflexologia",
    chips: ["Pés", "Mãos", "Orelhas", "Cuidado holístico"],
    bioBefore:
      "Cada ponto, cada instrução e cada conexão entre corpo e emoção no Sole vem da prática de ",
    bioName: "Friederike",
    bioAfter:
      ". O app é uma pequena janela para o trabalho dela — para a profundidade real, o toque personalizado e a escuta, você vai querer uma sessão com ela.",
    cta: "Gostou do conteúdo? Agende uma sessão",
    opensWhatsapp: "Abre o WhatsApp · ",
    whatsappMessage:
      "Oi, Friederike! Testei o Sole, o app de reflexologia, e adoraria agendar uma sessão com você.",
    whatIsTitle: "O que é o Sole",
    whatIsP1:
      "Reflexologia é uma prática de toque baseada na ideia de que pontos nos pés, nas mãos e nas orelhas correspondem a outras partes do corpo. O Sole ajuda você a encontrar alguns pontos para experimentar com base em como você diz que se sente — física e emocionalmente — agora.",
    whatIsP2:
      "O catálogo de pontos, as instruções e as conexões entre áreas do corpo e estados emocionais foram curados por Friederike Portella. O app é um companheiro digital; a prática em si é dela.",
    howTitle: "Como funcionam as recomendações",
    howP1:
      "Quando você conclui uma avaliação, cada ponto salvo recebe uma pontuação pela quantidade de tags que coincidem com o que você selecionou (regiões do corpo, tipos de desconforto, emoções). Intensidade, duração e presença emocional dão um pequeno peso extra. As melhores combinações são o que você vê.",
    howP2:
      "Feito como um MVP de hackathon — o mecanismo é propositalmente transparente para você ver por que um ponto apareceu.",
  },
  enums: {
    zone: { foot: "pé", hand: "mão", ear: "orelha" },
    pressure: { light: "leve", medium: "média", firm: "firme" },
    intensity: { mild: "leve", moderate: "moderada", intense: "intensa" },
    duration: { acute: "aguda", recurring: "recorrente", chronic: "contínua" },
    presencePhrase: {
      subtle: "presença sutil",
      present: "presença marcante",
      intense: "presença intensa",
    },
  },
  tagLabels: {
    stress: "estresse",
    anxious: "ansiedade",
    overwhelmed: "sobrecarga",
    worried: "preocupação",
    chest: "peito",
    fatigue: "fadiga",
    headache: "dor de cabeça",
    head: "cabeça",
    tension: "tensão",
    confused: "confusão",
    neck: "pescoço",
    digestive: "digestão",
    stomach: "estômago",
    uneasy: "desconforto",
    upperBack: "parte superior das costas",
    lowerBack: "lombar",
    stiffness: "rigidez",
    shoulders: "ombros",
    frustrated: "frustração",
    irritated: "irritação",
    impatient: "impaciência",
    tired: "cansaço",
    sad: "tristeza",
    disconnected: "desconexão",
    withdrawn: "retraimento",
  },
};

export const t: Strings = LANG === "pt" ? pt : en;

/** Localize a match-reason tag, falling back to the raw tag (English behavior). */
export function tagLabel(tag: string): string {
  return t.tagLabels[tag] ?? tag;
}
