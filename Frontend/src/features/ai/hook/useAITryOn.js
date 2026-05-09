import { useState } from "react";

import { generateTryOn } from "../service/ai.service";

export function useAITryOn() {
  const [loading, setLoading] = useState(false);

  const [generatedImage, setGeneratedImage] = useState(null);

  const [error, setError] = useState(null);

  async function handleGenerate({ person, garment }) {
    try {
      setLoading(true);

      setError(null);

      const formData = new FormData();

      formData.append("person", person);

      formData.append("garment", garment);

      const imageBlob = await generateTryOn(formData);

      const imageUrl = URL.createObjectURL(imageBlob);

      setGeneratedImage(imageUrl);
    } catch (error) {
      console.log("Generation Error:", error);
      let message = "Generation failed";
      
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          message = json.message || message;
        } catch (e) {
          console.error("Failed to parse error blob:", e);
        }
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    generatedImage,
    error,
    handleGenerate,
  };
}
