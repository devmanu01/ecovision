'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';

export default function ChatbotPanel() {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeSolutionTab, setActiveSolutionTab] = useState('government');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const renderBotMessage = (content: any) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }

    // Structured response from API
    return (
      <div className="interactive-response">
        <div className="text-info" dangerouslySetInnerHTML={{ __html: content.details }} />

        {content.sources && content.sources.length > 0 && (
          <div style={{ margin: '15px 0' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>
              Contributing Factors
            </h4>
            {content.sources.map((source: any, i: number) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid #333',
                }}
              >
                <span>{source.name}</span>
                <span style={{ color: 'var(--primary-light)', fontWeight: 500 }}>
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        )}

        {content.solutions && (
          <div className="solutions-section">
            <h4>Recommended Solutions</h4>
            <div className="solution-tabs">
              {['government', 'community', 'individual'].map((tab) => (
                <button
                  key={tab}
                  className={`solution-tab ${activeSolutionTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveSolutionTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            {['government', 'community', 'individual'].map((tab) => (
              <div
                key={tab}
                className={`solution-level ${activeSolutionTab === tab ? 'active' : ''}`}
              >
                <ul>
                  {(content.solutions[tab] || []).map((sol: string, i: number) => (
                    <li key={i}>{sol}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header" onClick={() => isMinimized && setIsMinimized(false)}>
        <h3>🌍 EcoVision AI Assistant</h3>
        <div className="chat-controls">
          <button
            className="minimize-chat"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
          >
            <i className={`fas fa-${isMinimized ? 'expand' : 'minus'}`}></i>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="message bot">
            <div className="interactive-response">
              <div className="text-info">
                <h4>Welcome to EcoVision AI! 🌍</h4>
                <p>
                  Ask me about environmental data for any country or topic. Try questions like:
                </p>
              </div>
              <div className="topic-buttons">
                {[
                  'India pollution',
                  'China deforestation',
                  'USA water quality',
                  'Global warming',
                ].map((topic) => (
                  <button
                    key={topic}
                    className="topic-btn"
                    onClick={() => sendMessage(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.type === 'user' ? (
              <p>{msg.content as string}</p>
            ) : (
              renderBotMessage(msg.content)
            )}
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask about any environmental topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
