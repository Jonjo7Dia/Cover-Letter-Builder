import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAICompletion } from "utils/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiKey = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "can you generate text for a meme",
        },
      ],
    });
    const data = result.data.choices[0].message?.content;

    res.status(200).json({ data });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "An error occurred." });
  }
}
