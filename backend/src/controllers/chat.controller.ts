import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query field is required and must be a string' });
    }

    // Mock response if API key is missing, empty, or a placeholder/invalid
    const isPlaceholder = !apiKey || apiKey === '' || apiKey.includes('AIzaSyBKIicdIpsxW_0BYXd0njllGKlTndisf1c') || apiKey.includes('YAIzaSy') || apiKey.includes('AIzaSyBKIicdIpsxW_0BYXd0njllGKlTndisf1c');
    
    if (isPlaceholder) {
      console.warn('GEMINI_API_KEY is missing, empty or invalid. Using mock response.');
      
      const mockResponse = {
        details: `<h4>Mock Environmental Insight</h4><p>You asked about: "<b>${query}</b>". Since no valid Gemini API key is configured in the .env file, I am providing a simulated response.</p><p>Generally, environmental topics like this involve complex interactions between human activity and natural cycles. We recommend implementing sustainable practices at all levels of society, from policy changes to individual lifestyle adjustments.</p><p>To enable real AI insights, please add a valid <b>GEMINI_API_KEY</b> to your <code>backend/.env</code> file.</p>`,
        sources: [
          { name: "Climate Research Data", percentage: 40 },
          { name: "Environmental Policy Analysis", percentage: 35 },
          { name: "Sustainable Development Goals", percentage: 25 }
        ],
        solutions: {
          government: ["Implement stricter emission standards", "Subsidize renewable energy projects", "Protect critical wildlife habitats"],
          community: ["Start local recycling initiatives", "Organize tree planting events", "Share educational resources"],
          individual: ["Reduce single-use plastic consumption", "Optimize home energy usage", "Use public transportation more frequently"]
        }
      };
      
      // Artificial delay to simulate AI thinking
      await new Promise(resolve => setTimeout(resolve, 800));
      res.json(mockResponse);
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
    
    // Clean the response to ensure it's valid JSON
    const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    // Validate response shape
    if (!parsed.details || !parsed.sources || !parsed.solutions) {
      throw new Error('Invalid response structure from Gemini');
    }

    res.json(parsed);
  } catch (error: any) {
    console.error('🔥 Chat API Error:', error);
    
    const msg = error.message || 'Unknown error occurred';
    if (msg.includes('429') || msg.toLowerCase().includes('exhausted')) {
      return res.status(429).json({ reply: 'The AI service rate limit has been reached. Please wait a moment and try again.' });
    }

    res.status(500).json({
      details: 'Sorry, I encountered an error. Details: ' + error.message,
      sources: [],
      solutions: { government: [], community: [], individual: [] },
    });
  }
};