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
            {/* AI Avatar */}
            {!isUser && (
                <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-sm">
                        🤖
                    </div>
                </div>
            )}

            <div
                className={`max-w-[75%] px-4 py-3 ${isUser
                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-2xl rounded-br-sm'
                        : 'bg-dark-700/80 text-gray-100 rounded-2xl rounded-bl-sm border border-dark-600/50'
                    }`}
            >
                {/* Message content */}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                {/* Timestamp */}
                <p
                    className={`text-xs mt-2 ${isUser ? 'text-white/60 text-right' : 'text-gray-500'
                        }`}
                >
                    {formatTime(message.timestamp)}
                </p>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center text-sm">
                        👤
                    </div>
                </div>
            )}
        </div>
    );
}
