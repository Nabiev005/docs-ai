
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLegalDocument = async (
  templateTitle: string,
  userDetails: string,
  category: string,
  lang: Language
): Promise<string> => {
  try {
    const languageNames: Record<Language, string> = {
      ky: 'кыргыз',
      ru: 'русский',
      en: 'english',
      tr: 'turkish'
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are an experienced lawyer in Kyrgyzstan. 
      Create a legal document of type "${templateTitle}" in category "${category}".
      The target language for the document MUST be ${languageNames[lang]}.
      
      User Details: 
      ${userDetails}
      
      Requirements:
      1. Adhere to Kyrgyz Republic laws and official business documentation standards.
      2. Include a header (who is it to, who is it from).
      3. Use official, precise legal terminology in the target language (${languageNames[lang]}).
      4. Leave placeholders for signature and date.
      5. Return as clean Markdown.
      6. Use [Name] placeholders if the user didn't provide specific names.`,
      config: {
        temperature: 0.2,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return response.text || "Error generating document.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Technical error occurred. Please try again later.");
  }
};
