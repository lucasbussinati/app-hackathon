# Mapa Corpo–Mente — o "cérebro" do Sole

Este é o documento que a especialista preenche. Ele é o **cérebro** do app:
quando a pessoa diz que está com dor de estômago, de cabeça, etc., o Sole usa
este mapa para (1) explicar o que aquela região do corpo pode estar
comunicando e (2) recomendar os melhores pontos de reflexologia.

Você **não precisa mexer em código**. Basta preencher uma ficha em texto para
cada parte do corpo, seguindo o modelo abaixo. Depois, essas fichas são
transcritas para o arquivo `src/data/bodyMindMap.ts` (o app já vem com 18
fichas pré-preenchidas a partir da sua prévia).

> ⚠️ Importante: este conteúdo é uma **leitura simbólica e complementar**, nunca
> um diagnóstico. Sempre que fizer sentido, lembre que causas físicas também
> existem e merecem avaliação profissional (use o campo "Observação").

---

## Como preencher cada ficha

Copie o bloco "MODELO DE FICHA" abaixo, uma vez para cada parte do corpo, e
preencha os campos. Quanto mais consistente o formato, mais fácil para a IA
transformar isso no mapa do app.

### Campos

- **Nome** — nome da parte do corpo / órgão / glândula. Ex.: `Fígado`.
- **Categoria** — escolha uma: `órgão`, `glândula`, `respiratório`, `coluna`,
  `articulação`.
- **Regiões do corpo** — em qual(is) área(s) da silhueta do app a pessoa
  costuma sentir/apontar. Opções disponíveis hoje:
  `cabeça, pescoço, ombros, peito, parte superior das costas, estômago, lombar,
  quadril, pernas, pés`.
- **Tipos de desconforto** (opcional) — como costuma se manifestar. Opções:
  `dor de cabeça, tensão, dor, rigidez, fadiga, digestivo, estresse`.
- **Emoções relacionadas** — quais emoções/sentimentos ativam esta ficha. Use
  termos como: `medo, ansiedade, tristeza, raiva, irritação, frustração,
  preocupação, insegurança, sobrecarga, culpa, confusão, solidão`.
- **Tema emocional** — a associação central, em uma linha. Ex.:
  `Autocrítica muito forte`.
- **Função física** — o que esta parte faz no corpo (2 a 4 frases curtas, em
  formato de lista).
- **O que pode estar dizendo** — o significado/narrativa: o que o desconforto
  ali pode estar comunicando (1 parágrafo).
- **Reflexão / meditação** — a(s) frase(s) de meditação (os seus "medite em…").
- **Perguntas simbólicas** — 1 ou 2 perguntas para a pessoa refletir.
- **Padrões** (opcional) — subpadrões, ex.: hipo/hipertireoidismo, ou os temas
  de sono/humor/melancolia da pineal. Use `Rótulo: descrição`.
- **Observação** (opcional) — lembrete de causas físicas, quando relevante
  (sempre recomendado para coluna e articulações).

---

## MODELO DE FICHA (copie e preencha)

```
### [Nome da parte do corpo]

- Nome:
- Categoria:
- Regiões do corpo:
- Tipos de desconforto:
- Emoções relacionadas:
- Tema emocional:
- Função física:
  -
  -
  -
- O que pode estar dizendo:
- Reflexão / meditação:
  -
- Perguntas simbólicas:
  -
- Padrões (opcional):
  - Rótulo: descrição
- Observação (opcional):
```

---

## Exemplo já preenchido — Fígado

```
### Fígado

- Nome: Fígado
- Categoria: órgão
- Regiões do corpo: estômago
- Tipos de desconforto: digestivo
- Emoções relacionadas: autocrítica, julgamento, frustração, ressentimento
- Tema emocional: Autocrítica muito forte
- Função física:
  - Filtra substâncias do sangue e neutraliza toxinas.
  - Processa hormônios e medicamentos.
  - Armazena energia e transforma substâncias para que possam ser usadas ou eliminadas.
- O que pode estar dizendo: Se o fígado transforma e processa tudo o que chega
  ao organismo, simbolicamente ele pode representar a capacidade de "digerir" as
  experiências da vida. A autocrítica excessiva aparece como dificuldade de
  transformar erros em aprendizado, tendência a acumular julgamentos sobre si
  mesmo e dificuldade de filtrar o que realmente importa das críticas recebidas.
- Reflexão / meditação:
  - Tudo passa pelo fígado para ser transformado. Quando a pessoa é muito crítica
    consigo mesma, ela parece não conseguir transformar a experiência em
    aprendizado, apenas em culpa.
- Perguntas simbólicas:
  - Estou transformando meus erros em aprendizado ou apenas em culpa?
- Padrões (opcional):
- Observação (opcional):
```

---

## Fichas já incluídas no app (a partir da sua prévia)

Estas 18 já estão preenchidas e funcionando no app. Você pode revisar,
corrigir ou ampliar qualquer uma, e adicionar novas seguindo o modelo acima.

| # | Parte do corpo | Tema emocional | Regiões no app |
|---|----------------|----------------|----------------|
| 1 | Fígado | Autocrítica muito forte | estômago |
| 2 | Rins | Medo e falta de proteção | lombar |
| 3 | Tireoide | Insegurança e o próprio ritmo | pescoço |
| 4 | Pâncreas | Medo de perder o controle | estômago |
| 5 | Ovários / Testículos | Medo do futuro e de crescer | quadril |
| 6 | Hipófise | Irritabilidade e sobrecarga | cabeça |
| 7 | Suprarrenais | Ansiedade e alerta constante | lombar |
| 8 | Hipotálamo | Mente sobrecarregada, confusão | cabeça |
| 9 | Pulmões | Tristeza profunda, segurar sentimentos | peito |
| 10 | Brônquios | Medo de rejeição | peito |
| 11 | Seios da face | Sentir-se incomodado ou invadido | cabeça |
| 12 | Pineal | Desconexão dos próprios ritmos | cabeça |
| 13 | Coluna cervical | Levar o mundo nas costas | pescoço, ombros, costas |
| 14 | Coluna lombar | Sustentação, esforço sem avanço | lombar, quadril |
| 15 | Joelho | Rigidez, dificuldade de ceder | pernas |
| 16 | Ombros | O peso das decisões | ombros, pescoço |
| 17 | Timo | Angústia, perda de proteção | peito |
| 18 | Baço | Absorver o sofrimento alheio, limites | estômago |

---

## Para o time / IA

- Fonte da verdade no código: `src/data/bodyMindMap.ts` (array
  `RAW_BODY_MIND_MAP`), bilíngue (`pt` / `en`), tipado em
  `src/data/types.ts` (`BodyMindEntry`).
- O app casa as seleções da pessoa com este mapa em
  `matchBodyMind()` (`src/data/recommender.ts`): regiões do corpo pesam mais
  que emoções.
- A nova etapa do fluxo que mostra estes significados é
  `src/screens/Insights.tsx` (Corpo → Emoções → **Significados** → Pontos).
- Há um molde pronto no código (`BODY_MIND_ENTRY_TEMPLATE`) para adicionar
  novas fichas com segurança.
