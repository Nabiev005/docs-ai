import { Language } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim() || "";

export const generateLegalDocument = async (
  templateTitle: string,
  userDetails: string,
  category: string,
  lang: Language
): Promise<string> => {
  if (!API_KEY) throw new Error("API Key табылган жок!");

  // URL v1beta версиясына кайтыңыз, ал көбүрөөк моделдерди колдойт
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Сен юристсиң. Документ: ${templateTitle}, Маалымат: ${userDetails}, Тили: ${lang}` }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Эгер дагы эле 404 чыкса, бул жерден катанын себебин көрөбүз
      console.error("API Толук катасы:", data);
      throw new Error(data.error?.message || "API Катасы");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    throw new Error(error.message || "Байланыш катасы");
  }
};