import { convert } from "html-to-text";

export const cleanJobDescription = (
  html
) => {
  return convert(html || "", {
    wordwrap: false,
  });
};