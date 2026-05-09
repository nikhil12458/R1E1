import axios from "axios";
import FormData from "form-data";

export async function generateAITryOn({ personBuffer, garmentBuffer }) {
  const formData = new FormData();

  formData.append("person", personBuffer, "person.jpg");

  formData.append("garment", garmentBuffer, "garment.jpg");

  const response = await axios.post(
    `${process.env.AI_SERVER_URL}/generate`,
    formData.getBuffer(),
    {
      headers: {
        ...formData.getHeaders(),
        "ngrok-skip-browser-warning": "true",
        "Content-Length": formData.getLengthSync(),
      },

      responseType: "arraybuffer",

      timeout: 600000,
    },
  );

  return Buffer.from(response.data);
}
