'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface ChatResponse {
  details: string;
  sources: Array<{ name: string; percentage: number }>;
  solutions: {
    government: string[];
    community: string[];
    individual: string[];
  };
}

interface Message {
  content: string | ChatResponse;
  type: 'user' | 'bot';
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (query: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content: query, type: 'user' }]);
    setIsTyping(true);

    try {
      // Log outgoing request for debugging
      console.log('Sending message:', query);

      const { data } = await api.post('/api/chat', { message: query });

      // Handle both structured { details: ... } and simple { reply: ... } responses
      if (data && data.reply) {
        setMessages((prev) => [...prev, { content: data.reply, type: 'bot' }]);
      } else if (data && data.details) {
        setMessages((prev) => [...prev, { content: data, type: 'bot' }]);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      // Log error details for debugging
      const errorData = err instanceof Error ? err.message : err;
      console.error('API error:', errorData);

      // Check if the backend returned a fallback response
      const serverData = (err as any)?.response?.data;
      if (serverData?.reply) {
        console.log('Using server fallback response text');
        setMessages((prev) => [...prev, { content: serverData.reply, type: 'bot' }]);
      } else if (serverData?.details) {
        console.log('Using server structured fallback response');
        setMessages((prev) => [...prev, { content: serverData as ChatResponse, type: 'bot' }]);
      } else {
        // Show client-side fallback response without crashing
        const fallbackText = 'Sorry, I encountered an error. Please try again.';
        setMessages((prev) => [...prev, { content: fallbackText, type: 'bot' }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage, setMessages };
}
