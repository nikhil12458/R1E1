import axios from "axios";

export async function generateTryOn(formData) {
  const response = await axios.post("/api/ai/generate-preview", formData, {
    responseType: "blob",
  });

  return response.data;
}
