import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateQuizQuestions = async (productName: string, productDescription: string): Promise<QuizQuestion[]> => {
  if (!apiKey) {
    console.warn("No API Key for Gemini");
    return [
      { id: '1', question: 'Sample Question about ' + productName, options: ['Yes', 'No', 'Maybe', 'Sure'], correctIndex: 0 }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 fun trivia questions about this product: ${productName} - ${productDescription}. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER }
            },
            required: ['question', 'options', 'correctIndex']
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const parsed = JSON.parse(jsonStr);
    return parsed.map((q: any, i: number) => ({
      id: `gen-${i}-${Date.now()}`,
      ...q
    }));

  } catch (error) {
    console.error("Gemini Error", error);
    return [];
  }
};