import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, OpenAIStreamPayload } from "utils/open-ai-stream";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send("Missing prompt");
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  try {
    const stream = await OpenAIStream(payload);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");
    }
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) res.write(value);
    }
    res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await handlePostRequest(req, res);
  }

  // Handle other methods or return an error if the method is not supported
  return res.status(405).send({ error: "Method Not Allowed", status: 405 });
};

export default handler;
