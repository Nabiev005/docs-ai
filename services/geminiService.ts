import { GoogleGenerativeAI } from "@google/generative-ai";
import { Language } from "../types";

// API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const generateLegalDocument = async (
  templateTitle: string,
  userDetails: string,
  category: string,
  lang: Language
): Promise<string> => {
  try {
    const languageNames: Record<Language, string> = {
      ky: "кыргыз",
      ru: "русский",
      en: "english",
      tr: "turkish"
    };

    // Моделди аныктоо
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an experienced lawyer in Kyrgyzstan. 
    Create a legal document of type "${templateTitle}" in category "${category}". 
    The target language is ${languageNames[lang]}.
    User details: ${userDetails}.
    Requirements: Official legal style, Kyrgyz laws, include placeholders for date and signature.`;

    // Суроо-талапты жиберүү
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error: any) {
    // Катанын себебин консолдон көрүү үчүн:
    console.error("Толук ката:", error);

    if (error.message?.includes("429")) {
      throw new Error("Лимит бүттү. 1 мүнөт күтө туруңуз.");
    }
    if (error.message?.includes("API key not found")) {
      throw new Error("API ачкычы табылган жок.");
    }

    throw new Error("Техникалык ката кетти. Сураныч, кайра аракет кылыңыз.");
  }
};