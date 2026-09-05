import type { Duration, EmotionalPresence, Intensity, ReflexZone } from "../data/types";
import { LANG } from "./config";

export type JourneyStepId = "body" | "emotions" | "meaning" | "points";

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
    journeyLead: string;
    learnMore: string;
  };
  /** The four steps of a session: named on the home screen, explained in About. */
  journey: Array<{ id: JourneyStepId; label: string; desc: string }>;
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
  insights: {
    step: string;
    title: string;
    subtitle: string;
    intro: string;
    disclaimer: string;
    theme: string;
    physicalFunction: string;
    meaning: string;
    reflections: string;
    questions: string;
    patterns: string;
    relatedPoints: string;
    matchedFor: string;
    emptyText: string;
    beginAssessment: string;
    back: string;
    next: string;
    categories: Record<"organ" | "gland" | "respiratory" | "spine" | "joint", string>;
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
    enlarge: string;
    enlargeAria: (name: string) => string;
    closeImage: string;
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
    viewPlan: string;
    hidePlan: string;
    regeneratedPlan: string;
    howTo: string;
    whyHelps: string;
  };
  wheel: { aria: string; center: string; empty: string; picked: (n: number) => string };
  bodyMap: { aria: string; hint: string; front: string; back: string; areas: string };
  about: {
    title: string;
    subtitle: string;
    brainLabel: string;
    expertName: string;
    role: string;
    origin: string;
    bio: string[];
    questionsLead: string;
    questions: string[];
    proverbLead: string;
    proverb: string;
    closing: string[];
    cta: string;
    opensWhatsapp: string;
    whatsappMessage: string;
    teamTitle: string;
    teamIntro: string;
    edsonRole: string;
    edsonCredential: string;
    edsonBio: string;
    edsonFocusTitle: string;
    edsonFocus: string[];
    lucasRole: string;
    lucasBio: string;
    lucasCta: string;
    opensLinkedin: string;
    whatIsTitle: string;
    whatIsP1: string;
    whatIsP2: string;
    journeyTitle: string;
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
    journeyLead: "Four quick steps, about two minutes",
    learnMore: "How Sole works",
  },
  journey: [
    {
      id: "body",
      label: "Body",
      desc: "Tension, pain and fatigue leave traces. Reflexology reads the body as a map — each region of discomfort points to specific reflex areas that can help release what's stuck.",
    },
    {
      id: "emotions",
      label: "Emotions",
      desc: "What you feel emotionally often shows up physically. Anxiety tightens the chest, sadness weighs on the shoulders. Recognizing the emotion helps us find the right points.",
    },
    {
      id: "meaning",
      label: "Meaning",
      desc: "Before the points, Sole reflects back what your body may be communicating — the symbolic theme each area of discomfort traditionally carries, so you can listen to it more closely.",
    },
    {
      id: "points",
      label: "Points",
      desc: "Feet, hands and ears hold reflex points that mirror the whole body. By connecting what you feel — physically and emotionally — Sole recommends the points that bring it all together.",
    },
  ],
  body: {
    step: "Step 1 of 4",
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
    step: "Step 2 of 4",
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
    next: "Next — what it may mean",
    familyTag: "family ·",
    clusterTag: "cluster ·",
    remove: "Remove",
  },
  insights: {
    step: "Step 3 of 4",
    title: "What your body may be saying",
    subtitle: "A reflective lens on how your body and feelings may be connected.",
    intro:
      "In many traditions, each part of the body carries a symbolic theme. Based on what you shared, here is what these areas may be communicating — something to sit with, not a diagnosis.",
    disclaimer:
      "This is a complementary, reflective reading — not medical advice or a diagnosis. Physical symptoms always deserve evaluation by a healthcare professional.",
    theme: "Emotional theme",
    physicalFunction: "What it does",
    meaning: "What it may be saying",
    reflections: "Reflection",
    questions: "Sit with",
    patterns: "Patterns",
    relatedPoints: "Points that pair well",
    matchedFor: "Matched from:",
    emptyText: "Tell us where your body and feelings are first, and we'll reflect it back here.",
    beginAssessment: "Begin assessment",
    back: "Back",
    next: "See my reflexology plan",
    categories: {
      organ: "organ",
      gland: "gland",
      respiratory: "respiratory",
      spine: "spine",
      joint: "joint",
    },
  },
  results: {
    step: "Step 4 of 4",
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
    enlarge: "Tap to enlarge",
    enlargeAria: (name) => `Enlarge the ${name} diagram`,
    closeImage: "Close",
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
    viewPlan: "View past recommendations",
    hidePlan: "Hide recommendations",
    regeneratedPlan: "Recreated from everything you recorded in this session.",
    howTo: "How to do it",
    whyHelps: "Why it helps",
  },
  wheel: {
    aria: "Wheel of emotions",
    center: "You",
    empty: "tap any wedge",
    picked: (n) => `${n} picked`,
  },
  bodyMap: {
    aria: "Human body silhouette",
    hint: "Tap a region on the figure or pick from the list.",
    front: "Front",
    back: "Back",
    areas: "All areas",
  },
  about: {
    title: "About Sole",
    subtitle: "A small, calm companion for everyday self-care.",
    brainLabel: "The expert behind Sole",
    expertName: "Friderike Lich Portella",
    role: "Reflexologist",
    origin: "German",
    bio: [
      "Friderike Lich Portella is a German reflexologist with more than 27 years of practice — years spent sharing, and receiving, moving stories from patients who today are friends.",
      "After more than 5,000 sessions in the consulting room, we have seen how the body was made, and how wonderfully it answers.",
      "The central nervous system tries, in ways we can hardly imagine, to recover and find balance in the situations we live through every minute.",
    ],
    questionsLead: "When we ask ourselves:",
    questions: [
      "What would we be without anxiety?",
      "What would we be without fear?",
      "What would we be without insecurity?",
    ],
    proverbLead: "And that brings to mind a German saying:",
    proverb: "Too much of anything is too much…",
    closing: [
      "Reflexology helps the central nervous system identify and release what is in excess.",
      "Its main aim is to restore physical and emotional balance through stimulation of specific points on the feet.",
    ],
    cta: "Enjoyed the content? Schedule a session",
    opensWhatsapp: "Opens WhatsApp · ",
    whatsappMessage:
      "Hi Friderike! I tried Sole, the reflexology app, and I'd love to schedule a session with you.",
    teamTitle: "The team behind Sole",
    teamIntro: "The people who help Sole exist — in human development and in technology.",
    edsonRole: "Business Consultant, Speaker and Instructor",
    edsonCredential: "Technologist in Human Resources Management",
    edsonBio:
      "Edson Fernandes Portella brings a multidisciplinary career that joins human development with operational efficiency. He works strategically to align how teams behave and grow with the business goals of the companies he advises.",
    edsonFocusTitle: "People management and human resources",
    edsonFocus: [
      "Leadership training and development.",
      "Group dynamics for team integration.",
      "Organizational culture focused on productivity.",
    ],
    lucasRole: "Product Manager & Software Engineer",
    lucasBio:
      "Lucas Hideki Bussinati is the product and engineering mind behind Sole. As a software engineer, he built the app end to end — from the interface to the recommendation engine that turns Friderike's knowledge into working code. As a product manager, he shaped a dense, nuanced practice into a three-step experience with no jargon and no unnecessary decisions. Sole comes from that rare combination: the sensitivity of someone who designs for people, paired with the rigor of someone who writes the code that holds the experience together.",
    lucasCta: "Connect on LinkedIn",
    opensLinkedin: "Opens LinkedIn · ",
    whatIsTitle: "What Sole is",
    whatIsP1:
      "Reflexology is a touch practice based on the idea that points on the feet, hands and ears correspond to other parts of the body. Sole helps you find a few points to try based on how you say you feel — physically and emotionally — right now.",
    whatIsP2:
      "The point catalogue, instructions, and the connections between body areas and emotional states were curated by Friderike Lich Portella. The app is a digital companion; the practice itself is hers.",
    journeyTitle: "What happens in a session",
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
    journeyLead: "Quatro passos rápidos, cerca de dois minutos",
    learnMore: "Como o Sole funciona",
  },
  journey: [
    {
      id: "body",
      label: "Corpo",
      desc: "Tensão, dor e cansaço deixam marcas. A reflexologia lê o corpo como um mapa — cada região de desconforto aponta para áreas reflexas específicas que podem ajudar a liberar o que está travado.",
    },
    {
      id: "emotions",
      label: "Emoções",
      desc: "O que você sente emocionalmente costuma aparecer no corpo. Ansiedade aperta o peito, tristeza pesa nos ombros. Reconhecer a emoção nos ajuda a encontrar os pontos certos.",
    },
    {
      id: "meaning",
      label: "Significados",
      desc: "Antes dos pontos, o Sole reflete o que seu corpo pode estar comunicando — o tema simbólico que cada área de desconforto costuma carregar, para você escutá-lo de perto.",
    },
    {
      id: "points",
      label: "Pontos",
      desc: "Pés, mãos e orelhas têm pontos reflexos que espelham o corpo inteiro. Conectando o que você sente — física e emocionalmente — o Sole recomenda os pontos que unem tudo.",
    },
  ],
  body: {
    step: "Etapa 1 de 4",
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
    step: "Etapa 2 de 4",
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
    next: "Próximo — o que pode significar",
    familyTag: "família ·",
    clusterTag: "grupo ·",
    remove: "Remover",
  },
  insights: {
    step: "Etapa 3 de 4",
    title: "O que seu corpo pode estar dizendo",
    subtitle: "Uma lente reflexiva sobre como seu corpo e suas emoções podem estar conectados.",
    intro:
      "Em muitas tradições, cada parte do corpo carrega um tema simbólico. Com base no que você compartilhou, aqui está o que essas áreas podem estar comunicando — algo para refletir, não um diagnóstico.",
    disclaimer:
      "Esta é uma leitura complementar e reflexiva — não é orientação médica nem diagnóstico. Sintomas físicos sempre merecem avaliação de um profissional de saúde.",
    theme: "Tema emocional",
    physicalFunction: "O que faz",
    meaning: "O que pode estar dizendo",
    reflections: "Reflexão",
    questions: "Reflita sobre",
    patterns: "Padrões",
    relatedPoints: "Pontos que combinam",
    matchedFor: "Relacionado a:",
    emptyText: "Conte primeiro onde estão seu corpo e suas emoções, e nós refletimos isso aqui.",
    beginAssessment: "Iniciar avaliação",
    back: "Voltar",
    next: "Ver meu plano de reflexologia",
    categories: {
      organ: "órgão",
      gland: "glândula",
      respiratory: "respiratório",
      spine: "coluna",
      joint: "articulação",
    },
  },
  results: {
    step: "Etapa 4 de 4",
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
    enlarge: "Toque para ampliar",
    enlargeAria: (name) => `Ampliar o diagrama de ${name}`,
    closeImage: "Fechar",
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
    viewPlan: "Ver recomendações anteriores",
    hidePlan: "Ocultar recomendações",
    regeneratedPlan: "Recriadas a partir de tudo o que você registrou nesta sessão.",
    howTo: "Como fazer",
    whyHelps: "Por que ajuda",
  },
  wheel: {
    aria: "Roda das emoções",
    center: "Você",
    empty: "toque em uma fatia",
    picked: (n) => (n === 1 ? "1 escolhido" : `${n} escolhidos`),
  },
  bodyMap: {
    aria: "Silhueta do corpo humano",
    hint: "Toque uma região na figura ou escolha na lista.",
    front: "Frente",
    back: "Costas",
    areas: "Todas as áreas",
  },
  about: {
    title: "Sobre o Sole",
    subtitle: "Um companheiro pequeno e calmo para o autocuidado do dia a dia.",
    brainLabel: "A especialista por trás do Sole",
    expertName: "Friderike Lich Portella",
    role: "Reflexoterapeuta",
    origin: "Alemã",
    bio: [
      "Friderike Lich Portella é reflexoterapeuta alemã, com mais de 27 anos de experiência — tempo em que teve a oportunidade de compartilhar e receber relatos emocionantes de pacientes que hoje são amigos.",
      "Depois de mais de 5.000 atendimentos no consultório, vivenciamos como o nosso corpo foi criado e responde de maneira maravilhosa.",
      "O sistema nervoso central tenta, de formas inimagináveis, se recuperar e encontrar o equilíbrio das situações que passamos a cada minuto.",
    ],
    questionsLead: "Quando nos perguntamos:",
    questions: [
      "O que seríamos, sem ansiedade?",
      "O que seríamos sem medo?",
      "O que seríamos sem insegurança?",
    ],
    proverbLead: "E isso nos faz lembrar um ditado alemão:",
    proverb: "Tudo que é demais, é demais…",
    closing: [
      "A reflexologia ajuda o sistema nervoso central a identificar e eliminar os excessos.",
      "O objetivo principal da reflexologia é trazer o equilíbrio físico e emocional através de estímulos em pontos específicos nos pés.",
    ],
    cta: "Gostou do conteúdo? Agende uma sessão",
    opensWhatsapp: "Abre o WhatsApp · ",
    whatsappMessage:
      "Oi, Friderike! Testei o Sole, o app de reflexologia, e adoraria agendar uma sessão com você.",
    teamTitle: "O time por trás do Sole",
    teamIntro: "Quem ajuda o Sole a existir — no desenvolvimento humano e na tecnologia.",
    edsonRole: "Consultor de Empresas, Palestrante e Instrutor",
    edsonCredential: "Tecnólogo em Gestão de Recursos Humanos",
    edsonBio:
      "Edson Fernandes Portella tem uma trajetória multidisciplinar que une o desenvolvimento humano à eficiência operacional. Atua de forma estratégica para alinhar o comportamento e o desenvolvimento das equipes aos objetivos de negócio das empresas que acompanha.",
    edsonFocusTitle: "Gestão de pessoas e recursos humanos",
    edsonFocus: [
      "Treinamento e desenvolvimento de lideranças.",
      "Dinâmicas de grupo voltadas à integração de equipes.",
      "Cultura organizacional focada em produtividade.",
    ],
    lucasRole: "Product Manager e Desenvolvedor de Software",
    lucasBio:
      "Lucas Hideki Bussinati é a mente de produto e engenharia por trás do Sole. Como desenvolvedor de software, construiu o app de ponta a ponta — da interface ao motor de recomendação que traduz o conhecimento da Friderike em código. Como product manager, transformou um saber denso e cheio de nuances em uma experiência de três passos, sem jargão e sem decisão desnecessária. É dessa combinação rara que o Sole nasce: a sensibilidade de quem desenha para pessoas somada ao rigor de quem sustenta a experiência em código.",
    lucasCta: "Conecte-se no LinkedIn",
    opensLinkedin: "Abre o LinkedIn · ",
    whatIsTitle: "O que é o Sole",
    whatIsP1:
      "Reflexologia é uma prática de toque baseada na ideia de que pontos nos pés, nas mãos e nas orelhas correspondem a outras partes do corpo. O Sole ajuda você a encontrar alguns pontos para experimentar com base em como você diz que se sente — física e emocionalmente — agora.",
    whatIsP2:
      "O catálogo de pontos, as instruções e as conexões entre áreas do corpo e estados emocionais foram curados por Friderike Lich Portella. O app é um companheiro digital; a prática em si é dela.",
    journeyTitle: "O que acontece em uma sessão",
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
    chest: "peitoral",
    face: "rosto",
    ears: "orelhas",
    arms: "braços",
    elbows: "cotovelos",
    hands: "mãos",
    intestine: "intestino",
    pelvis: "pelve",
    knees: "joelhos",
    fatigue: "fadiga",
    headache: "dor de cabeça",
    head: "cabeça",
    tension: "tensão",
    confused: "confusão",
    neck: "pescoço",
    digestive: "digestão",
    stomach: "estômago",
    trunk: "tronco",
    uneasy: "desconforto",
    upperBack: "parte superior das costas",
    lowerBack: "lombar",
    stiffness: "rigidez",
    shoulders: "ombros",
    frustrated: "frustração",
    "anger.frustrated": "frustração",
    irritated: "irritação",
    impatient: "impaciência",
    tired: "cansaço",
    sad: "tristeza",
    sadness: "tristeza",
    "sadness.hurt": "magoado",
    "sadness.drained": "esgotado",
    lonely: "solidão",
    disconnected: "desconexão",
    withdrawn: "retraimento",
    anger: "raiva",
    fear: "medo",
    resentful: "ressentimento",
    insecure: "insegurança",
    hips: "quadril",
    legs: "pernas",
    feet: "pés",
    pain: "dor",
    spinePain: "dor na coluna",
    napePain: "dor na nuca",
    sciatica: "dor ciática",
    anxietyDiscomfort: "ansiedade",
    exhaustion: "esgotamento",
    insomnia: "insônia",
    sinusitis: "sinusite",
    soreThroat: "dor de garganta",
    shoulderPain: "dor nos ombros",
    legPain: "dor nas pernas",
    menstrualCramp: "cólica menstrual",
    intestinalCramp: "cólica intestinal",
    tinnitus: "zumbido",
    depression: "depressão",
    fibromyalgia: "fibromialgia",
  },
};

export const t: Strings = LANG === "pt" ? pt : en;

/** Localize a match-reason tag, falling back to the raw tag (English behavior). */
export function tagLabel(tag: string): string {
  return t.tagLabels[tag] ?? tag;
}
