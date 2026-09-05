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
  face: "Rosto e mandíbula",
  ears: "Orelhas",
  neck: "Pescoço",
  shoulders: "Ombros",
  arms: "Braços",
  elbows: "Cotovelos",
  hands: "Mãos",
  chest: "Peitoral",
  upperBack: "Parte superior das costas",
  stomach: "Estômago",
  intestine: "Intestino",
  trunk: "Tronco",
  lowerBack: "Lombar",
  hips: "Quadril",
  pelvis: "Pelve",
  knees: "Joelhos",
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
  spinePain: "Dor na coluna",
  napePain: "Dor na nuca",
  sciatica: "Dor ciática",
  anxietyDiscomfort: "Ansiedade",
  exhaustion: "Esgotamento",
  insomnia: "Insônia",
  sinusitis: "Sinusite",
  soreThroat: "Dor de garganta",
  shoulderPain: "Dor nos ombros",
  legPain: "Dor nas pernas",
  menstrualCramp: "Cólica menstrual",
  intestinalCramp: "Cólica intestinal",
  tinnitus: "Zumbido",
  depression: "Depressão",
  fibromyalgia: "Fibromialgia",
};

export interface PointText {
  name: string;
  technique: string;
  rationale: string;
}

export const PT_POINTS: Record<string, PointText> = {
  "solar-plexus-foot": {
    name: "Plexo solar (pé)",
    technique: "Pressione o centro da almofada do pé com a polpa do polegar em círculos lentos e cada vez mais profundos.",
    rationale: "O reflexo do plexo solar acalma o sistema nervoso autônomo — é o ponto certo para estresse, ansiedade e respiração curta.",
  },
  "head-toes": {
    name: "Sinus(dedos do pé)",
    technique: "Caminhe com o polegar por cada dedo do pé, da base à ponta, e depois aperte suavemente as pontas por 10 segundos.",
    rationale: "As pontas dos dedos mapeiam a cabeça e os seios da face — úteis para dores de cabeça, cansaço visual e névoa mental.",
  },
  "stomach-foot": {
    name: "Reflexo do estômago (arco do pé esquerdo)",
    technique: "No arco interno do pé esquerdo, pressione e deslize lentamente o polegar em linhas horizontais.",
    rationale: "O arco do pé esquerdo reflete o estômago — ajuda com desconforto digestivo e a ansiedade do tipo \"frio na barriga\".",
  },
  "spine-foot": {
    name: "Linha da coluna e dos nervos (borda interna)",
    technique: "Passe o polegar pela borda interna do pé, do calcanhar ao Polegar, com pressão firme e constante.",
    rationale: "A borda interna do pé mapeia a coluna e os nervos espinhais — alivia a tensão nas costas e o desconforto ligado à postura.",
  },
  "shoulder-foot": {
    name: "Reflexo do ombro (sob o dedinho)",
    technique: "Na base do dedinho do pé, faça pequenos círculos firmes com o polegar.",
    rationale: "Reflete a articulação do ombro — libera a tensão acumulada do trabalho na tela ou do estresse.",
  },
  "lung-foot": {
    name: "Pulmões e peito (almofada do pé)",
    technique: "Na almofada do pé, logo abaixo dos dedos, pressione e deslize o polegar em movimentos horizontais para fora.",
    rationale: "A almofada do pé espelha os pulmões e o peito — favorece uma respiração mais ampla e, na tradição, está ligada a liberar tristeza e luto guardados.",
  },
  "liver-foot": {
    name: "Reflexo do fígado (pé direito)",
    technique: "Apenas no pé direito, abaixo da almofada no lado externo, pressione com o polegar em círculos lentos e firmes.",
    rationale: "O reflexo do fígado fica no pé direito — em muitas tradições carrega a raiva e a frustração, e apoia a sensação de limpeza e renovação.",
  },
  "kidney-foot": {
    name: "Reflexo do rim (centro do arco)",
    technique: "Mantenha uma pressão firme na Área Plantar – Entre o 2° e 3° metatarso – Porção Proximal polegar, respirando devagar por alguns ciclos.",
    rationale: "O reflexo do rim fica no meio do arco — tradicionalmente associado ao medo e às reservas profundas de energia do corpo, útil quando a pessoa se sente esgotada ou tensa.",
  },
  "large-intestine-foot": {
    name: "Intestino grosso (parte inferior da planta)",
    technique: "Siga o caminho pela parte inferior da planta, trabalhando os dois pés com pequenos passos do polegar.",
    rationale: "O reflexo do intestino grosso percorre os dois pés — apoia a digestão e a eliminação, e o tema emocional de soltar o que já não serve.",
  },
  "pancreas-foot": {
    name: "Reflexo do pâncreas (arco interno)",
    technique: "Ao longo do arco interno, logo abaixo da área do estômago, pressione suavemente e mantenha com o polegar.",
    rationale: "O reflexo do pâncreas fica no arco — ligado ao equilíbrio do açúcar no sangue e, simbolicamente, à \"doçura\" da vida e à estabilidade emocional.",
  },
  "thyroid-foot": {
    name: "Reflexo da tireoide (base do Polegar)",
    technique: "Na base do Polegar, trabalhe a faixa curva com pequenas pressões circulares do polegar.",
    rationale: "O reflexo da tireoide fica na base do Polegar — ligado ao metabolismo e à energia, e ao tema de encontrar a própria voz e o próprio ritmo.",
  },
  "parathyroid-foot": {
    name: "Reflexo da paratireoide (base do Polegar)",
    technique: "Logo acima da faixa da tireoide, na base do Polegar, aplique pressão firme e precisa com a ponta do polegar.",
    rationale: "O reflexo da paratireoide regula o equilíbrio do cálcio — associado à estabilidade estrutural e a uma sensação interna de firmeza e segurança.",
  },
  "sciatic-foot": {
    name: "Nervo ciático (linha do calcanhar)",
    technique: "Pressione e deslize na Área plantar – No calcâneo, no transverso da porção média horizontalmente com pressão firme do polegar.",
    rationale: "O reflexo do ciático atravessa o calcanhar — alivia desconfortos na lombar, no quadril e nas pernas que irradiam pelo corpo.",
  },
  "atm-foot": {
    name: "Reflexo da ATM / mandíbula (base dos dedos)",
    technique: "Pressione Área Dorsal – Hálux – Na lateral interna e externa da articulação interfalangeana",
    rationale: "O reflexo da mandíbula (ATM) fica entre os primeiros dedos — útil para o ranger de dentes, a tensão na mandíbula e a frustração que costumamos prender ali.",
  },
  "trigeminal-foot": {
    name: "Nervo trigêmeo (lateral do Polegar)",
    technique: "Área plantar- do 5º ao 2º dedo – Pressionar Acima das articulações metatarso falangeanas",
    rationale: "O reflexo do trigêmeo acompanha o Polegar — tradicionalmente usado para tensão facial, dores de cabeça e dor de cabeça ligada à mandíbula.",
  },
  "p16-bulbo": {
    name: "Bulbo",
    technique: "Pressionar a Área plantar e lateral interna – Hálux - Falange proximal na porção distal",
    rationale: "O bulbo (bulbo raquidiano) participa do controle das funções automáticas essenciais (respiração, frequência cardíaca, pressão arterial e diversos reflexos). Embora o estado de alerta seja regulado principalmente pela formação reticular — que inclui estruturas do bulbo, da ponte e do mesencéfalo — o bulbo faz parte desse sistema de manutenção da vida.",
  },
  "p17-coluna-cervical": {
    name: "Coluna Cervical",
    technique: "Pressionar a Lateral interna do hálux – desde a falange distal na porção proximal até a articulação metatarso falangeana",
    rationale: "A coluna cervical: •Sustenta o peso da cabeça. •Permite olhar para diferentes direções. •Dá mobilidade e flexibilidade ao pescoço. •Protege estruturas nervosas importantes.",
  },
  "p18-coluna-lombar": {
    name: "Coluna Lombar",
    technique: "Pressionar e rolar com o Polegar na Lateral interna – ponto máximo: no 1º cuneiforme – e ao longo do navicular",
    rationale: "A reflexologia ajuda a aliviar as dores na região lombar.",
  },
  "p19-coluna-toracica": {
    name: "Coluna Torácica",
    technique: "Pressionar e rolar com o Polegar na Lateral interna – Do 1º metatarso desde a articulação metatarso falangeana até a articulação cuneiforme metatarsiana",
    rationale: "A reflexologia ajuda a aliviar as dores na coluna.",
  },
  "p20-coracao-pe-esquerdo": {
    name: "CORAÇÃO",
    technique: "Pressionar na Área plantar- sobre o 4º metatarso com inclinação para o 3º dedo, na porção distal",
    rationale: "A reflexologia pode ajudar a fortalecer a musculatura do coração.",
  },
  "p21-esgotamento": {
    name: "ESGOTAMENTO",
    technique: "Pressionar com o Polegar na Área plantar – Hálux – na lateral externa da falange distal, na posição distal",
    rationale: "A reflexologia ajuda a melhorar a digestão",
  },
  "p23-intestino-delgado-e-duodeno": {
    name: "Intestino delgado e Duodeno",
    technique: "Na Área Plantar – do 1º ao 4º metatarso – Desde a porção proximal até o calcâneo.",
    rationale: "A reflexologia ajuda a melhorar a absorção de nutrientes.",
  },
  "p24-intestino-reto-e-anus": {
    name: "Intestino Reto/Ânus",
    technique: "Pressionar com o Polegar a parte Lateral Interna – Calcâneo – Na porção média e proximal.",
    rationale: "A reflexologia ajuda melhorar e estimular os movimentos voluntários e involuntários",
  },
  "p25-joelho": {
    name: "Joelho",
    technique: "Pressionar com o Polegar a Lateral externa – Abaixo da epífase do 5º metatarso sobre o cubóide",
    rationale: "A reflexologia pode ajudar a fortalecer a musculatura.",
  },
  "p26-timo": {
    name: "Timo",
    technique: "Na parte Área Dorsal – Entre o hálux e o 2º dedo – Acima da articulação metatarso falangiana.",
    rationale: "A reflexologia ajuda a melhorar o sistema imunológico.",
  },
  "p29-baco-pe-esquerdo": {
    name: "Baço (Pé Esquerdo)",
    technique: "Somente no pé esquerdo - Pressionar com o Polegar na Área Plantar – Entre o 3º e 4º metatarso na porção distal.",
    rationale: "A reflexologia ajuda melhorar e estimular a renovação das células",
  },
  "p30-bexiga": {
    name: "Bexiga",
    technique: "Com o Polegar na Área Plantar – Lateral interna do Tálus – Porção Distal movimentos circulares",
    rationale: "A reflexologia ajuda melhorar e estimular os movimentos voluntários e involuntários da bexiga.",
  },
  "p31-boca": {
    name: "Boca",
    technique: "Pressionar com o Polegar na Área Dorsal – Hálux – Na articulação interfalangeana",
    rationale: "A reflexologia ajuda melhorar e estimular a Musculatura,Articulações e Nervos",
  },
  "p32-bronquios": {
    name: "Brônquios",
    technique: "Pressionar na Área Plantar - 3º dedo na falange proximal na raiz do dedo",
    rationale: "A reflexologia ajuda melhorar as contrações e passagens de ar",
  },
  "p33-cerebelo": {
    name: "Cerebelo",
    technique: "Pressionar com o Polegar Área plantar e lateral interna – Hálux - Falange proximal na porção distal",
    rationale: "A reflexologia ajuda melhorar e coordenar os movimentos, o equilíbrio e a postura",
  },
  "p34-circulacao-linfatica": {
    name: "Circulação Linfática",
    technique: "Com o Polegar passar levemente na Área Dorsal – Do 1º ao 5º dedo – Nos espaços intermetatarsicos.",
    rationale: "A reflexologia ajuda o sistema linfático a recolher o excesso de líquido que fica entre as células, eliminar resíduos e proteínas que não podem permanecer acumulados nos tecidos.",
  },
  "p35-circulacao-sanguinea-central": {
    name: "Circulação Sanguínea Central",
    technique: "Com o Polegar passar levemente na Área Dorsal – Do 1º ao 5º dedo – Nos espaços intermetatarsicos",
    rationale: "A reflexologia ajuda o sistema circulatório a melhorar a nutrição e transporte para os sistemas.",
  },
  "p36-circulacao-sanguinea-periferica": {
    name: "Circulação Sanguínea Periférica",
    technique: "Pressionar os pontos um de cada vez por aproximadamente 15 segundos na Área dorsal – lateral externa – do 5º metatarso até o calcâneo",
    rationale: "A reflexologia ajuda estimular a circulação sanguínea periférica a levar sangue às extremidades e aos tecidos mais distantes do coração",
  },
  "p38-cortex": {
    name: "Córtex",
    technique: "Pressionar com o Polegar a Área plantar e lateral interna – Hálux - Entre as Falange Distal e Proximal na porção distal",
    rationale: "A reflexologia pode ajudar a melhorar as funções Sensoriais, Motoras e Associativas",
  },
  "p39-diafragma": {
    name: "Diafragma",
    technique: "Pressionar e passar por algumas vezes com o Polegar na Área plantar do Hálux ao 5o dedo - abaixo da epífise dos 5 metatarsos",
    rationale: "A reflexologia ajuda a melhorar a musculatura do sistema respirátorio",
  },
  "p40-faringe": {
    name: "Faringe",
    technique: "Pressionar com o Polegar na Área Dorsal – Hálux – lateral externa da falange proximal, entre as articulações falangeanas e metatarso",
    rationale: "A reflexologia ajuda a melhorar as vias respiratórias",
  },
  "p41-ganglios-linfaticos-inferiores": {
    name: "Gânglios Linfáticos Inferiores",
    technique: "Passar suavemente com o Polegar na Área Dorsal – Na fossa talâmica ao lado do maléolo externo.",
    rationale: "A reflexologia ajuda a melhorar a resposta do sistema imunológico",
  },
  "p42-ganglios-linfaticos-superiores-e-medios": {
    name: "Gânglios Linfáticos Superiores e Médios",
    technique: "Deslizar suavemente com o dedos Do Hálux ao 5º dedo – Nos espaços entre as falanges proximais, acima das articulações metatarso falangianos. Área Dorsal – Na fossa talâmica ao lado do maléolo externo.",
    rationale: "A reflexologia ajuda a melhorar a resposta do sistema imunológico",
  },
  "p43-hipotalamo": {
    name: "Hipotálamo",
    technique: "Pressionar com o Polegar na Área plantar- hálux- no ápice da falange distal",
    rationale: "A reflexologia ajuda a melhorar a comunicação entre os sistemas do corpo podendo ajudar a manter o equilíbrio.",
  },
  "p44-hipofise": {
    name: "Hipófise",
    technique: "Pressionar de maneira alternada na Área plantar- hálux – falange medial (na marca da impressão digital do pé)",
    rationale: "A reflexologia ajuda melhorar o equilíbrio do sistema endócrino",
  },
  "p45-laringe": {
    name: "Laringe",
    technique: "Pressionar com o Polegar na Área Dorsal – Hálux na lateral externa, na articulação metatarso falangeana",
    rationale: "A reflexologia ajuda a melhorar as vias respiratórias",
  },
  "p47-mamas": {
    name: "Mamas",
    technique: "Pressionar com o Polegar Área dorsal – Entre o 3° e o 4° metatarso – Na porção distal",
    rationale: "A reflexologia ajuda a melhorar o sistema reprodutor",
  },
  "p48-mao-e-pes": {
    name: "Mão e Pés",
    technique: "Pressionar com o Polegar na Lateral Externa – 5° artelho – No calcâneo – Porção proximal",
    rationale: "A reflexologia ajuda a melhorar na execução e manipulação",
  },
  "p49-nariz": {
    name: "Nariz",
    technique: "Pressionar com o Polegar Área Dorsal - Halux – sobre a falange distal- entre a unha e a articulação interfalangeana",
    rationale: "A reflexologia ajuda a melhorar o sistema respiratório",
  },
  "p50-olho": {
    name: "Olho",
    technique: "Pressionar Área plantar – Entre o 2º e o 3º dedo e 3º e 4º dedo – entre as falanges proximais",
    rationale: "Fisicamente, os olhos captam a luz e permitem interpretar o ambiente, reconhecer formas, pessoas, movimentos e profundidade. Eles nos ajudam a compreender o que está diante de nós.",
  },
  "p51-osso-hioide": {
    name: "Osso Hióide",
    technique: "Pressionar com o Polegar o ponto localizado na Área Plantar – Hálux – na lateral externa, na epífise superior da falange proximal",
    rationale: "O osso hióide é um osso único, localizado na região anterior do pescoço. Ele não se articula diretamente com outros ossos; fica suspenso por músculos e ligamentos e serve de ponto de apoio para estruturas envolvidas na deglutição, na fala e nos movimentos da língua e da laringe.",
  },
  "p52-ouvido": {
    name: "Ouvido",
    technique: "Pressionar com o Polegar na Área plantar - Entre o 4º e 5º dedo - entre as falanges proximais",
    rationale: "A reflexologia ajuda a melhorar a Audição e Equilíbrio.",
  },
  "p53-ovarios-ou-testiculos": {
    name: "Ovários ou Testículos",
    technique: "Pressionar com o Polegar a Lateral externa – Sobre o calcâneo – Na porção medial (Pés Esquerdo/Direito)",
    rationale: "A reflexologia pode ajudar no aumento da produção de hormônios sexuais",
  },
  "p54-penis-vagina": {
    name: "Pênis/Vagina",
    technique:
      "Pressionar com o polegar a lateral interna do calcâneo, da região plantar até o meio do calcanhar, nos dois pés.",
    rationale: "A reflexologia ajuda a estimular o aparelho dos órgãos reprodutores.",
  },
  "p55-perna": {
    name: "Perna",
    technique: "Pressionar com o Polegar a Lateral Externa – 5° dedo – Na Lateral Externa do cubóide e calcâneo",
    rationale: "A reflexologia pode ajudar a melhorar a musculatura e circulação",
  },
  "p56-pineal": {
    name: "Pineal",
    technique: "Pressionar com o Polegar a Área Plantar – Hálux – Na lateral interna e externa da falange distal, na porção distal",
    rationale: "A reflexologia ajuda a regular os ritmos biológicos",
  },
  "p57-ponto-de-tensao": {
    name: "Ponto de Tensão",
    technique: "Pressionar com o Polegar a Lateral externa - Abaixo do maléolo e acima do calcâneo",
    rationale: "A reflexologia pode ajudar no alívio da tensão",
  },
  "p59-utero-ou-prostata": {
    name: "Útero ou Próstata",
    technique: "Pressionar com o Polegar a Lateral interna – Sobre o calcâneo – Na porção medial",
    rationale: "A reflexologia ajuda a estimular o sistema reprodutor",
  },
  "p61-cerebro": {
    name: "Cérebro",
    technique: "Pressionar com o Polegar toda a Área plantar – Hálux – Toda a falange distal",
    rationale: "O corpo inteiro é controlado pelo cérebro e pelo sistema nervoso central. A medula espinhal supre os nervos e retransmite mensagens entre as partes pertinentes do corpo e do cérebro. Se está havendo qualquer falha neste sistema, a reflexologia fará com que o sistema nervoso perceba esta falha e a corrija, fazendo o corpo todo entrar novamente no seu equilíbrio.",
  },
  "p62-sistema-limbico": {
    name: "Sistema Límbico",
    technique: "Pressionar com o Polegar Área plantar externa do hálux nas falanges proximal na porção distal e falange distal",
    rationale: "A reflexologia ajuda a melhorar no processamento das emoções",
  },
  "p63-hipocampo": {
    name: "Hipocampo",
    technique: "Pressionar com o Polegar Área plantar – Hálux na falange distal, na porção medial",
    rationale: "A reflexologia ajuda a melhorar a memória e o aprendizado",
  },
  "p65-ponto-do-sono": {
    name: "Ponto do Sono",
    technique: "Pressionar com Polegar a Área dorsal - Hálux falange distal na raiz da unha",
    rationale: "A reflexologia ajuda a melhorar a qualidade do sono",
  },
  "p72-nervo-auditivo": {
    name: "Nervo Auditivo",
    technique: "Com o Polegar pressionar na Área plantar no 4º dedo – Lateral interna e externa da falange distal",
    rationale: "A reflexologia pode melhorar a captação e transmissão dos impulsos que levam até o cérebro",
  },
  "p74-area-auditiva-orelha-media-e-interna": {
    name: "Área Auditiva (orelha média e interna)",
    technique: "Pressionar com o Polegar a Área dorsal – 5º dedo – Na lateral interna da falange proximal, entre as articulações interfalangeanas e metatarsofalangeanas",
    rationale: "A reflexologia ajuda a melhorar o processamento para dar sentidos aos sons captados pelos ouvidos",
  },
  "p75-tuba-auditiva": {
    name: "Tuba Auditiva",
    technique: "Pressionar com o Polegar a área auditiva + faringe (área dorsal, hálux, lateral externa da falange proximal, entre as articulações interfalangeanas e metatarso falangeanas)",
    rationale: "A reflexologia pode ajudar a melhorar a o Equilíbrio Pressórico",
  },
  "p81-nervo-ciatico-motor": {
    name: "Nervo Ciático Motor",
    technique: "Pressionar com o Polegar Do calcâneo – Subindo até a panturrilha, no tendão de Aquiles",
    rationale: "Pode ajudar na inflamação do nervo ciático na coluna",
  },
  "p83-bronquios": {
    name: "Brônquios",
    technique: "Pressionar com o polegar na Área Plantar - 3º dedo na falange proximal na raiz do dedo",
    rationale: "A reflexologia ajuda a melhorar o sistema respiratório",
  },
  "p108-referencia": {
    name: "Ponto 108",
    technique:
      "Siga o protocolo da especialista para o ponto 108. A localização e a técnica não estão descritas no documento de referência fornecido.",
    rationale:
      "O documento preenchido inclui explicitamente o ponto 108 para dor de cabeça, mas não apresenta os detalhes desse ponto no catálogo.",
  },
  "p117-supra-renal": {
    name: "Supra Renal",
    technique: "Pressionar com o polegar na Área Plantar – Abaixo da epífise do 2º metatarso do lado externo",
    rationale: "A reflexologia pode ajudar no funcionamento Taquicardia,Sudorese,Distúrbio do sono e Alimentar",
  },
  "p160-cabeca": {
    name: "Cabeça",
    technique: "Pressionar com o polegar na Área Dorsal e Plantar – Do Hálux ao 5º dedo – em todas as falanges distais",
    rationale: "Ponto reflexo da cabeça (área dorsal e plantar, em todas as falanges distais).",
  },
  "p161-pescoco": {
    name: "Pescoço",
    technique: "Pressionar com o polegar na Área Plantar – Hálux, porção superior da falange proximal",
    rationale: "Ponto reflexo do pescoço (área plantar do hálux, porção superior da falange proximal).",
  },
  "p162-quadril": {
    name: "Quadril",
    technique: "Pressionar com o polegar na Área Plantar – Lateral externa, no Cubóide",
    rationale: "Ponto reflexo do quadril (área plantar, lateral externa sobre o cuboide).",
  },
  "p163-area-peitoral": {
    name: "Área Peitoral",
    technique: "Pressionar com o polegar na Área Dorsal, do 1º ao 5º metatarso",
    rationale: "Ponto reflexo da área peitoral (área dorsal, do 1º ao 5º metatarso).",
  },
  "p22-ganglios-basais": {
    name: "Gânglios Basais",
    technique: "Na Área Plantar – Hálux – na lateral externa, na epífise superior da falange proximal pressionar como o Polegar",
    rationale: "A reflexologia estimula os Gânglios Basais a fim melhorar o aprendizado.",
  },
  "p27-amigdalas": {
    name: "Amígdalas",
    technique: "Pressionar com o Polegar na Área Dorsal – Entre o hálux e o 2º dedo – Acima da articulação metatarso falangiana.",
    rationale: "A reflexologia ajuda no funcionamento das amígdalas no sistema imunológico.",
  },
  "p37-cordas-vocais": {
    name: "Cordas Vocais",
    technique: "Pressionar com o Polegar na Área Dorsal – Hálux na lateral externa, na articulação metatarso falangeana",
    rationale: "A reflexologia ajuda nos movimentos voluntarios e involutários",
  },
  "p58-uretra": {
    name: "Uretra",
    technique: "Pressionar com o Polegar a Área Plantar – Lateral interna do Calcâneo – Porção Distal",
    rationale: "A reflexologia ajuda a estimular o sistema urinário",
  },
  "p60-vesicula-biliar": {
    name: "Vesícula Biliar",
    technique: "Pressionar com o Polegar apenas no Pé Direito – Área Plantar – Sobre o 3° metatarso – Na porção média",
    rationale: "A reflexologia ajuda a melhorar o armazenamento da Bile",
  },
  "p64-amidalas-do-cerebro": {
    name: "Amídalas do Cérebro",
    technique: "Pressionar com o Polegar na Área plantar – Hálux na falange proximal, na porção distal",
    rationale: "A reflexologia ajuda a melhorar a resposta comportamental da pessoa",
  },
  "p66-area-motora-pe-esquerdo": {
    name: "Área Motora",
    technique: "Pressionar apenas no PÉ ESQUERDO com o Polegar – Área plantar - Hálux – No ápice externo da falange distal - 2º dedo – no ápice externo da falange distal",
    rationale: "A reflexologia ajuda a melhorar o controle dos movimentos do cerebelo",
  },
  "p67-nervo-vago-e-parassimpatico": {
    name: "Nervo vago e parassimpático",
    technique: "Pressionar o ponto: Área plantar – entre o 2º e o 3º dedo – desde a lateral interna do cubóide, subindo até a articulação metatarso falangeana",
    rationale: "Ponto reflexo de Nervo vago e parassimpático.",
  },
  "p68-medula-espinhal-e-simpatico": {
    name: "Medula Espinhal e Simpático",
    technique: "Pressionar com o Polegar a Lateral interna – desde o hálux na falange distal, porção proximal até a articulação do calcâneo talâmica",
    rationale: "A reflexologia pode ajudar no funcionamento da medula a melhorar a condutividade no impulsos nervosos.",
  },
  "p69-nervos-raquidianos": {
    name: "Nervos Raquidianos",
    technique: "Pressionar com o polegar a Lateral interna até a plantar – desde o hálux da falange distal, porção proximal até a articulação do calcâneo.",
    rationale: "Ponto reflexo dos nervos raquidianos, que acompanham toda a coluna.",
  },
  "p71-nervo-optico": {
    name: "Nervo Óptico",
    technique: "Com o Polegar pressionar entre o2º e 3º dedo - Na lateral externa e interna das falanges média e proximal",
    rationale: "A reflexologia pode melhorar sinais nervosos do olho ao cérebro 3º e 4º dedo – Na lateral externa e interna das falanges média e proximal",
  },
  "p73-nervo-olfatorio": {
    name: "Nervo Olfatório",
    technique: "Com o Polegar pressionar a Área plantar- do 2º ao 5º dedo – Lateral interna e externa da falange distal",
    rationale: "A reflexologia pode ajudar a melhorar os receptores do nariz até o cérebro, melhorando a percepção dos odores.",
  },
  "p76-olfato": {
    name: "Olfato",
    technique: "Pressionar com o polegar a Área plantar - do 2º ao 5º dedo - nas falanges distais",
    rationale: "Ponto reflexo do olfato, na área plantar das falanges distais.",
  },
  "p77-paladar": {
    name: "Paladar",
    technique: "Pressionar com o Polegar a Área Dorsal – Hálux – Na articulação interfalangeana",
    rationale: "A reflexologia pode ajudar a detectar e processar as interpretações da substâncias químicas presentes no alimentos.",
  },
  "p79-sacro": {
    name: "Sacro",
    technique: "Pressionar com o polegar a Lateral interna – Ao longo do tálus até abaixo do maléolo",
    rationale: "Ponto reflexo do sacro, na base da coluna.",
  },
  "p80-coccix": {
    name: "Cóccix",
    technique: "Pressionar com o Polegar a Lateral interna – na articulação calcâneo talâmico abaixo do maléolo interno",
    rationale: "Ponto reflexo do cóccix, na extremidade final da coluna.",
  },
  "p82-traqueia": {
    name: "Traquéia",
    technique: "Pressionar com polegar a Área Dorsal – Hálux – lateral externa, na extensão da articulação metatarso falangeana",
    rationale: "A reflexologia pode ajudar no revestimento das paredes da traquéia",
  },
  "p84-dentes-inferiores": {
    name: "Dentes Inferiores",
    technique: "Pressionar com o polegar na Área Dorsal – 2º ao 5° dedos – Na falange proximal",
    rationale: "A Reflexologia pode ajudar fortalecer saúde da gengivas",
  },
  "p85-dentes-superiores": {
    name: "Dentes Superiores",
    technique: "Pressionar com o Polegar na Área Dorsal – 2º ao 5° dedos – Na falange média",
    rationale: "A Reflexologia pode ajudar fortalecer saúde da gengivas",
  },
};
