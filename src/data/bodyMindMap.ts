import type { BodyMindEntry, LocalizedBodyMindEntry } from "./types";
import { LANG } from "../i18n/config";

/**
 * ===========================================================================
 *  THE BRAIN — Body–Mind Map (Psychosomatic knowledge base)
 * ===========================================================================
 *
 * This is the curated "brain" of the app. When a user reports discomfort
 * (e.g. stomach ache, headache) or an emotion, the app looks up the relevant
 * entries here to explain what the body *may* be communicating, and to guide
 * the best reflexology recommendation.
 *
 * Authored from the knowledge of the reflexology specialist (Friederike
 * Portella). Content is stored bilingually (`en` / `pt`) and in a fully
 * structured, self-describing shape so it can ALSO be consumed by an LLM in
 * future AI-driven features.
 *
 * HOW TO EXTEND THIS MAP
 * ----------------------
 * 1. The specialist fills the prose template in
 *    `docs/mapa-corpo-mente-TEMPLATE.md` (Portuguese, no code needed).
 * 2. Copy `BODY_MIND_ENTRY_TEMPLATE` below, paste a new object into
 *    `RAW_BODY_MIND_MAP`, and transcribe the filled template into the fields.
 * 3. Wire it to the body silhouette via `relatedRegions`, and to emotions via
 *    `emotionTags` (use ids/tags from emotions.ts & the recommender).
 *
 * IMPORTANT: this is a reflective, complementary lens — never a medical
 * diagnosis. Physical causes always matter and must be evaluated by a
 * healthcare professional.
 */

/**
 * Copy this when adding a new entry. Every field is required except the
 * optional ones marked below. Keep `id` stable (used for matching/storage).
 */
export const BODY_MIND_ENTRY_TEMPLATE: BodyMindEntry = {
  id: "unique-id",
  category: "organ", // "organ" | "gland" | "respiratory" | "spine" | "joint"
  relatedRegions: [], // e.g. ["stomach"] — links to the body silhouette
  relatedDiscomfort: [], // optional — e.g. ["digestive"]
  emotionTags: [], // e.g. ["fear", "anxious"] — ids/tags from emotions.ts
  relatedPointIds: [], // optional — reflex point ids from reflexPoints.ts
  en: {
    name: "",
    theme: "",
    physicalFunction: [],
    meaning: "",
    reflections: [],
    questions: [],
    // patterns: [{ label: "", description: "" }], // optional
    // note: "", // optional
  },
  pt: {
    name: "",
    theme: "",
    physicalFunction: [],
    meaning: "",
    reflections: [],
    questions: [],
  },
};

const PHYSICAL_NOTE_EN =
  "Discomfort in this area can also have purely physical causes; this reading is a complementary reflection, not a diagnosis.";
const PHYSICAL_NOTE_PT =
  "O desconforto nesta região também pode ter causas puramente físicas; esta leitura é uma reflexão complementar, não um diagnóstico.";

const RAW_BODY_MIND_MAP: BodyMindEntry[] = [
  // ======================================================================
  // 1. LIVER — self-criticism
  // ======================================================================
  {
    id: "liver",
    category: "organ",
    relatedRegions: ["stomach"],
    relatedDiscomfort: ["digestive"],
    emotionTags: ["judgmental", "disgust", "frustrated", "resentful"],
    relatedPointIds: ["stomach-foot"],
    en: {
      name: "Liver",
      theme: "Strong self-criticism",
      physicalFunction: [
        "Filters substances from the blood and neutralizes toxins.",
        "Processes hormones and medications.",
        "Stores energy and transforms substances so they can be used or eliminated.",
      ],
      meaning:
        "If the liver transforms and processes everything that reaches the body, symbolically it can represent the capacity to \u201cdigest\u201d life experiences. Excessive self-criticism looks like difficulty turning mistakes into learning, a tendency to accumulate judgments about oneself, and trouble filtering what truly matters from the criticism received.",
      reflections: [
        "Everything passes through the liver to be transformed. When a person is very self-critical, they seem unable to transform experience into learning — only into guilt.",
      ],
      questions: [
        "Am I turning my mistakes into learning, or only into guilt?",
      ],
    },
    pt: {
      name: "F\u00edgado",
      theme: "Autocr\u00edtica muito forte",
      physicalFunction: [
        "Filtra subst\u00e2ncias do sangue e neutraliza toxinas.",
        "Processa horm\u00f4nios e medicamentos.",
        "Armazena energia e transforma subst\u00e2ncias para que possam ser usadas ou eliminadas.",
      ],
      meaning:
        "Se o f\u00edgado transforma e processa tudo o que chega ao organismo, simbolicamente ele pode representar a capacidade de \u201cdigerir\u201d as experi\u00eancias da vida. A autocr\u00edtica excessiva aparece como dificuldade de transformar erros em aprendizado, tend\u00eancia a acumular julgamentos sobre si mesmo e dificuldade de filtrar o que realmente importa das cr\u00edticas recebidas.",
      reflections: [
        "Tudo passa pelo f\u00edgado para ser transformado. Quando a pessoa \u00e9 muito cr\u00edtica consigo mesma, ela parece n\u00e3o conseguir transformar a experi\u00eancia em aprendizado, apenas em culpa.",
      ],
      questions: [
        "Estou transformando meus erros em aprendizado ou apenas em culpa?",
      ],
    },
  },

  // ======================================================================
  // 2. KIDNEYS — fear
  // ======================================================================
  {
    id: "kidneys",
    category: "organ",
    relatedRegions: ["lowerBack"],
    relatedDiscomfort: ["pain", "tension"],
    emotionTags: ["fear", "anxious", "worried", "insecure"],
    relatedPointIds: [],
    en: {
      name: "Kidneys",
      theme: "Fear and lack of protection",
      physicalFunction: [
        "Filter the blood and balance water and mineral salts.",
        "Help control blood pressure and produce important hormones.",
        "Maintain the body's internal equilibrium.",
      ],
      meaning:
        "Fear arises when we feel our safety is threatened. The kidney works constantly to keep the body in chemical balance; when someone lives in a permanent state of alert, they may feel they have lost that internal equilibrium. Linked symbolically to fear of the future, vulnerability, existential insecurity and difficulty trusting life.",
      reflections: [
        "The kidney helps the body keep its chemical stability; emotionally, fear appears when we feel our stability and safety are at risk.",
      ],
      questions: [
        "Where do I feel unprotected or unsupported right now?",
      ],
    },
    pt: {
      name: "Rins",
      theme: "Medo e falta de prote\u00e7\u00e3o",
      physicalFunction: [
        "Filtram o sangue e mant\u00eam o equil\u00edbrio de \u00e1gua e sais minerais.",
        "Ajudam a controlar a press\u00e3o arterial e a produzir horm\u00f4nios importantes.",
        "Contribuem para a manuten\u00e7\u00e3o do equil\u00edbrio interno do organismo.",
      ],
      meaning:
        "O medo surge quando sentimos que nossa seguran\u00e7a est\u00e1 amea\u00e7ada. O rim trabalha o tempo todo para manter o equil\u00edbrio qu\u00edmico do corpo; quando algu\u00e9m vive em estado de alerta permanente, pode sentir que perdeu esse equil\u00edbrio interno. Simbolicamente liga-se ao medo do futuro, \u00e0 vulnerabilidade, \u00e0 inseguran\u00e7a existencial e \u00e0 dificuldade de confiar na vida.",
      reflections: [
        "O rim ajuda o corpo a manter sua estabilidade qu\u00edmica; emocionalmente, o medo surge quando sentimos que nossa estabilidade e seguran\u00e7a est\u00e3o em risco.",
      ],
      questions: [
        "Onde estou me sentindo desprotegido ou sem apoio neste momento?",
      ],
    },
  },

  // ======================================================================
  // 3. THYROID — insecurity (hypo / hyper patterns)
  // ======================================================================
  {
    id: "thyroid",
    category: "gland",
    relatedRegions: ["neck"],
    relatedDiscomfort: ["tension"],
    emotionTags: ["insecure", "fear", "anxious", "fear.overwhelmed"],
    relatedPointIds: [],
    en: {
      name: "Thyroid",
      theme: "Insecurity and one's own rhythm",
      physicalFunction: [
        "Regulates the body's metabolism and the speed at which cells work.",
        "Influences energy, body temperature, heart rate and vitality.",
        "Plays an important role in growth and development.",
      ],
      meaning:
        "The thyroid is a \u201crhythm regulator\u201d — it decides how much energy to spend and how fast to work. An insecure person often lives a conflict between advancing or retreating, speaking or staying silent, trusting or doubting themselves. Located in the throat, it is also tied to expressing needs, fear of judgment and swallowing words or emotions.",
      reflections: [
        "The thyroid regulates the speed of life in the body; insecurity can arise when a person doesn't trust their own rhythm, choices or voice.",
      ],
      questions: [
        "Am I trusting my own pace and my own voice?",
      ],
      patterns: [
        {
          label: "Hypothyroid (symbolic)",
          description: "Tendency to retract, difficulty asserting oneself, discouragement or resignation.",
        },
        {
          label: "Hyperthyroid (symbolic)",
          description: "Constant alertness, needing to handle everything, anxiety and excess responsibility.",
        },
      ],
    },
    pt: {
      name: "Tireoide",
      theme: "Inseguran\u00e7a e o pr\u00f3prio ritmo",
      physicalFunction: [
        "Regula o metabolismo do corpo e a velocidade com que as c\u00e9lulas trabalham.",
        "Influencia a energia, a temperatura corporal, a frequ\u00eancia card\u00edaca e a vitalidade.",
        "Tem papel importante no crescimento e desenvolvimento.",
      ],
      meaning:
        "A tireoide \u00e9 um \u201cregulador de ritmo\u201d \u2014 decide quanta energia gastar e em que velocidade funcionar. Uma pessoa insegura costuma viver o conflito entre avan\u00e7ar ou recuar, se expressar ou se calar, confiar ou duvidar de si mesma. Por ficar na garganta, tamb\u00e9m se liga \u00e0 dificuldade de expressar necessidades, ao medo de julgamento e a engolir palavras ou emo\u00e7\u00f5es.",
      reflections: [
        "A tireoide regula a velocidade da vida no corpo; a inseguran\u00e7a pode surgir quando a pessoa n\u00e3o confia no pr\u00f3prio ritmo, nas pr\u00f3prias escolhas ou na pr\u00f3pria voz.",
      ],
      questions: [
        "Estou confiando no meu pr\u00f3prio ritmo e na minha pr\u00f3pria voz?",
      ],
      patterns: [
        {
          label: "Hipotireoidismo (simb\u00f3lico)",
          description: "Tend\u00eancia a se retrair, dificuldade de se colocar, desânimo ou resigna\u00e7\u00e3o.",
        },
        {
          label: "Hipertireoidismo (simb\u00f3lico)",
          description: "Estado de alerta constante, necessidade de dar conta de tudo, ansiedade e excesso de responsabilidade.",
        },
      ],
    },
  },

  // ======================================================================
  // 4. PANCREAS — fear of losing control
  // ======================================================================
  {
    id: "pancreas",
    category: "gland",
    relatedRegions: ["stomach"],
    relatedDiscomfort: ["digestive"],
    emotionTags: ["anxious", "worried", "overwhelmed", "fear"],
    relatedPointIds: ["stomach-foot"],
    en: {
      name: "Pancreas",
      theme: "Fear of losing control",
      physicalFunction: [
        "Produces insulin and glucagon, regulating blood glucose.",
        "Produces digestive enzymes to break down food.",
        "Works continuously to keep the body's energy balance.",
      ],
      meaning:
        "The pancreas is a great regulator, constantly making fine adjustments to keep balance. A person with a strong need for control tries to predict everything, avoid mistakes and manage situations to feel safe. It is also tied to how we receive the \u201csweetness\u201d of life, pleasure and satisfaction. When life becomes unpredictable, anxiety and the fear of things slipping out of control can arise.",
      reflections: [
        "Just as the pancreas works to balance blood sugar, the person who fears losing control tries to keep everything in check to preserve their sense of safety.",
      ],
      questions: [
        "Am I able to trust life, or do I feel I must control everything to feel safe?",
      ],
    },
    pt: {
      name: "P\u00e2ncreas",
      theme: "Medo de perder o controle",
      physicalFunction: [
        "Produz insulina e glucagon, regulando a glicose no sangue.",
        "Produz enzimas digestivas para quebrar os alimentos.",
        "Atua continuamente para manter o equil\u00edbrio energ\u00e9tico do organismo.",
      ],
      meaning:
        "O p\u00e2ncreas \u00e9 um grande regulador, fazendo ajustes finos o tempo todo para manter o equil\u00edbrio. Uma pessoa com forte necessidade de controle tenta prever tudo, evitar erros e administrar situa\u00e7\u00f5es para se sentir segura. Tamb\u00e9m se liga \u00e0 forma como recebemos a \u201cdo\u00e7ura\u201d da vida, o prazer e a satisfa\u00e7\u00e3o. Quando a vida se torna imprevis\u00edvel, surgem ansiedade e o medo de que as coisas saiam do controle.",
      reflections: [
        "Assim como o p\u00e2ncreas trabalha para manter o equil\u00edbrio do a\u00e7\u00facar no sangue, a pessoa que teme perder o controle tenta manter tudo sob controle para preservar sua sensa\u00e7\u00e3o de seguran\u00e7a.",
      ],
      questions: [
        "Estou conseguindo confiar na vida ou sinto que preciso controlar tudo para me sentir seguro?",
      ],
    },
  },

  // ======================================================================
  // 5. OVARIES / TESTES — fear of the future and of growing
  // ======================================================================
  {
    id: "gonads",
    category: "organ",
    relatedRegions: ["hips"],
    relatedDiscomfort: ["pain", "tension"],
    emotionTags: ["fear", "insecure", "worried"],
    relatedPointIds: [],
    en: {
      name: "Ovaries / Testes",
      theme: "Fear of the future and of growing",
      physicalFunction: [
        "Produce sexual hormones and take part in fertility and reproduction.",
        "Linked to sexual development and biological maturity.",
        "Represent the capacity to generate life and continuity.",
      ],
      meaning:
        "These organs are deeply tied to entering new phases of life — symbolically, growth, maturing, creativity and generating new projects. Beyond having children, they represent the ability to create something new: a project, a career change, a new way of relating. Conflicts here may show as fear of maturing, resistance to inevitable change, and fear of stepping into one's own power.",
      reflections: [
        "The ovaries and testes help the body become able to generate the future; emotionally, fear of the future appears when one dreads the responsibilities and transformations that growth requires.",
      ],
      questions: [
        "What in me wants to be born or to grow, but meets fear or resistance?",
      ],
    },
    pt: {
      name: "Ov\u00e1rios / Test\u00edculos",
      theme: "Medo do futuro e de crescer",
      physicalFunction: [
        "Produzem os horm\u00f4nios sexuais e participam da fertilidade e da reprodu\u00e7\u00e3o.",
        "Ligados ao desenvolvimento sexual e \u00e0 maturidade biol\u00f3gica.",
        "Representam a capacidade de gerar vida e dar continuidade ao futuro.",
      ],
      meaning:
        "Esses \u00f3rg\u00e3os est\u00e3o profundamente ligados \u00e0 passagem para novas fases da vida \u2014 simbolicamente, crescimento, amadurecimento, criatividade e gera\u00e7\u00e3o de novos projetos. Al\u00e9m de gerar filhos, representam a capacidade de criar algo novo: um projeto, uma mudan\u00e7a de carreira, uma nova forma de se relacionar. Conflitos aqui podem aparecer como medo de amadurecer, resist\u00eancia a mudan\u00e7as inevit\u00e1veis e receio de assumir o pr\u00f3prio poder pessoal.",
      reflections: [
        "Os ov\u00e1rios e test\u00edculos ajudam o corpo a se tornar capaz de gerar o futuro; emocionalmente, o medo do futuro aparece quando a pessoa teme as responsabilidades e transforma\u00e7\u00f5es que esse crescimento exige.",
      ],
      questions: [
        "O que em mim quer nascer ou crescer, mas encontra medo ou resist\u00eancia?",
      ],
    },
  },

  // ======================================================================
  // 6. PITUITARY — irritability
  // ======================================================================
  {
    id: "pituitary",
    category: "gland",
    relatedRegions: ["head"],
    relatedDiscomfort: ["headache", "tension"],
    emotionTags: ["irritated", "frustrated", "overwhelmed", "impatient"],
    relatedPointIds: ["head-toes", "hand-thumb-head"],
    en: {
      name: "Pituitary",
      theme: "Irritability and overload",
      physicalFunction: [
        "The \u201cmaster gland\u201d of the endocrine system.",
        "Produces hormones that regulate other glands (thyroid, adrenals, gonads).",
        "A coordination center for growth, stress response, fluid balance and metabolism.",
      ],
      meaning:
        "The pituitary constantly organizes and orchestrates the body's systems. Irritability often appears when a person feels they must control, organize or sustain more than they can — too many responsibilities, difficulty delegating, the sense that no one does things right, and frustration when reality doesn't match expectations.",
      reflections: [
        "Just as the pituitary coordinates many systems to keep order in the body, irritability can appear when a person feels they must coordinate and sustain more than they're able to.",
      ],
      questions: [
        "What am I trying to manage, coordinate or sustain beyond my limits?",
      ],
    },
    pt: {
      name: "Hip\u00f3fise",
      theme: "Irritabilidade e sobrecarga",
      physicalFunction: [
        "A \u201cgl\u00e2ndula mestra\u201d do sistema end\u00f3crino.",
        "Produz horm\u00f4nios que regulam outras gl\u00e2ndulas (tireoide, suprarrenais, g\u00f4nadas).",
        "Centro de coordena\u00e7\u00e3o do crescimento, resposta ao estresse, equil\u00edbrio h\u00eddrico e metabolismo.",
      ],
      meaning:
        "A hip\u00f3fise organiza e orquestra constantemente os sistemas do corpo. A irritabilidade costuma aparecer quando a pessoa sente que precisa controlar, organizar ou sustentar mais do que consegue \u2014 muitas responsabilidades, dificuldade de delegar, a sensa\u00e7\u00e3o de que ningu\u00e9m faz as coisas direito e frustra\u00e7\u00e3o quando a realidade n\u00e3o acompanha as expectativas.",
      reflections: [
        "Assim como a hip\u00f3fise coordena diversos sistemas para manter a ordem no organismo, a irritabilidade pode aparecer quando a pessoa sente que precisa coordenar e sustentar mais do que consegue.",
      ],
      questions: [
        "O que estou tentando administrar, coordenar ou sustentar al\u00e9m dos meus limites?",
      ],
    },
  },

  // ======================================================================
  // 7. ADRENALS — anxiety
  // ======================================================================
  {
    id: "adrenals",
    category: "gland",
    relatedRegions: ["lowerBack"],
    relatedDiscomfort: ["stress", "fatigue"],
    emotionTags: ["anxious", "worried", "fear", "overwhelmed", "stress"],
    relatedPointIds: ["solar-plexus-foot", "hand-solar", "ear-shenmen"],
    en: {
      name: "Adrenals",
      theme: "Anxiety and constant alertness",
      physicalFunction: [
        "Produce adrenaline, noradrenaline and cortisol — the main stress hormones.",
        "Prepare the body to react to threats (fight, flight or freeze).",
        "Raise alertness, blood pressure, heart rate and available energy.",
      ],
      meaning:
        "The adrenals are the body's emergency accelerator, built to respond to real, temporary threats. Anxiety can represent an alarm system that stays switched on for too long — hypervigilance, difficulty relaxing, a need to anticipate problems and the feeling of having to be ready for everything.",
      reflections: [
        "The adrenals prepare the body to face danger; anxiety appears when the mind stays in a state of preparation for dangers that haven't happened yet.",
      ],
      questions: [
        "What danger am I preparing for all the time?",
      ],
    },
    pt: {
      name: "Suprarrenais",
      theme: "Ansiedade e alerta constante",
      physicalFunction: [
        "Produzem adrenalina, noradrenalina e cortisol \u2014 os principais horm\u00f4nios do estresse.",
        "Preparam o corpo para reagir a amea\u00e7as (luta, fuga ou congelamento).",
        "Aumentam o alerta, a press\u00e3o arterial, a frequ\u00eancia card\u00edaca e a energia dispon\u00edvel.",
      ],
      meaning:
        "As suprarrenais s\u00e3o o acelerador de emerg\u00eancia do corpo, feitas para responder a amea\u00e7as reais e tempor\u00e1rias. A ansiedade pode representar um sistema de alerta que permanece ligado por tempo demais \u2014 hipervigil\u00e2ncia, dificuldade de relaxar, necessidade de antecipar problemas e a sensa\u00e7\u00e3o de precisar estar preparada para tudo.",
      reflections: [
        "As suprarrenais preparam o corpo para enfrentar perigos; a ansiedade surge quando a mente permanece em estado de prepara\u00e7\u00e3o para perigos que ainda n\u00e3o aconteceram.",
      ],
      questions: [
        "Contra qual perigo estou me preparando o tempo todo?",
      ],
    },
  },

  // ======================================================================
  // 8. HYPOTHALAMUS — mental overload / confusion
  // ======================================================================
  {
    id: "hypothalamus",
    category: "gland",
    relatedRegions: ["head"],
    relatedDiscomfort: ["headache", "fatigue", "stress"],
    emotionTags: ["overwhelmed", "confused", "fear.overwhelmed"],
    relatedPointIds: ["head-toes", "ear-zero"],
    en: {
      name: "Hypothalamus",
      theme: "Overloaded mind, confusion of thoughts",
      physicalFunction: [
        "A great integrating center between brain, nervous system and hormones.",
        "Regulates hunger, thirst, temperature, sleep, wakefulness and stress response.",
        "Works constantly to keep internal balance (homeostasis).",
      ],
      meaning:
        "The hypothalamus is a command center receiving countless signals at once and deciding the body's responses. An overloaded mind lives something similar: too much information, many simultaneous worries, difficulty prioritizing and finding clarity. Because it governs sleep, hunger and stress, overload often shows as trouble sleeping, racing thoughts, appetite changes and exhaustion.",
      reflections: [
        "The hypothalamus integrates countless signals to keep the body balanced; mental confusion arises when there's too much to organize and integrate.",
      ],
      questions: [
        "Among so many demands, what do I truly need right now?",
      ],
    },
    pt: {
      name: "Hipot\u00e1lamo",
      theme: "Mente sobrecarregada, confus\u00e3o de pensamentos",
      physicalFunction: [
        "Grande centro integrador entre c\u00e9rebro, sistema nervoso e horm\u00f4nios.",
        "Regula fome, sede, temperatura, sono, vig\u00edlia e resposta ao estresse.",
        "Trabalha o tempo todo para manter o equil\u00edbrio interno (homeostase).",
      ],
      meaning:
        "O hipot\u00e1lamo \u00e9 um centro de comando que recebe in\u00fameros sinais ao mesmo tempo e decide as respostas do corpo. Uma mente sobrecarregada vive algo parecido: excesso de informa\u00e7\u00f5es, muitas preocupa\u00e7\u00f5es simult\u00e2neas, dificuldade de priorizar e de encontrar clareza. Por reger sono, fome e estresse, a sobrecarga costuma aparecer como dificuldade para dormir, pensamentos acelerados, altera\u00e7\u00f5es no apetite e cansa\u00e7o.",
      reflections: [
        "O hipot\u00e1lamo integra in\u00fameros sinais para manter o equil\u00edbrio do organismo; a confus\u00e3o mental surge quando h\u00e1 informa\u00e7\u00e3o demais para organizar e integrar.",
      ],
      questions: [
        "Entre tantas demandas, do que eu realmente preciso neste momento?",
      ],
    },
  },

  // ======================================================================
  // 9. LUNGS — deep sadness, difficulty expressing
  // ======================================================================
  {
    id: "lungs",
    category: "respiratory",
    relatedRegions: ["chest"],
    relatedDiscomfort: ["tension", "fatigue"],
    emotionTags: ["sad", "sadness", "lonely", "disappointed", "sadness.hurt"],
    relatedPointIds: ["solar-plexus-foot"],
    en: {
      name: "Lungs",
      theme: "Deep sadness, holding feelings in",
      physicalFunction: [
        "Take in the oxygen that sustains life and release carbon dioxide.",
        "Adapt the breathing rhythm to the body's needs.",
        "Are in direct contact with the outside world through the breath.",
      ],
      meaning:
        "When we cry, sigh or feel a tight chest, breathing is one of the first things to change. The lungs receive and release air; emotionally, sadness is often tied to the difficulty of letting go of what was lost and of fully welcoming the life that continues. Breath is also expression — when feelings stay held in, it can feel like holding the breath of one's own life. Associated with grief, longing, loss and melancholy.",
      reflections: [
        "The lungs move the air that allows expression; when feelings are held back, it can feel like holding the breath of one's own life.",
      ],
      questions: [
        "What am I having a hard time letting go of?",
        "What inside me needs to be said, cried or shared?",
      ],
    },
    pt: {
      name: "Pulm\u00f5es",
      theme: "Tristeza profunda, segurar sentimentos",
      physicalFunction: [
        "Recebem o oxig\u00eanio que sustenta a vida e eliminam o g\u00e1s carb\u00f4nico.",
        "Adaptam o ritmo respirat\u00f3rio \u00e0s necessidades do organismo.",
        "Est\u00e3o em contato direto com o mundo exterior pela respira\u00e7\u00e3o.",
      ],
      meaning:
        "Quando choramos, suspiramos ou sentimos um aperto no peito, a respira\u00e7\u00e3o \u00e9 uma das primeiras fun\u00e7\u00f5es a se alterar. Os pulm\u00f5es recebem e liberam o ar; emocionalmente, a tristeza muitas vezes se liga \u00e0 dificuldade de deixar ir o que foi perdido e de acolher plenamente a vida que continua. A respira\u00e7\u00e3o tamb\u00e9m \u00e9 express\u00e3o \u2014 quando os sentimentos ficam retidos, pode surgir a sensa\u00e7\u00e3o de estar prendendo a respira\u00e7\u00e3o da pr\u00f3pria vida. Associados ao luto, \u00e0 saudade, \u00e0s perdas e \u00e0 melancolia.",
      reflections: [
        "Os pulm\u00f5es movimentam o ar que permite a express\u00e3o; quando sentimentos ficam retidos, pode surgir a sensa\u00e7\u00e3o de estar prendendo a respira\u00e7\u00e3o da pr\u00f3pria vida.",
      ],
      questions: [
        "O que estou tendo dificuldade de deixar partir?",
        "O que dentro de mim precisa ser dito, chorado ou compartilhado?",
      ],
    },
  },

  // ======================================================================
  // 10. BRONCHI — fear of rejection
  // ======================================================================
  {
    id: "bronchi",
    category: "respiratory",
    relatedRegions: ["chest"],
    relatedDiscomfort: ["tension"],
    emotionTags: ["fear", "insecure", "lonely", "sad"],
    relatedPointIds: ["solar-plexus-foot"],
    en: {
      name: "Bronchi",
      theme: "Fear of rejection",
      physicalFunction: [
        "Channels that carry air from the lungs to where gas exchange happens.",
        "Must stay open so air can circulate freely.",
        "When irritated or contracted, the passage of air becomes harder.",
      ],
      meaning:
        "The bronchi bridge the outer world (incoming air) and the inner body. Fear of rejection also involves the relationship between self and other: Can I show who I am? Will I be accepted? Do I have space to exist? Symbolically, fear of rejection is a tendency to \u201cclose this passage\u201d to avoid pain — which also limits exchange, contact and belonging.",
      reflections: [
        "The bronchi let air reach the inside of the body; fear of rejection arises when a person struggles to let the world or others come close to their inner world.",
      ],
      questions: [
        "Where am I protecting myself so much from rejection that I'm limiting my ability to connect?",
      ],
    },
    pt: {
      name: "Br\u00f4nquios",
      theme: "Medo de rejei\u00e7\u00e3o",
      physicalFunction: [
        "Canais que conduzem o ar dos pulm\u00f5es at\u00e9 onde ocorre a troca gasosa.",
        "Precisam permanecer abertos para que o ar circule livremente.",
        "Quando irritados ou contra\u00eddos, a passagem do ar fica mais dif\u00edcil.",
      ],
      meaning:
        "Os br\u00f4nquios fazem a ponte entre o mundo externo (o ar que entra) e o interior do corpo. O medo de rejei\u00e7\u00e3o tamb\u00e9m envolve a rela\u00e7\u00e3o entre o eu e o outro: Posso me mostrar como sou? Serei aceito? Tenho espa\u00e7o para existir? Simbolicamente, o medo de rejei\u00e7\u00e3o \u00e9 uma tend\u00eancia a \u201cfechar essa passagem\u201d para evitar a dor \u2014 o que tamb\u00e9m limita a troca, o contato e o pertencimento.",
      reflections: [
        "Os br\u00f4nquios permitem que o ar entre em contato com o interior do corpo; o medo de rejei\u00e7\u00e3o surge quando a pessoa sente dificuldade em permitir que o mundo ou as pessoas se aproximem de seu mundo interior.",
      ],
      questions: [
        "Onde estou me protegendo tanto da rejei\u00e7\u00e3o que acabo restringindo minha capacidade de me conectar?",
      ],
    },
  },

  // ======================================================================
  // 11. SINUSES — feeling bothered / irritated
  // ======================================================================
  {
    id: "sinuses",
    category: "respiratory",
    relatedRegions: ["head"],
    relatedDiscomfort: ["headache", "tension"],
    emotionTags: ["irritated", "uneasy", "disgust.uneasy", "frustrated"],
    relatedPointIds: ["head-toes", "hand-thumb-head"],
    en: {
      name: "Sinuses",
      theme: "Feeling bothered or invaded",
      physicalFunction: [
        "Air-filled cavities around the nose that produce protective mucus.",
        "Help filter particles, dust and irritants.",
        "Part of the first line of contact with the external environment.",
      ],
      meaning:
        "The sinuses are very sensitive to irritants; when something bothers them — dust, smoke, allergens — they inflame and congest. Emotionally, a person may be reacting to situations or people they feel as invasive or bothersome. It is tied to accumulated irritation, small repeated annoyances, the sense of invaded boundaries and discomforts that go unexpressed.",
      reflections: [
        "The sinuses help filter what comes in; discomfort can arise when a person struggles to filter or keep out something invading their space.",
      ],
      questions: [
        "What keeps bothering me that hasn't yet been acknowledged or expressed?",
      ],
    },
    pt: {
      name: "Seios da face",
      theme: "Sentir-se incomodado ou invadido",
      physicalFunction: [
        "Cavidades cheias de ar ao redor do nariz que produzem muco protetor.",
        "Ajudam a filtrar part\u00edculas, poeira e agentes irritantes.",
        "Fazem parte da primeira linha de contato com o ambiente externo.",
      ],
      meaning:
        "Os seios da face s\u00e3o muito sens\u00edveis a irritantes; quando algo incomoda \u2014 poeira, fuma\u00e7a, alerg\u00eanicos \u2014 eles inflamam e congestionam. Emocionalmente, a pessoa pode estar reagindo a situa\u00e7\u00f5es ou pessoas que sente como invasivas ou inc\u00f4modas. Liga-se \u00e0 irrita\u00e7\u00e3o acumulada, a pequenos aborrecimentos repetidos, \u00e0 sensa\u00e7\u00e3o de invas\u00e3o de limites e a inc\u00f4modos n\u00e3o expressos.",
      reflections: [
        "Os seios da face ajudam a filtrar o que entra; o inc\u00f4modo pode surgir quando a pessoa sente dificuldade de filtrar ou manter fora algo que invade seu espa\u00e7o.",
      ],
      questions: [
        "O que est\u00e1 me incomodando repetidamente e ainda n\u00e3o foi reconhecido ou expresso?",
      ],
    },
  },

  // ======================================================================
  // 12. PINEAL — disconnection from one's natural rhythms
  // ======================================================================
  {
    id: "pineal",
    category: "gland",
    relatedRegions: ["head"],
    relatedDiscomfort: ["headache", "fatigue"],
    emotionTags: ["confused", "sad", "tired", "disconnected", "sadness.drained"],
    relatedPointIds: ["ear-shenmen", "ear-zero"],
    en: {
      name: "Pineal",
      theme: "Disconnection from one's natural rhythms",
      physicalFunction: [
        "Produces melatonin and regulates the sleep–wake cycle.",
        "Helps the body recognize the cycles of day and night.",
        "Takes part in synchronizing the body's biological rhythms.",
      ],
      meaning:
        "The pineal helps the body distinguish moments and cycles, organizing the inner rhythm. Difficulty here can reflect a struggle to clearly perceive what's happening within, to sync with one's own cycles of rest and renewal, and to remember that periods of darkness are part of a cycle that eventually transforms.",
      reflections: [
        "The pineal guides the body through cycles of light and shadow; melancholy can arise when a person struggles to see that periods of darkness are part of a cycle that eventually changes.",
      ],
      questions: [
        "Am I respecting my inner cycles, or living disconnected from my own rhythm?",
      ],
      patterns: [
        { label: "Clarity", description: "Confusion of feelings — difficulty perceiving the inner world clearly." },
        { label: "Sleep", description: "Disrupted sleep — difficulty syncing with one's cycles of rest." },
        { label: "Harmony", description: "Mood swings — difficulty finding emotional stability." },
        { label: "Melancholy", description: "Staying more connected to emotional darkness than to vitality and hope." },
      ],
    },
    pt: {
      name: "Pineal",
      theme: "Desconex\u00e3o dos pr\u00f3prios ritmos",
      physicalFunction: [
        "Produz melatonina e regula o ciclo sono\u2013vig\u00edlia.",
        "Ajuda o organismo a reconhecer os ciclos de dia e noite.",
        "Participa da sincroniza\u00e7\u00e3o dos ritmos biol\u00f3gicos do corpo.",
      ],
      meaning:
        "A pineal ajuda o organismo a distinguir momentos e ciclos, organizando o ritmo interno. A dificuldade aqui pode refletir um esfor\u00e7o para perceber com clareza o que acontece por dentro, para entrar em sintonia com os pr\u00f3prios ciclos de repouso e renova\u00e7\u00e3o, e para lembrar que os per\u00edodos de escurid\u00e3o fazem parte de um ciclo que eventualmente se transforma.",
      reflections: [
        "A pineal orienta o organismo atrav\u00e9s dos ciclos de luz e sombra; a melancolia pode surgir quando a pessoa sente dificuldade de perceber que os per\u00edodos de escurid\u00e3o tamb\u00e9m fazem parte de um ciclo que eventualmente se transforma.",
      ],
      questions: [
        "Estou conseguindo respeitar meus ciclos internos ou estou vivendo desconectada do meu pr\u00f3prio ritmo?",
      ],
      patterns: [
        { label: "Clareza", description: "Confus\u00e3o de sentimentos \u2014 dificuldade de perceber o mundo interno com clareza." },
        { label: "Sono", description: "Dist\u00farbios do sono \u2014 dificuldade de entrar em sintonia com os ciclos de repouso." },
        { label: "Harmonia", description: "Oscila\u00e7\u00f5es de humor \u2014 dificuldade de encontrar estabilidade emocional." },
        { label: "Melancolia", description: "Permanecer mais conectada \u00e0 escurid\u00e3o emocional do que \u00e0 vitalidade e \u00e0 esperan\u00e7a." },
      ],
    },
  },

  // ======================================================================
  // 13. CERVICAL SPINE — carrying the world on one's shoulders
  // ======================================================================
  {
    id: "cervical-spine",
    category: "spine",
    relatedRegions: ["neck", "shoulders", "upperBack"],
    relatedDiscomfort: ["tension", "stiffness", "pain"],
    emotionTags: ["overwhelmed", "stress", "tension", "worried", "fear.overwhelmed"],
    relatedPointIds: ["spine-foot", "shoulder-foot", "hand-webbing"],
    en: {
      name: "Cervical spine",
      theme: "Carrying the world on your shoulders",
      physicalFunction: [
        "Supports the weight of the head and lets us look in different directions.",
        "Gives mobility and flexibility to the neck.",
        "Protects important nerve structures.",
      ],
      meaning:
        "The head represents our thoughts, worries, responsibilities and control; the cervical spine is the structure that \u201ccarries\u201d all of it. Too many responsibilities feel like sustaining more than one can; a need to control everything brings rigidity; difficulty being flexible reduces mobility. Under stress the neck and shoulder muscles involuntarily contract — a real physiological link between worry and tension.",
      reflections: [
        "I'm sustaining more responsibilities, worries or control than I can carry with lightness.",
      ],
      questions: [
        "What am I carrying that I could set down or share?",
      ],
      note: "Cervical issues also have important physical causes — posture, screen time, disc wear, aging. The emotional reading complements, but never replaces, physical evaluation.",
    },
    pt: {
      name: "Coluna cervical",
      theme: "Levar o mundo nas costas",
      physicalFunction: [
        "Sustenta o peso da cabe\u00e7a e permite olhar para diferentes dire\u00e7\u00f5es.",
        "D\u00e1 mobilidade e flexibilidade ao pesco\u00e7o.",
        "Protege estruturas nervosas importantes.",
      ],
      meaning:
        "A cabe\u00e7a representa nossos pensamentos, preocupa\u00e7\u00f5es, responsabilidades e controle; a cervical \u00e9 a estrutura que \u201ccarrega\u201d tudo isso. Excesso de responsabilidades vira a sensa\u00e7\u00e3o de sustentar mais do que se consegue; a necessidade de controlar tudo traz rigidez; a dificuldade de flexibilizar reduz a mobilidade. Sob estresse, os m\u00fasculos do pesco\u00e7o e dos ombros se contraem involuntariamente \u2014 uma liga\u00e7\u00e3o fisiol\u00f3gica real entre preocupa\u00e7\u00e3o e tens\u00e3o.",
      reflections: [
        "Estou sustentando mais responsabilidades, preocupa\u00e7\u00f5es ou controle do que consigo carregar com leveza.",
      ],
      questions: [
        "O que estou carregando que poderia pousar ou dividir?",
      ],
      note: "Problemas cervicais tamb\u00e9m t\u00eam causas f\u00edsicas importantes \u2014 postura, horas no computador, desgaste dos discos, envelhecimento. A leitura emocional complementa, mas nunca substitui, a avalia\u00e7\u00e3o f\u00edsica.",
    },
  },

  // ======================================================================
  // 14. LUMBAR SPINE — support, effort without progress
  // ======================================================================
  {
    id: "lumbar-spine",
    category: "spine",
    relatedRegions: ["lowerBack", "hips"],
    relatedDiscomfort: ["pain", "stiffness", "fatigue"],
    emotionTags: ["overwhelmed", "tired", "worried", "sadness.drained"],
    relatedPointIds: ["spine-foot"],
    en: {
      name: "Lumbar spine",
      theme: "Support, effort without progress",
      physicalFunction: [
        "Sustains much of the body's weight and gives stability to stand.",
        "Transmits the force of the legs to the trunk.",
        "Tied to movement and the support of daily life.",
      ],
      meaning:
        "The lower back is linked to support, security, work, survival and the ability to move forward in life. When someone works hard and reaps little, makes constant effort without seeing progress, or carries many obligations without recognition, the body metaphor becomes: \u201cI'm pushing to move forward, but I don't seem to get anywhere.\u201d Under continuous pressure the lumbar muscles tense and tire.",
      reflections: [
        "I'm carrying too much weight, making a lot of effort to advance, and sustaining responsibilities without feeling supported.",
      ],
      questions: [
        "Where am I pushing hard without feeling supported or seeing progress?",
      ],
      note: "Lower-back pain has many real physical causes; the emotional reading is a complementary reflection on one's current moment in life.",
    },
    pt: {
      name: "Coluna lombar",
      theme: "Sustenta\u00e7\u00e3o, esfor\u00e7o sem avan\u00e7o",
      physicalFunction: [
        "Sustenta grande parte do peso do corpo e d\u00e1 estabilidade para ficar em p\u00e9.",
        "Transmite a for\u00e7a das pernas para o tronco.",
        "Ligada ao movimento e \u00e0 sustenta\u00e7\u00e3o da vida di\u00e1ria.",
      ],
      meaning:
        "A lombar liga-se \u00e0 sustenta\u00e7\u00e3o, \u00e0 seguran\u00e7a, ao trabalho, \u00e0 sobreviv\u00eancia e \u00e0 capacidade de avan\u00e7ar na vida. Quando algu\u00e9m trabalha muito e colhe pouco, faz esfor\u00e7o constante sem ver progresso ou carrega muitas obriga\u00e7\u00f5es sem reconhecimento, a met\u00e1fora corporal vira: \u201cestou fazendo for\u00e7a para seguir em frente, mas pare\u00e7o n\u00e3o sair do lugar.\u201d Sob press\u00e3o cont\u00ednua, os m\u00fasculos lombares tensionam e cansam.",
      reflections: [
        "Estou carregando peso demais, fazendo muito esfor\u00e7o para avan\u00e7ar e sustentando responsabilidades sem me sentir apoiado.",
      ],
      questions: [
        "Onde estou fazendo for\u00e7a sem me sentir apoiado ou sem ver resultado?",
      ],
      note: "A dor lombar tem in\u00fameras causas f\u00edsicas reais; a leitura emocional \u00e9 uma reflex\u00e3o complementar sobre o momento de vida da pessoa.",
    },
  },

  // ======================================================================
  // 15. KNEE — rigidity, difficulty yielding
  // ======================================================================
  {
    id: "knee",
    category: "joint",
    relatedRegions: ["legs"],
    relatedDiscomfort: ["pain", "stiffness"],
    emotionTags: ["frustrated", "fear", "resentful", "anger.resentful"],
    relatedPointIds: [],
    en: {
      name: "Knee",
      theme: "Rigidity, difficulty yielding",
      physicalFunction: [
        "Lets the legs bend and extend, and cushions impact.",
        "Adapts the body to different terrains and situations.",
        "Combines firmness to support weight with flexibility to bend.",
      ],
      meaning:
        "Because it joins firmness and flexibility, the knee is tied to flexibility before life, the ability to yield when needed, adapting to change and accepting what we can't control. \u201cI can't bend before this situation\u201d echoes its physical role. It can also reflect resistance to change, difficulty accepting help, and the conflict between insisting and giving way.",
      reflections: [
        "I'm trying to stay firm, but I struggle to adapt or yield to what life is asking of me.",
      ],
      questions: [
        "Where is life asking me to bend, and I'm resisting?",
      ],
      note: "Knee problems have many physical causes (wear, injury, weight, muscle weakness). The emotional reading is a complementary reflection.",
    },
    pt: {
      name: "Joelho",
      theme: "Rigidez, dificuldade de ceder",
      physicalFunction: [
        "Permite dobrar e estender as pernas e amortece impactos.",
        "Adapta o corpo a diferentes terrenos e situa\u00e7\u00f5es.",
        "Combina firmeza para sustentar o peso e flexibilidade para se dobrar.",
      ],
      meaning:
        "Por unir firmeza e flexibilidade, o joelho liga-se \u00e0 flexibilidade diante da vida, \u00e0 capacidade de ceder quando necess\u00e1rio, \u00e0 adapta\u00e7\u00e3o a mudan\u00e7as e \u00e0 aceita\u00e7\u00e3o do que n\u00e3o controlamos. \u201cN\u00e3o consigo me dobrar diante dessa situa\u00e7\u00e3o\u201d ecoa sua fun\u00e7\u00e3o f\u00edsica. Pode tamb\u00e9m refletir resist\u00eancia a mudan\u00e7as, dificuldade de aceitar ajuda e o conflito entre insistir e ceder.",
      reflections: [
        "Estou tentando me manter firme, mas tenho dificuldade em me adaptar ou ceder diante do que a vida est\u00e1 me pedindo.",
      ],
      questions: [
        "Onde a vida est\u00e1 me pedindo para ceder, e eu estou resistindo?",
      ],
      note: "Problemas no joelho t\u00eam in\u00fameras causas f\u00edsicas (desgaste, les\u00f5es, peso, fraqueza muscular). A leitura emocional \u00e9 uma reflex\u00e3o complementar.",
    },
  },

  // ======================================================================
  // 16. SHOULDER — the weight of decisions
  // ======================================================================
  {
    id: "shoulder",
    category: "joint",
    relatedRegions: ["shoulders", "neck"],
    relatedDiscomfort: ["tension", "stiffness", "stress"],
    emotionTags: ["overwhelmed", "worried", "stress", "fear.overwhelmed"],
    relatedPointIds: ["shoulder-foot", "hand-webbing"],
    en: {
      name: "Shoulders",
      theme: "The weight of decisions",
      physicalFunction: [
        "Let us reach, grasp and move objects, giving range to the arms.",
        "Help carry loads.",
        "Connect the trunk to action in the world — turning intention into action.",
      ],
      meaning:
        "When a person delays deciding for fear of the consequences, there's often a conflict between wanting to act and dreading what they'll have to sustain afterward. The shoulders symbolize the capacity to take on and carry the consequences of one's choices. Under stress and anxiety, the shoulders and trapezius are among the first to contract — raised shoulders, a sense of weight, stiffness in the nape.",
      reflections: [
        "I doubt not only the decision; I doubt my ability to carry its consequences.",
      ],
      questions: [
        "What weight do I fear having to sustain after deciding?",
      ],
    },
    pt: {
      name: "Ombros",
      theme: "O peso das decis\u00f5es",
      physicalFunction: [
        "Permitem alcan\u00e7ar, pegar e mover objetos, dando amplitude aos bra\u00e7os.",
        "Ajudam a carregar pesos.",
        "Ligam o tronco \u00e0 a\u00e7\u00e3o no mundo \u2014 transformam inten\u00e7\u00e3o em a\u00e7\u00e3o.",
      ],
      meaning:
        "Quando a pessoa demora a decidir por temer as consequ\u00eancias, costuma existir um conflito entre querer agir e o receio do que ter\u00e1 de sustentar depois. Os ombros simbolizam a capacidade de assumir e carregar as consequ\u00eancias das pr\u00f3prias escolhas. Sob estresse e ansiedade, ombros e trap\u00e9zio est\u00e3o entre os primeiros a se contrair \u2014 ombros elevados, sensa\u00e7\u00e3o de peso, rigidez na nuca.",
      reflections: [
        "N\u00e3o duvido apenas da decis\u00e3o; duvido da minha capacidade de carregar suas consequ\u00eancias.",
      ],
      questions: [
        "Que peso eu temo ter de sustentar depois de decidir?",
      ],
    },
  },

  // ======================================================================
  // 17. THYMUS — anguish, loss of protection
  // ======================================================================
  {
    id: "thymus",
    category: "gland",
    relatedRegions: ["chest"],
    relatedDiscomfort: ["tension"],
    emotionTags: ["anxious", "insecure", "fear", "worried"],
    relatedPointIds: ["solar-plexus-foot", "hand-solar"],
    en: {
      name: "Thymus",
      theme: "Anguish, loss of protection",
      physicalFunction: [
        "A gland behind the breastbone, at the center of the chest.",
        "Helps mature T-lymphocytes, key cells of the immune system.",
        "Helps the body tell what is its own from what is foreign.",
      ],
      meaning:
        "Symbolically the thymus is tied to protection, safety, trust in life and feeling supported. Anguish is often felt as a tight chest, an undefined sense of threat, insecurity about the future and a loss of the feeling of protection. Just as the thymus identifies what belongs to the body and what's foreign, anguish can arise when a person feels insecure before the unknown, unsure of what they need to protect themselves from.",
      reflections: [
        "I feel I've lost the protection or safety that used to hold me; I'm facing something I can't control and don't feel supported.",
      ],
      questions: [
        "What would help me feel held and safe right now?",
      ],
    },
    pt: {
      name: "Timo",
      theme: "Ang\u00fastia, perda de prote\u00e7\u00e3o",
      physicalFunction: [
        "Gl\u00e2ndula atr\u00e1s do esterno, no centro do t\u00f3rax.",
        "Ajuda na matura\u00e7\u00e3o dos linf\u00f3citos T, c\u00e9lulas-chave do sistema imunol\u00f3gico.",
        "Ajuda o corpo a distinguir o que \u00e9 pr\u00f3prio do que \u00e9 estranho.",
      ],
      meaning:
        "Simbolicamente, o timo liga-se \u00e0 prote\u00e7\u00e3o, \u00e0 seguran\u00e7a, \u00e0 confian\u00e7a na vida e \u00e0 sensa\u00e7\u00e3o de estar amparado. A ang\u00fastia costuma ser vivida como aperto no peito, sensa\u00e7\u00e3o de amea\u00e7a indefinida, inseguran\u00e7a diante do futuro e perda da sensa\u00e7\u00e3o de prote\u00e7\u00e3o. Assim como o timo identifica o que pertence ao corpo e o que \u00e9 estranho, a ang\u00fastia pode surgir quando a pessoa se sente insegura diante do desconhecido, sem saber do que precisa se proteger.",
      reflections: [
        "Sinto que perdi a prote\u00e7\u00e3o ou a seguran\u00e7a que me sustentava; estou diante de algo que n\u00e3o consigo controlar e n\u00e3o me sinto amparado.",
      ],
      questions: [
        "O que me ajudaria a me sentir amparado e seguro neste momento?",
      ],
    },
  },

  // ======================================================================
  // 18. SPLEEN — absorbing others' suffering, boundaries
  // ======================================================================
  {
    id: "spleen",
    category: "organ",
    relatedRegions: ["stomach"],
    relatedDiscomfort: ["digestive", "fatigue"],
    emotionTags: ["overwhelmed", "sad", "worried", "sadness.hurt"],
    relatedPointIds: ["stomach-foot"],
    en: {
      name: "Spleen",
      theme: "Absorbing others' suffering, boundaries",
      physicalFunction: [
        "Filters the blood and removes aged blood cells.",
        "Takes part in the immune response.",
        "Helps the body recognize and respond to threats — a process of selection and discernment.",
      ],
      meaning:
        "The spleen takes part in deciding what stays in circulation and what should be removed. Symbolically it relates to filtering others' suffering and defining where one's responsibility ends. Someone who absorbs everyone's problems, feels responsible for easing others' pain and feels guilty when they can't, struggles to separate compassion from responsibility — \u201cwhat is mine, what belongs to the other, what do I welcome, what do I let go.\u201d",
      reflections: [
        "I feel others' suffering as if it were mine, and I blame myself when I can't ease their pain.",
      ],
      questions: [
        "Where do compassion and my responsibility end, and the other person's begin?",
      ],
    },
    pt: {
      name: "Ba\u00e7o",
      theme: "Absorver o sofrimento alheio, limites",
      physicalFunction: [
        "Filtra o sangue e remove c\u00e9lulas sangu\u00edneas envelhecidas.",
        "Participa da resposta imunol\u00f3gica.",
        "Ajuda o corpo a reconhecer e responder a amea\u00e7as \u2014 um processo de sele\u00e7\u00e3o e discernimento.",
      ],
      meaning:
        "O ba\u00e7o participa de decidir o que permanece circulando e o que deve ser removido. Simbolicamente, relaciona-se a filtrar o sofrimento dos outros e a definir at\u00e9 onde vai a pr\u00f3pria responsabilidade. Quem absorve os problemas de todos, se sente respons\u00e1vel por aliviar a dor alheia e se culpa quando n\u00e3o consegue, tem dificuldade de separar a compaix\u00e3o da responsabilidade \u2014 \u201co que \u00e9 meu, o que \u00e9 do outro, o que acolho, o que deixo seguir.\u201d",
      reflections: [
        "Sinto o sofrimento dos outros como se fosse meu e me culpo quando n\u00e3o consigo aliviar essa dor.",
      ],
      questions: [
        "Onde termina a compaix\u00e3o e a minha responsabilidade, e come\u00e7a a do outro?",
      ],
    },
  },
];

/** Apply the physical-causes note to musculoskeletal entries by default. */
function withDefaultNote(entry: BodyMindEntry): BodyMindEntry {
  const needsNote = entry.category === "spine" || entry.category === "joint";
  return {
    ...entry,
    en: { ...entry.en, note: entry.en.note ?? (needsNote ? PHYSICAL_NOTE_EN : undefined) },
    pt: { ...entry.pt, note: entry.pt.note ?? (needsNote ? PHYSICAL_NOTE_PT : undefined) },
  };
}

/** Flatten one raw entry to the active language. */
function localize(entry: BodyMindEntry): LocalizedBodyMindEntry {
  const content = LANG === "pt" ? entry.pt : entry.en;
  return {
    id: entry.id,
    category: entry.category,
    relatedRegions: entry.relatedRegions,
    relatedDiscomfort: entry.relatedDiscomfort ?? [],
    emotionTags: entry.emotionTags,
    relatedPointIds: entry.relatedPointIds ?? [],
    ...content,
  };
}

/** The localized body–mind map used by the UI. */
export const BODY_MIND_MAP: LocalizedBodyMindEntry[] =
  RAW_BODY_MIND_MAP.map(withDefaultNote).map(localize);

/** The raw, bilingual map — for AI/LLM consumption and future features. */
export const BODY_MIND_MAP_RAW: BodyMindEntry[] = RAW_BODY_MIND_MAP;

export function findBodyMindEntry(id: string): LocalizedBodyMindEntry | undefined {
  return BODY_MIND_MAP.find((e) => e.id === id);
}
