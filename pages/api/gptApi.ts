// pages/api/coverLetter.ts
import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiKey = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const { parsedPdfText, jobApplicationText, companyValues, companyMission } =
    req.body;

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I need you to create a cover letter based on my cv text here:
          - ${parsedPdfText}
          This is the job application:
          - Job application text: ${jobApplicationText}
          ${
            companyValues.length > 0
              ? "These are the company values: " + companyValues.join(", ")
              : ""
          }
          ${
            companyMission.length > 0
              ? "this is the company's mission: " + companyMission
              : ""
          }
          you should not lie in the cover letter but draw from my cv highlighting the applicable skills, use lists when appropiate to showcase how my skill could be 
          beneficial. return the cover letter in json format with html elements as keys
          `,
        },
      ],
    });

    const data = result.data.choices[0].message?.content;
    console.log(data);
    res.status(200).json({ data });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "An error occurred." });
  }
}
