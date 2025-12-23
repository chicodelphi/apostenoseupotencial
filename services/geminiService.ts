
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

// Na Vercel, a API_KEY deve ser configurada nas Environment Variables
const API_KEY = process.env.API_KEY || '';

export const generateQuiz = async (course: string): Promise<Question[]> => {
  // Se a chave não estiver configurada, retornamos o mock imediatamente para evitar erro 403
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    console.warn("API_KEY não detectada. Usando dados estáticos de demonstração.");
    return getFallbackQuestions();
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 5 perguntas de múltipla escolha de alto nível sobre ${course} baseadas no currículo do MIT OpenCourseWare. As perguntas devem testar compreensão profunda, não apenas fórmulas. Use JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "text", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro na integração com Gemini:", error);
    return getFallbackQuestions();
  }
};

const getFallbackQuestions = (): Question[] => [
  {
    id: "fb-1",
    text: "Qual é a interpretação física da primeira derivada de uma função posição em relação ao tempo?",
    options: ["Aceleração", "Velocidade Instantânea", "Deslocamento Total", "Força Resultante"],
    correctAnswerIndex: 1,
    explanation: "A derivada da posição no tempo fornece a taxa de variação instantânea, ou seja, a velocidade."
  },
  {
    id: "fb-2",
    text: "No contexto de Cálculo I, o que afirma o Teorema Fundamental do Cálculo?",
    options: [
      "Que toda função contínua tem um máximo",
      "Que a diferenciação e a integração são processos inversos",
      "Que o limite de uma constante é zero",
      "Que a área sob a curva é sempre positiva"
    ],
    correctAnswerIndex: 1,
    explanation: "O TFC estabelece a conexão fundamental entre derivadas e integrais."
  }
];

export const generateOralQuestions = async (topic: string): Promise<string[]> => {
  if (!API_KEY) return ["Explique intuitivamente o conceito de limite sem usar a definição epsilon-delta."];
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 3 perguntas conceituais para uma entrevista oral sobre ${topic}. Foco em INTUIÇÃO.`,
    });
    return response.text.split('\n').filter(q => q.trim().length > 0);
  } catch (error) {
    return ["Como você descreveria a derivada para alguém que não conhece matemática?"];
  }
};
