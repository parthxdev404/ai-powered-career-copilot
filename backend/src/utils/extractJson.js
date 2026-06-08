const extractJson = (text) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("JSON not found");
    }

    const jsonString = text.slice(
      start,
      end + 1
    );

    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      "Failed to parse AI response"
    );
  }
};

export default extractJson;