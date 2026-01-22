/**
 * Hero Section
 * Main landing area with introduction and embedded chat
 */

import ChatComponent from '../components/ChatComponent';

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-start lg:items-center justify-center relative overflow-hidden py-20 px-4"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Introduction */}
                <div className="text-center lg:text-left space-y-6">
                    <div className="space-y-2">
                        <p className="text-accent-primary font-medium">👋 Kumusta! Welcome to my portfolio</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Hi, I'm <span className="gradient-text">Ronin</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300">
                            Full-Stack Developer & Mobile Developer
                        </p>
                    </div>

                    <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                        I build modern web & mobile apps with the <strong className="text-gray-200">PERN stack</strong> and
                        <strong className="text-gray-200"> React Native</strong>. Based in Cebu, Philippines 🇵🇭
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">React</span>
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">Node.js</span>
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">PostgreSQL</span>
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">React Native</span>
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">Tailwind CSS</span>
                        <span className="px-3 py-1 bg-dark-700/50 rounded-full text-sm text-gray-300 border border-dark-600/50">TypeScript</span>
                    </div>

                    <div className="pt-4">
                        <p className="text-gray-500 text-sm flex items-center justify-center lg:justify-start gap-2">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Chat with my AI twin to learn more about me →
                        </p>
                    </div>
                </div>

                {/* Right side - Chat Component */}
                <div className="flex justify-center lg:justify-end">
                    <ChatComponent />
                </div>
            </div>
        </section>
    );
}
