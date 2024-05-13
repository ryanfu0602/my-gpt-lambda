import { APIGatewayEvent, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

const items = [
  "这里有一颗苹果树",
  "This is a bunch of bananas",
  "そこにスイカがあります",
  "Tom suka makan mangga",
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
  const ListForOpenAI = JSON.parse(JSON.stringify(items));
  ListForOpenAI[ListForOpenAI.length] = body.inputName;

  const listEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: ListForOpenAI,
    encoding_format: "float",
  });

  let bestMatch = 0;
  let bestScore = 0;
  const listLength = listEmbedding.data.length;

  listEmbedding.data.forEach((e, index) => {
    //The last value of the array is the Embedding of input name
    if (index < listLength - 1) {
      const similarityScore = cosineSimilarity(
        e.embedding,
        listEmbedding.data[listLength - 1].embedding
      );

      console.log(index, similarityScore);

      if (similarityScore > bestScore) {
        bestMatch = index;
        bestScore = similarityScore;
      }
    }
  });

  console.log(items[bestMatch]);
  return {
    statusCode: 200,
    headers: {},
    body: { bestMatch: items[bestMatch] },
  };
};

const cosineSimilarity = (embedding1: number[], embedding2: number[]) => {
  const dot_product = embedding1.reduce(
    (acc, val, i) => acc + val * embedding2[i],
    0
  );
  const magnitude1 = Math.sqrt(
    embedding1.reduce((acc, val) => acc + val * val, 0)
  );
  const magnitude2 = Math.sqrt(
    embedding2.reduce((acc, val) => acc + val * val, 0)
  );
  return dot_product / (magnitude1 * magnitude2);
};
