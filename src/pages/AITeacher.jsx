import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import clsx from 'clsx';
import './AITeacher.css';

const AITeacher = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            text: "Assalamu Alaikum! 👋 I'm your AI Quranic Teacher. I'll help you learn Surah Al-Bakara in 30 days. Ready to start? What would you like to learn today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const apiKey = localStorage.getItem('openrouter_api_key');
        if (!apiKey) {
            alert('Please set your OpenRouter API Key in Settings first.');
            return;
        }

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin, // Required by OpenRouter
                    "X-Title": "The Moden" // Optional but recommended
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
                    "messages": [
                        { "role": "system", "content": "You are a helpful and knowledgeable Islamic teacher specializing in the Quran and Surah Al-Bakara. Help the user learn by answering their questions, explaining verses, and providing guidance. Keep your answers concise, encouraging, and accurate." },
                        ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })),
                        { "role": "user", "content": input }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message || 'API Error');
            }

            const aiResponse = data.choices[0].message.content;

            const aiMsg = {
                id: Date.now() + 1,
                role: 'ai',
                text: aiResponse,
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("AI Error:", error);
            const errorMsg = {
                id: Date.now() + 1,
                role: 'ai',
                text: "I'm having trouble connecting right now. Please check your API key and internet connection."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="ai-page">
            <header className="ai-header">
                <div className="ai-status">
                    <div className="status-dot"></div>
                    <span className="status-text">AI Teacher Online</span>
                </div>
                <Button variant="ghost" className="settings-btn"><Sparkles size={20} /></Button>
            </header>

            <div className="chat-container">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx('message', msg.role)}>
                        <div className="message-bubble">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message ai">
                        <div className="message-bubble typing">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Ask me anything about this verse..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="icon-btn micro-btn">
                        <Mic size={20} />
                    </button>
                </div>
                <button className="send-btn" onClick={handleSend}>
                    <Send size={24} color="white" />
                </button>
            </div>
        </div>
    );
};

export default AITeacher;
