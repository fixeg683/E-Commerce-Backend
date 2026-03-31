import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Hello! I\'m your store assistant. Looking for something specific?' }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // FIX: Changed localhost to 127.0.0.1 to match your API backend domain
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'I hit a snag. Please try again!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="modern-chat-container">
      {!isOpen ? (
        <button className="chat-trigger" onClick={() => setIsOpen(true)}>
          <span className="icon">💬</span>
          <span className="text">Chat with us</span>
        </button>
      ) : (
        <div className="chat-card">
          <div className="chat-header">
            <div className="user-info">
              <div className="status-dot"></div>
              <h3>Store Assistant</h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`bubble-wrapper ${msg.role}`}>
                <div className="bubble">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="bubble-wrapper ai">
                <div className="bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="quick-actions">
            <button onClick={() => setInput("Where is my order?")}>📦 Track Order</button>
            <button onClick={() => setInput("Do you have any discounts?")}>💰 Get Coupons</button>
            <button onClick={() => setInput("What is your return policy?")}>🔄 Returns</button>
          </div>

          <div className="chat-input-area">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
            />
            <button onClick={handleSend} className="send-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;