/**
 * Chat Component
 * Main chat interface with AI integration, welcome message, and session management
 */

import { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';

// API URL - uses environment variable in production, proxy in development
const API_URL = import.meta.env.VITE_API_URL || '';

// Generate a unique session ID for this browser session
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('chat_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('chat_session_id', sessionId);
    }
    return sessionId;
};

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesContainerRef = useRef(null);
    const inputRef = useRef(null);
    const sessionId = useRef(getSessionId());

    // Auto-scroll to bottom when new messages arrive (only within chat container)
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Show welcome message on mount
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: 'welcome',
                content: "Yo! 👋 I'm Ronin's AI twin. Ask me about his PERN stack projects, React Native mobile apps, or even his Dota 2 rank and favorite anime. Let's chat! 🚀",
                sender: 'ai',
                timestamp: new Date()
            }]);
        }
    }, []);

    // Send message to backend
    const sendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        // Clear input immediately
        setInputValue('');
        setError(null);

        // Add user message to chat
        const userMessage = {
            id: Date.now().toString(),
            content: message,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: sessionId.current
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Add AI response to chat
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                content: data.response,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error('Chat error:', err);
            setError(err.message);

            // Add error message to chat
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: `Oops! ${err.message}. Please try again. 🙈`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus({ preventScroll: true });
        }
    };

    // Handle enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="glass-card w-full max-w-lg h-[500px] md:h-[550px] flex flex-col overflow-hidden shadow-2xl shadow-accent-primary/10">
            {/* Header */}
            <div className="px-4 py-3 border-b border-dark-600/50 flex items-center gap-3 flex-shrink-0">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                        <span className="text-lg">🤖</span>
                    </div>
                    {/* Online indicator */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-800"></span>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-100">Ronin's AI Twin</h3>
                    <p className="text-xs text-gray-400">Always online • Ask me anything</p>
                </div>
            </div>

            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain"
            >
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        isUser={msg.sender === 'user'}
                    />
                ))}

                {isLoading && <TypingIndicator />}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-dark-600/50">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="input-chat flex-1"
                        maxLength={500}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
                </div>

                {/* Character counter */}
                <p className="text-xs text-gray-500 mt-2 text-right">
                    {inputValue.length}/500
                </p>
            </div>
        </div>
    );
}
