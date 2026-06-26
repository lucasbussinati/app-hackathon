import type { BodyRegion, DiscomfortType, EmotionFamily } from "../data/types";

/**
 * Portuguese (PT-BR) translations for catalog content that lives in the data
 * modules. Keyed by the stable English `id` so the recommender's matching
 * logic (which uses ids/tags) is never affected — only display labels change.
 *
 * The English build never imports these (tree-shaken); the data modules apply
 * them only when LANG === "pt", falling back to the English label if a key is
 * ever missing.
 */

export const PT_EMOTION_LABELS: Record<string, string> = {
  joy: "Alegria",
  "joy.peaceful": "Tranquilo",
  content: "Contente",
  grateful: "Grato",
  "joy.playful": "Brincalhão",
  joyful: "Radiante",
  hopeful: "Esperançoso",

  sadness: "Tristeza",
  "sadness.hurt": "Magoado",
  disappointed: "Desapontado",
  lonely: "Solitário",
  "sadness.drained": "Esgotado",
  tired: "Cansado",
  sad: "Triste",

  anger: "Raiva",
  "anger.frustrated": "Frustrado",
  irritated: "Irritado",
  impatient: "Impaciente",
  "anger.resentful": "Ressentido",
  resentful: "Ressentido",
  frustrated: "Frustrado",

  fear: "Medo",
  "fear.anxious": "Ansioso",
  anxious: "Ansioso",
  worried: "Preocupado",
  "fear.overwhelmed": "Sobrecarregado",
  overwhelmed: "Sobrecarregado",
  insecure: "Inseguro",

  surprise: "Surpresa",
  "surprise.amazed": "Maravilhado",
  amazed: "Maravilhado",
  curious: "Curioso",
  "surprise.confused": "Confuso",
  confused: "Confuso",
  shocked: "Chocado",

  disgust: "Aversão",
  "disgust.withdrawn": "Retraído",
  withdrawn: "Retraído",
  disconnected: "Distante",
  "disgust.uneasy": "Incomodado",
  uneasy: "Incomodado",
  judgmental: "Crítico",
};

export const PT_FAMILY_LABELS: Record<EmotionFamily, string> = {
  joy: "Alegria",
  surprise: "Surpresa",
  fear: "Medo",
  sadness: "Tristeza",
  disgust: "Aversão",
  anger: "Raiva",
};

export const PT_REGION_LABELS: Record<BodyRegion, string> = {
  head: "Cabeça",
  neck: "Pescoço",
  shoulders: "Ombros",
  chest: "Peito",
  upperBack: "Parte superior das costas",
  stomach: "Estômago",
  lowerBack: "Lombar",
  hips: "Quadril",
  legs: "Pernas",
  feet: "Pés",
};

export const PT_DISCOMFORT_LABELS: Record<DiscomfortType, string> = {
  headache: "Dor de cabeça",
  tension: "Tensão",
  pain: "Dor",
  stiffness: "Rigidez",
  fatigue: "Fadiga",
  digestive: "Digestivo",
  stress: "Estresse",
};

export interface PointText {
  name: string;
  technique: string;
  rationale: string;
}

export const PT_POINTS: Record<string, PointText> = {
  "solar-plexus-foot": {
    name: "Plexo solar (pé)",
    technique:
      "Pressione o centro da almofada do pé com a polpa do polegar em círculos lentos e cada vez mais profundos.",
    rationale:
      "O reflexo do plexo solar acalma o sistema nervoso autônomo — é o ponto certo para estresse, ansiedade e respiração curta.",
  },
  "head-toes": {
    name: "Cabeça e seios da face (dedos do pé)",
    technique:
      "Caminhe com o polegar por cada dedo do pé, da base à ponta, e depois aperte suavemente as pontas por 3 segundos.",
    rationale:
      "As pontas dos dedos mapeiam a cabeça e os seios da face — úteis para dores de cabeça, cansaço visual e névoa mental.",
  },
  "stomach-foot": {
    name: "Reflexo do estômago (arco do pé esquerdo)",
    technique:
      "No arco interno do pé esquerdo, pressione e deslize lentamente o polegar em linhas horizontais.",
    rationale:
      "O arco do pé esquerdo reflete o estômago — ajuda com desconforto digestivo e a ansiedade do tipo 'frio na barriga'.",
  },
  "spine-foot": {
    name: "Linha da coluna e dos nervos (borda interna)",
    technique:
      "Passe o polegar pela borda interna do pé, do calcanhar ao dedão, com pressão firme e constante.",
    rationale:
      "A borda interna do pé mapeia a coluna e os nervos espinhais — alivia a tensão nas costas e o desconforto ligado à postura.",
  },
  "shoulder-foot": {
    name: "Reflexo do ombro (sob o dedinho)",
    technique: "Na base do dedinho do pé, faça pequenos círculos firmes com o polegar.",
    rationale:
      "Reflete a articulação do ombro — libera a tensão acumulada do trabalho na tela ou do estresse.",
  },
  "lung-foot": {
    name: "Pulmões e peito (almofada do pé)",
    technique:
      "Na almofada do pé, logo abaixo dos dedos, pressione e deslize o polegar em movimentos horizontais para fora.",
    rationale:
      "A almofada do pé espelha os pulmões e o peito — favorece uma respiração mais ampla e, na tradição, está ligada a liberar tristeza e luto guardados.",
  },
  "liver-foot": {
    name: "Reflexo do fígado (pé direito)",
    technique:
      "Apenas no pé direito, abaixo da almofada no lado externo, pressione com o polegar em círculos lentos e firmes.",
    rationale:
      "O reflexo do fígado fica no pé direito — em muitas tradições carrega a raiva e a frustração, e apoia a sensação de limpeza e renovação do corpo.",
  },
  "kidney-foot": {
    name: "Reflexo do rim (centro do arco)",
    technique:
      "No centro do arco do pé, mantenha uma pressão firme com o polegar, respirando devagar por alguns ciclos.",
    rationale:
      "O reflexo do rim fica no meio do arco — tradicionalmente associado ao medo e às reservas profundas de energia do corpo, útil quando você se sente esgotado ou tenso.",
  },
  "large-intestine-foot": {
    name: "Intestino grosso (parte inferior da planta)",
    technique:
      "Siga o caminho pela parte inferior da planta, trabalhando os dois pés com pequenos passos do polegar.",
    rationale:
      "O reflexo do intestino grosso percorre os dois pés — apoia a digestão e a eliminação, e o tema emocional de soltar o que já não te serve.",
  },
  "pancreas-foot": {
    name: "Reflexo do pâncreas (arco interno)",
    technique:
      "Ao longo do arco interno, logo abaixo da área do estômago, pressione suavemente e mantenha com o polegar.",
    rationale:
      "O reflexo do pâncreas fica no arco — ligado ao equilíbrio do açúcar no sangue e, simbolicamente, à 'doçura' da vida e à estabilidade emocional.",
  },
  "thyroid-foot": {
    name: "Reflexo da tireoide (base do dedão)",
    technique:
      "Na base do dedão, trabalhe a faixa curva com pequenas pressões circulares do polegar.",
    rationale:
      "O reflexo da tireoide fica na base do dedão — ligado ao metabolismo e à energia, e ao tema de encontrar a própria voz e o próprio ritmo.",
  },
  "parathyroid-foot": {
    name: "Reflexo da paratireoide (base do dedão)",
    technique:
      "Logo acima da faixa da tireoide, na base do dedão, aplique pressão firme e precisa com a ponta do polegar.",
    rationale:
      "O reflexo da paratireoide regula o equilíbrio do cálcio — associado à estabilidade estrutural e a uma sensação interna de firmeza e segurança.",
  },
  "sciatic-foot": {
    name: "Nervo ciático (linha do calcanhar)",
    technique:
      "Na borda superior do calcanhar, pressione e deslize horizontalmente com pressão firme do polegar.",
    rationale:
      "O reflexo do ciático atravessa o calcanhar — alivia desconfortos na lombar, no quadril e nas pernas que irradiam pelo corpo.",
  },
  "atm-foot": {
    name: "Reflexo da ATM / mandíbula (base dos dedos)",
    technique:
      "Onde o dedão encontra o segundo dedo, pressione e role suavemente o polegar para soltar a articulação.",
    rationale:
      "O reflexo da mandíbula (ATM) fica entre os primeiros dedos — útil para o ranger de dentes, a tensão na mandíbula e a frustração que costumamos prender ali.",
  },
  "trigeminal-foot": {
    name: "Nervo trigêmeo (lateral do dedão)",
    technique:
      "Pela lateral externa do dedão, caminhe com o polegar em pequenos passos da base em direção à ponta.",
    rationale:
      "O reflexo do trigêmeo acompanha o dedão — tradicionalmente usado para tensão facial, dores de cabeça e dor de cabeça ligada à mandíbula.",
  },
  "hand-solar": {
    name: "Plexo solar da mão",
    technique:
      "Pressione o centro da palma com o polegar da outra mão. Inspire por 4, expire por 6, três vezes.",
    rationale:
      "Uma versão portátil do ponto do plexo solar do pé — ótimo quando você está na rua e precisa se centrar rápido.",
  },
  "hand-thumb-head": {
    name: "Reflexo da cabeça (polpa do polegar)",
    technique:
      "Belisque a polpa do polegar entre o indicador e o polegar da outra mão. Apertos lentos de 3s cada.",
    rationale:
      "Reflete a cabeça — alívio discreto para dores de cabeça tensionais em reuniões ou no trânsito.",
  },
  "hand-webbing": {
    name: "Hegu (IG4) — membrana da mão",
    technique:
      "Na membrana carnuda entre o polegar e o indicador, pressione firme com o polegar da outra mão por 30s e depois troque de mão.",
    rationale:
      "Um ponto clássico tradicionalmente usado para dores de cabeça, tensão no pescoço e 'travamentos' emocionais.",
  },
  "ear-shenmen": {
    name: "Shen Men (orelha)",
    technique:
      "Na cavidade triangular superior da orelha, pressione suavemente com o indicador em círculos lentos.",
    rationale:
      "O 'portão do espírito' — usado na acupressão auricular para acalmar pensamentos acelerados e aliviar a sobrecarga emocional.",
  },
  "ear-zero": {
    name: "Ponto Zero (orelha)",
    technique:
      "Na pequena saliência no centro da concha da orelha, pressione levemente com a ponta do dedo por 30 segundos em cada orelha.",
    rationale:
      "Conhecido por reequilibrar a energia do corpo — um ponto de reset gentil quando você se sente disperso ou descentrado.",
  },
};
