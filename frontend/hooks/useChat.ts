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
      const { data } = await api.post('/api/chat', { query });
      setMessages((prev) => [...prev, { content: data, type: 'bot' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          content: {
            details: 'Sorry, I encountered an error. Please try again.',
            sources: [],
            solutions: { government: [], community: [], individual: [] },
          },
          type: 'bot',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage, setMessages };
}
