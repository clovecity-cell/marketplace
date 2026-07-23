// Gemini Client Initialization for Cloud Functions
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || 'DEMO_KEY';

export const ai = new GoogleGenAI({ apiKey });

export const getGeminiModel = () => {
  return 'gemini-2.5-flash';
};
