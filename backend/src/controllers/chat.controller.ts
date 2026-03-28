import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message field is required and must be a string' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is not set');
      return res.status(500).json({ reply: 'Server configuration error: API key not set.' });
    }

    // Initialize Gemini SDK with standard setup
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-2.5-flash to match the user's available API key model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Simple prompt without heavy structural rules as requested by user
    const prompt = `You are an environmental data analyst. The user asks: "${message}". Please provide a clear and informative response without using complex formatting.`;
    
    const result = await model.generateContent(prompt);
    const replyText = result.response.text();

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('🔥 Chat API Error:', error);
    
    // Provide a graceful text fallback
    const msg = error.message || 'Unknown error occurred';
    if (msg.includes('429') || msg.toLowerCase().includes('exhausted')) {
      return res.status(429).json({ reply: 'The AI service rate limit has been reached. Please wait a moment and try again.' });
    }

    return res.status(500).json({ reply: 'Sorry, I encountered an error processing your request. Please check the backend logs.' });
  }
};