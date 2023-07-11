import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ storage: multer.memoryStorage() });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload.single("file")(req as any, res as any, async (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      // @ts-ignore
      const buffer = req.file.buffer;

      try {
        const data = await pdfParse(buffer);
        res.status(200).send(data.text);
      } catch (err: any) {
        res.status(500).send(err.message);
      }
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
