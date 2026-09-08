'use client';

import { useState } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    if (!input) return;

    const userMsg: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMsg: Message = { text: data.reply, sender: 'bot' };
    setMessages((prev) => [...prev, botMsg]);
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>🤖 Mera ChatBot (Next.js)</h2>
      <div
        style={{
          background: 'white',
          height: 400,
          overflowY: 'auto',
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          border: '1px solid #ddd',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: '8px 0',
              padding: 10,
              borderRadius: 8,
              maxWidth: '80%',
              marginLeft: msg.sender === 'user' ? 'auto' : 0,
              background: msg.sender === 'user' ? '#007bff' : '#e5e5e5',
              color: msg.sender === 'user' ? 'white' : 'black',
              textAlign: msg.sender === 'user' ? 'right' : 'left',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Kuch likhein..."
          style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Bhejein
        </button>
      </div>
    </div>
  );
}