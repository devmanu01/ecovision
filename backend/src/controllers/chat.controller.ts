import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query string is required in request body' });
      return;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an environmental data analyst. The user asked: "${query}"

Respond with ONLY valid JSON in this exact structure (no markdown, no code fences):
{
  "details": "A detailed HTML-formatted answer about the environmental topic. Use <h4>, <p>, <ul>, <li> tags for formatting.",
  "sources": [
    { "name": "Source name", "percentage": 25 },
    { "name": "Another source", "percentage": 20 }
  ],
  "solutions": {
    "government": ["Solution 1", "Solution 2", "Solution 3"],
    "community": ["Solution 1", "Solution 2", "Solution 3"],
    "individual": ["Solution 1", "Solution 2", "Solution 3"]
  }
}

Rules:
- "sources" should list the main contributing factors with percentages that sum to ~100
- Provide exactly 3 solutions per level (government, community, individual)
- The "details" field should be informative HTML about the specific environmental topic and location
- If the query mentions a specific country or location, tailor the data to that location
- If no specific location is mentioned, provide global data
- Keep responses factual and based on real environmental data`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON from the response, stripping any markdown fences
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(cleaned);

    // Validate response shape
    if (!parsed.details || !parsed.sources || !parsed.solutions) {
      throw new Error('Invalid response structure from Gemini');
    }

    res.json(parsed);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      details: 'Sorry, I encountered an error processing your request. Please try again.',
      sources: [],
      solutions: { government: [], community: [], individual: [] },
    });
  }
};
