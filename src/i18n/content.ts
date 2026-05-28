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
    name: "Linha da coluna (borda interna do pé)",
    technique:
      "Passe o polegar pela borda interna do pé, do calcanhar ao dedão, com pressão firme e constante.",
    rationale:
      "A borda interna do pé mapeia a coluna — alivia a tensão nas costas e o desconforto ligado à postura.",
  },
  "shoulder-foot": {
    name: "Reflexo do ombro (sob o dedinho)",
    technique: "Na base do dedinho do pé, faça pequenos círculos firmes com o polegar.",
    rationale:
      "Reflete a articulação do ombro — libera a tensão acumulada do trabalho na tela ou do estresse.",
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
