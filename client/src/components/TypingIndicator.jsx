/**
 * Typing Indicator Component
 * Animated three-dot indicator shown while AI is responding
 */

export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            <div className="flex gap-1">
                <span
                    className="w-2 h-2 bg-accent-primary rounded-full animate-bounce-dots"
                    style={{ animationDelay: '0s' }}
                />
                <span
                    className="w-2 h-2 bg-accent-primary rounded-full animate-bounce-dots"
                    style={{ animationDelay: '0.2s' }}
                />
                <span
                    className="w-2 h-2 bg-accent-primary rounded-full animate-bounce-dots"
                    style={{ animationDelay: '0.4s' }}
                />
            </div>
            <span className="text-sm text-gray-500 ml-2">AI is typing...</span>
        </div>
    );
}
