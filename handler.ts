import { APIGatewayEvent, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

const items = [
  "这里有一颗苹果树",
  "This is a bunch of bananas",
  "そこにスイカがあります",
  "Tom suka makan mangga",
  "The burgers at Chatwood are delicious",
  "今天在下大雨",
  "明日はフットボールの試合があります",
];
type RequestBody = {
  inputName: string;
};

export const main = async (event: APIGatewayEvent, context: Context) => {
  const body = <RequestBody>JSON.parse(event.body!);
  if (!body || !body.inputName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }

  const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

  // Get all Embeddings of input and list in one api call
  // const ListForOpenAI = JSON.parse(JSON.stringify(items));
  // ListForOpenAI[ListForOpenAI.length] = body.inputName;

  // const listEmbedding = await openai.embeddings.create({
  //   model: "text-embedding-3-large",
  //   input: ListForOpenAI,
  //   encoding_format: "float",
  // });

  // let bestMatch = 0;
  // let bestScore = 0;
  // const listLength = listEmbedding.data.length;

  // listEmbedding.data.forEach((e, index) => {
  //   //The last value of the array is the Embedding of input name
  //   if (index < listLength - 1) {
  //     const similarityScore = cosineSimilarity(
  //       e.embedding,
  //       listEmbedding.data[listLength - 1].embedding
  //     );

  //     console.log(index, similarityScore);

  //     if (similarityScore > bestScore) {
  //       bestMatch = index;
  //       bestScore = similarityScore;
  //     }
  //   }
  // });
  const prompt = generatePrompt(body.inputName, items);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.1,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    
  });

  // console.log(response.choices[0].message.content);
  return {
    statusCode: 200,
    headers: {},
    body: { bestMatch: response.choices[0].message.content },
  };
};

// const cosineSimilarity = (embedding1: number[], embedding2: number[]) => {
//   const dot_product = embedding1.reduce(
//     (acc, val, i) => acc + val * embedding2[i],
//     0
//   );
//   const magnitude1 = Math.sqrt(
//     embedding1.reduce((acc, val) => acc + val * val, 0)
//   );
//   const magnitude2 = Math.sqrt(
//     embedding2.reduce((acc, val) => acc + val * val, 0)
//   );
//   return dot_product / (magnitude1 * magnitude2);
// };
const generatePrompt = (input: string, choices: string[]): string => {
  let prompt = `Given the input phrase: "${input}", which of the following options is the best match?\n`;
  choices.forEach((choice, index) => {
    prompt += `Option ${index + 1}: ${choice}\n`;
  });
  prompt += "Answer with the option number.(Don't add translation)";
  return prompt;
};
