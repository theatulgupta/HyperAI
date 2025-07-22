import { env } from "./env.config.js";
import FormData from "form-data";
import axios from "axios";
import { Buffer } from "buffer";

const generateClipDropImage = async (prompt) => {
  const form = new FormData();
  form.append("prompt", prompt);

  try {
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64 = Buffer.from(data, "binary").toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    throw new Error("ClipDrop API request failed: " + error.message);
  }
};

export { generateClipDropImage };
