import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// The client can automatically pick up GEMINI_API_KEY from process.env
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY 
});

export default ai;