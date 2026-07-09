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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-500 dark:to-dark-700 flex items-center justify-center text-sm border border-gray-300 dark:border-white/10 transition-colors">
                        🤖
                    </div>
                </div>
            )}

            <div
                className={`max-w-[75%] px-4 py-3 transition-colors ${isUser
                    ? 'bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white text-white dark:text-gray-900 rounded-2xl rounded-br-sm shadow-md'
                    : 'bg-white dark:bg-dark-600 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-sm border border-gray-200 dark:border-dark-500 shadow-sm'
                    }`}
            >
                {/* Message content */}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                {/* Timestamp */}
                <p
                    className={`text-xs mt-2 transition-colors ${isUser ? 'text-white/70 dark:text-gray-900/60 text-right' : 'text-gray-400 dark:text-gray-500'
                        }`}
                >
                    {formatTime(message.timestamp)}
                </p>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="flex-shrink-0 ml-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-600 flex items-center justify-center text-sm border border-gray-300 dark:border-transparent transition-colors">
                        👤
                    </div>
                </div>
            )}
        </div>
    );
}
