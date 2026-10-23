import { LANG } from "./config";

export type StoryBlock =
  | { type: "heading"; text: string }
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "pull"; text: string }
  | { type: "note"; text: string[] }
  | { type: "questions"; items: string[] };

export interface AuthorStory {
  eyebrow: string;
  title: string;
  readingTime: (minutes: number) => string;
  facts: { value: string; label: string }[];
  blocks: StoryBlock[];
  signature: string;
  entryTitle: string;
  entryCta: string;
  back: string;
}

const PT: AuthorStory = {
  eyebrow: "Apresentação da autora",
  title: "Friederike Lich Portella",
  readingTime: (m) => `Leitura de ${m} min`,
  facts: [
    { value: "1969", label: "Braunschweig, Alemanha" },
    { value: "28 anos", label: "de reflexologia" },
    { value: "~5.000", label: "pessoas atendidas" },
  ],
  blocks: [
    { type: "heading", text: "Onde tudo começou" },
    {
      type: "lead",
      text: "Meu nome é Friederike. Nasci em 1969, em Braunschweig, na Alemanha, mas foi no Brasil, onde vivo desde a juventude, que construí grande parte da minha história pessoal e profissional.",
    },
    {
      type: "p",
      text: "Meu encontro com a reflexologia aconteceu há cerca de 28 anos e nasceu de uma experiência muito particular: eu buscava uma forma de ajudar minha filha, que ainda era bebê e apresentava um problema de saúde relacionado, à época, a uma disfunção da suprarrenal, acompanhado de alterações nos batimentos cardíacos.",
    },
    {
      type: "p",
      text: "Foi então que aprendi a técnica da reflexologia e comecei a utilizá-la como recurso complementar. Durante aquele período, acompanhei com surpresa a evolução de minha filha e, em aproximadamente um mês, seus sintomas haviam desaparecido. Aquela experiência despertou em mim uma curiosidade que nunca mais cessou.",
    },
    { type: "pull", text: "Eu queria entender mais." },

    { type: "heading", text: "A pergunta que ficou" },
    {
      type: "p",
      text: "Quando me mudei para Sorocaba, tive a oportunidade de aprofundar meus conhecimentos em reflexologia. Mas, à medida que estudava e atendia, uma pergunta começou a ocupar cada vez mais espaço em minhas pesquisas: qual é a relação entre aquilo que vivemos emocionalmente e aquilo que o corpo manifesta?",
    },
    {
      type: "p",
      text: "Ao longo dos anos, atendi aproximadamente cinco mil pessoas diferentes. Cada uma chegou até mim com sua própria história, seus sintomas, seus conflitos, suas perdas, seus medos, suas maneiras de enfrentar a vida e, principalmente, com um corpo que também parecia contar parte dessa história.",
    },
    { type: "pull", text: "Passei, então, a observar com mais atenção." },
    {
      type: "p",
      text: "Comecei a estudar as possíveis relações entre a reflexologia e diferentes abordagens que discutem corpo e emoção, incluindo a medicina psicossomática, conceitos da medicina tradicional chinesa e ideias provenientes da chamada medicina germânica. Paralelamente, procurei compreender em detalhes a anatomia e a fisiologia de cada órgão e estrutura corporal.",
    },
    {
      type: "p",
      text: "Com o tempo, meu trabalho se transformou em uma grande investigação construída entre estudo e prática clínica. Eu observava a função física de determinada estrutura e, durante os atendimentos, escutava atentamente as experiências emocionais relatadas pelos pacientes. Aos poucos, fui registrando recorrências, fazendo perguntas e construindo associações.",
    },
    { type: "p", text: "Foi assim que nasceu a pesquisa que hoje se transforma neste App." },
    {
      type: "p",
      text: "Este trabalho também não foi construído sozinha. Ao longo dessa caminhada, tive a felicidade de conviver e trocar conhecimentos com amigos médicos e outros profissionais que contribuíram para ampliar minha maneira de olhar para o organismo humano. Tenho profunda gratidão por todos aqueles que, de alguma forma, participaram desse percurso e me ajudaram a chegar até aqui.",
    },

    { type: "heading", text: "Um convite" },
    {
      type: "note",
      text: [
        "Este App não pretende afirmar que uma emoção seja, por si só, a causa de uma doença. Tampouco pretende substituir diagnóstico, acompanhamento ou tratamento médico.",
      ],
    },
    { type: "pull", text: "Minha proposta é outra." },
    { type: "p", text: "Quero convidar você a observar o próprio corpo com mais consciência." },
    {
      type: "p",
      text: "Ao conhecer a função de um órgão e refletir sobre possíveis relações simbólicas com determinadas experiências emocionais, talvez possamos formular perguntas que normalmente não fazemos a nós mesmos.",
    },
    {
      type: "questions",
      items: [
        "O que estou sentindo?",
        "O que venho suportando?",
        "O que tenho dificuldade de expressar?",
        "O que preciso mudar na maneira como respondo às situações da minha vida?",
      ],
    },
    {
      type: "p",
      text: "Depois de tantos anos trabalhando com reflexologia, acredito que o corpo pode ser também um convite à observação de nós mesmos.",
    },
    {
      type: "p",
      text: "Meu desejo é que este App ajude cada pessoa a ampliar essa percepção e, a partir dela, desenvolver maneiras mais conscientes e assertivas de lidar com suas emoções, seus relacionamentos, seus limites e suas escolhas — sempre buscando maior equilíbrio físico e emocional.",
    },
    {
      type: "p",
      text: "Se estas linhas fizerem alguém parar por alguns instantes, olhar para si e compreender um pouco melhor aquilo que está vivendo, todo esse caminho de estudo, observação e dedicação já terá valido a pena.",
    },
  ],
  signature: "Friederike",
  entryTitle: "Apresentação da autora",
  entryCta: "Ler a história da Friederike",
  back: "Voltar para Sobre",
};

const EN: AuthorStory = {
  eyebrow: "Meet the author",
  title: "Friederike Lich Portella",
  readingTime: (m) => `${m} min read`,
  facts: [
    { value: "1969", label: "Braunschweig, Germany" },
    { value: "28 years", label: "of reflexology" },
    { value: "~5,000", label: "people seen" },
  ],
  blocks: [
    { type: "heading", text: "Where it all began" },
    {
      type: "lead",
      text: "My name is Friederike. I was born in 1969 in Braunschweig, Germany, but it was in Brazil, where I have lived since I was young, that I built much of my personal and professional life.",
    },
    {
      type: "p",
      text: "I came to reflexology about 28 years ago, through a very personal experience: I was looking for a way to help my daughter, who was still a baby and had a health problem linked, at the time, to an adrenal dysfunction, along with changes in her heartbeat.",
    },
    {
      type: "p",
      text: "That was when I learned reflexology and began using it as a complementary resource. Over that period I watched, surprised, as my daughter improved, and within about a month her symptoms had disappeared. That experience sparked a curiosity in me that has never faded.",
    },
    { type: "pull", text: "I wanted to understand more." },

    { type: "heading", text: "The question that stayed" },
    {
      type: "p",
      text: "When I moved to Sorocaba, I had the chance to deepen my knowledge of reflexology. But as I studied and saw clients, one question took up more and more room in my research: what is the relationship between what we live through emotionally and what the body expresses?",
    },
    {
      type: "p",
      text: "Over the years I have seen about five thousand different people. Each one came to me with their own story, their symptoms, their conflicts, their losses, their fears, their ways of facing life and, above all, with a body that also seemed to tell part of that story.",
    },
    { type: "pull", text: "So I began to observe more closely." },
    {
      type: "p",
      text: "I started studying the possible links between reflexology and different approaches that discuss body and emotion, including psychosomatic medicine, concepts from traditional Chinese medicine and ideas from so-called Germanic medicine. At the same time, I set out to understand in detail the anatomy and physiology of each organ and structure of the body.",
    },
    {
      type: "p",
      text: "Over time, my work became a long investigation built between study and clinical practice. I would look at the physical function of a given structure and, during sessions, listen carefully to the emotional experiences my clients described. Little by little, I recorded recurring patterns, asked questions and built associations.",
    },
    { type: "p", text: "That is how the research that has now become this app was born." },
    {
      type: "p",
      text: "Nor did I build this work alone. Along the way, I have had the joy of spending time and sharing knowledge with doctor friends and other professionals who helped widen the way I look at the human body. I am deeply grateful to everyone who, in some way, was part of this journey and helped me get here.",
    },

    { type: "heading", text: "An invitation" },
    {
      type: "note",
      text: [
        "This app does not claim that an emotion, on its own, causes an illness. Nor is it meant to replace medical diagnosis, follow-up or treatment.",
      ],
    },
    { type: "pull", text: "What I propose is something else." },
    { type: "p", text: "I want to invite you to observe your own body with more awareness." },
    {
      type: "p",
      text: "By learning what an organ does and reflecting on its possible symbolic links to certain emotional experiences, perhaps we can ask ourselves questions we don't usually ask.",
    },
    {
      type: "questions",
      items: [
        "What am I feeling?",
        "What have I been putting up with?",
        "What do I find hard to express?",
        "What do I need to change in how I respond to the situations in my life?",
      ],
    },
    {
      type: "p",
      text: "After so many years of working with reflexology, I believe the body can also be an invitation to observe ourselves.",
    },
    {
      type: "p",
      text: "My wish is that this app helps each person widen that awareness and, from there, find more conscious and assertive ways of dealing with their emotions, their relationships, their limits and their choices — always seeking greater physical and emotional balance.",
    },
    {
      type: "p",
      text: "If these lines make someone pause for a few moments, look at themselves and understand a little better what they are living through, this whole path of study, observation and dedication will already have been worth it.",
    },
  ],
  signature: "Friederike",
  entryTitle: "Meet the author",
  entryCta: "Read Friederike's story",
  back: "Back to About",
};

export const AUTHOR_STORY: AuthorStory = LANG === "pt" ? PT : EN;

const WORDS_PER_MINUTE = 200;
export const STORY_MINUTES = Math.max(
  1,
  Math.round(
    AUTHOR_STORY.blocks
      .flatMap((b) => ("items" in b ? b.items : Array.isArray(b.text) ? b.text : [b.text]))
      .join(" ")
      .split(/\s+/).length / WORDS_PER_MINUTE,
  ),
);
