import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const styles = {
  h1: { size: 48 },
  h2: { size: 44 },
  h3: { size: 40 },
  h4: { size: 36 },
  p: { size: 22 },
  list: { size: 24 },
  listItem: { size: 24 },
};

type DownloadDOCXProps = {
  text: string;
};

const ContentElement = (element: any) => {
  const style = styles[element.htmlTag as keyof typeof styles];

  return new Paragraph({
    children: [
      new TextRun({
        text: element.content,
        size: style.size,
        font: "Times New Roman",
        break: 1,
      }),
    ],
  });
};

const generateDOCX = ({ text }: DownloadDOCXProps) => {
  const content = JSON.parse(text).map((item: any, index: any) =>
    ContentElement(item)
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: content,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Coverletter.docx");
  });
};

export default generateDOCX;
