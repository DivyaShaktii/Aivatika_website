'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'bot' | 'user';
};

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm an AIVatika demo agent. How can I help you understand our capabilities today?", sender: 'bot' },
    { text: "Can you handle multiple languages?", sender: 'user' },
    { text: "Yes! I can natively speak over 40 languages and code-switch in real-time between them without any noticeable latency.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input.trim(), sender: 'user' }]);
    setInput('');

    // Simulate bot typing
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I am a simulated demo interface. In a production environment, I would route this query to the appropriate LLM via the AIVatika orchestrator.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <main>
        <section className="reveal active">
            <div className="contact-container" style={{ gap: '2rem' }}>
                <div className="contact-info">
                    <h2>Experience the <span className="text-accent">future.</span></h2>
                    <p>Book a personalized walkthrough of the AIVatika platform, or try a simulated chat agent right here in the browser.</p>
                    
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Schedule a Call</h3>
                        <a href="mailto:sales@aivatika.com" className="btn btn-outline btn-large">Email Sales Team ↗</a>
                    </div>
                </div>

                {/* Interactive Sandbox UI */}
                <div className="sandbox-container">
                    <div className="sandbox-header">
                        <div className="sandbox-dots">
                            <div className="sandbox-dot"></div>
                            <div className="sandbox-dot"></div>
                            <div className="sandbox-dot"></div>
                        </div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '1rem' }}>AIVatika Support Agent // Online</span>
                    </div>
                    
                    <div className="sandbox-body" id="chat-body" ref={chatBodyRef}>
                        {messages.map((msg, idx) => (
                          <div key={idx} className={`chat-message ${msg.sender === 'bot' ? 'chat-bot' : 'chat-user'}`}>
                              {msg.text}
                          </div>
                        ))}
                    </div>

                    <form className="sandbox-input" onSubmit={handleSubmit}>
                        <input 
                          type="text" 
                          placeholder="Type a message to test the agent..." 
                          value={input}
                          onChange={e => setInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
  );
}
