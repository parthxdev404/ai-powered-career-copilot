import fs from "fs";
import * as pdfParse from "pdf-parse";

export const extractTextfromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  return data.text;
};
