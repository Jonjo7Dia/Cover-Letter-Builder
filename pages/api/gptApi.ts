// pages/api/coverLetter.ts
import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const { parsedPdfText, jobApplicationText, companyValues, companyMission } =
    req.body;

  const question = `I need you to create a cover letter based on my cv text here (<linebreak> refers to a line break in text) only use the skills pertaining to my cv:
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
          Please generate a cover letter and return it in JSON format, with the following HTML elements as keys: title, contactinfo, and body. Be sure to incorporate the skills from the CV. Insert the contact info at the beginning, as headers. Please include the HTML tags in the JSON response and do not nest more than one object in an object.Here is the format I need:
          {
            "title": {
              "h2": "<h2>Cover Letter for [Position]</h2>"
            },
            "contactInfo": {
              "h3": "<h3>Contact Information</h3>",
              "p": "<p>Name<br/><br/>Phone: number<br/>Email: email@example.com<br/>LinkedIn: linkedin.com/in/example</p>"
            },
            "body": {
              "p": "<p>Dear Hiring Manager,<br/><br/>[Cover letter body text]<br/><br/>Sincerely,<br/><br/>Name</p>"
            }
          }
          `;
  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you are a cover letter writer using the users cv to help write a nice coverletter to a job application. only use the available information of the cv but highight the relvant experience and skills",
        },
        {
          role: "user",
          content: question,
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
