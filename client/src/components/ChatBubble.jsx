/**
 * Chat Bubble Component
 * Individual message bubble with different styles for user vs AI
 */

export default function ChatBubble({ message, isUser }) {
    // Format timestamp
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
        >
            <div
                className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-br-md'
                        : 'bg-dark-700 text-gray-100 rounded-bl-md border border-dark-600/50'
                    }`}
            >
                {/* Message content */}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                {/* Timestamp */}
                <p
                    className={`text-xs mt-1.5 ${isUser ? 'text-white/60' : 'text-gray-500'
                        }`}
                >
                    {formatTime(message.timestamp)}
                </p>
            </div>
        </div>
    );
}
