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

  const question = `I need you to create a cover letter based on my cv text here (<linebreak> refers to a line break in text) only use the skills pertaining to my cv. if there are company values and mission statemtent seperate them from the "hard skills/ technical skills" and add content related to soft skills if there are experiences related to the values draw on that, also include available contact information at the top, dont include anything that i have to input myself:
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
           generate a cover letter for a document and return it in a array of objects thats parsable to JSON.parse(), dont include <br> in any of the content ,like this [{htmlTag: "h3/h4/p" , content:"tagContent"}, {element2} , {element3}] salutations and valediction need to be the same html tag as body contents. also include the position of application at the top. dont use h1/h2 tags
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

    if (err.status === 401) {
      // Unauthorized Error
      res
        .status(401)
        .json({ error: "Unauthorized. Please check your API key." });
    } else if (err.status === 429) {
      // Too Many Requests Error
      res.status(429).json({
        error: "Rate limit exceeded. Please slow down your requests.",
      });
    } else if (err.status === 502) {
      // Bad Gateway Error
      res
        .status(502)
        .json({ error: "Bad gateway. The API server or a proxy is down." });
    } else {
      // Generic Error Response
      res.status(500).json({ error: err.message || "An error occurred." });
    }
  }
}
