import { generateAITryOn } from "../services/ai.service.js";

export async function generateTryOnPreview(req, res) {
  try {
    const person = req.files?.person?.[0];

    const garment = req.files?.garment?.[0];

    if (!person || !garment) {
      return res.status(400).json({
        success: false,
        message: "Person and garment images required",
      });
    }

    const generatedImage = await generateAITryOn({
      personBuffer: person.buffer,

      garmentBuffer: garment.buffer,
    });

    res.writeHead(200, {
      "Content-Type": "image/png",

      "Content-Length": generatedImage.length,
    });

    console.log(generatedImage);

    return res.end(generatedImage);
  } catch (error) {
    console.log("FULL ERROR:");
    console.error(error);
    
    const errorMessage = error.response?.data?.message || error.message || "AI generation failed";
    const statusCode = error.response?.status || 500;

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
}
