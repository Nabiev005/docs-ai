import { GoogleGenerativeAI } from "@google/generative-ai"; // Библиотеканын атын текшериңиз
import { Language } from "../types";

// API key Vite .env файлдан окуйбуз
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

    // Моделди чакыруу (gemini-1.5-flash эң туруктуу жана акысыз версиясы)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });

    const prompt = `
You are an experienced lawyer in Kyrgyzstan.
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
6. Use [Name] placeholders if the user didn't provide specific names.
    `;

    // Жаңы чакыруу форматы
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "Error generating document.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Эгер лимит бүтсө колдонуучуга түшүнүктүү билдирүү берүү
    if (error.status === 429) {
        throw new Error("Акысыз лимит бүттү. Бир аздан кийин кайра аракет кылыңыз.");
    }
    
    throw new Error("Техникалык ката кетти. Сураныч, бир аздан кийин кайра аракет кылыңыз.");
  }
};