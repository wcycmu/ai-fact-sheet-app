import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { FactSheetData, GroundingSource } from '../types';

// This is the Vite-native way to access environment variables.
// Vercel will populate this variable from your project settings.
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
    throw new Error("VITE_API_KEY environment variable not set. Please add it to your Vercel project settings.");
}

const ai = new GoogleGenAI({ apiKey });

const parseJsonResponse = (jsonStr: string): FactSheetData => {
  let cleanJsonStr = jsonStr.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanJsonStr.match(fenceRegex);
  if (match && match[2]) {
    cleanJsonStr = match[2].trim();
  }

  const repairedJson = cleanJsonStr
    .replace(/,(?=\s*?\])/g, '')
    .replace(/,(?=\s*?})/g, '');

  try {
    const parsedData = JSON.parse(repairedJson);
    if (
      !parsedData.person_name ||
      !Array.isArray(parsedData.primary_connections) ||
      !Array.isArray(parsedData.education) ||
      !Array.isArray(parsedData.key_memberships_awards) ||
      !Array.isArray(parsedData.ten_things_to_know)
    ) {
      throw new Error("Parsed JSON does not match expected FactSheetData structure.");
    }
    return parsedData as FactSheetData;
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    console.error("Problematic JSON string (after repair attempt):", repairedJson);
    throw new Error("The AI returned a response that could not be read. Please try again.");
  }
};

export const generateFactSheet = async (personName: string): Promise<{ data: FactSheetData; sources: GroundingSource[] }> => {
  const systemInstruction = `You are an expert research assistant. Your task is to find information about a person using the provided search tools and generate a structured fact sheet about them.
  The output MUST be a single, strictly valid JSON object. Ensure the JSON is syntactically correct and does not contain trailing commas.
  The structure must be as follows:
  {
    "person_name": "Full Name of the Person",
    "primary_connections": ["List of key personal or professional connections."],
    "education": ["List of educational institutions and degrees."],
    "key_memberships_awards": ["List of notable memberships, honors, or awards."],
    "ten_things_to_know": ["A list of exactly 10 interesting and important facts about the person."]
  }
  Do not include any text, titles, or markdown formatting outside of this single JSON object.
  `;
  
  const prompt = `Generate a fact sheet for the person: "${personName}"`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const data = parseJsonResponse(response.text);
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[]) || [];

    return { data, sources };
  } catch (error) {
    console.error("Error in generateFactSheet:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error("The configured API key is invalid. Please check your Vercel project settings.");
        }
        throw error;
    }
    throw new Error("An unexpected error occurred while communicating with the AI.");
  }
};
