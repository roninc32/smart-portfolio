/**
 * Hero Section
 * Main landing area with introduction and embedded chat
 */

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] animate-pulse-glow"></div>
            </div>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-8 animate-fade-in">
                {/* Introduction */}
                <div className="space-y-4">
                    <p className="text-gray-400 font-medium tracking-widest uppercase text-sm">Welcome to my portfolio</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Hi, I'm <span className="gradient-text">Ronin Cabusao</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-300 font-light mt-4">
                        AI Automation Engineer & Full-Stack Developer
                    </p>
                </div>

                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    I build practical applications using <strong className="text-gray-200">.NET/C#</strong>, the <strong className="text-gray-200">PERN stack</strong>, and <strong className="text-gray-200">React Native</strong>. I focus on rapid prototyping and connecting LLMs to solve real business problems. Based in Cebu City, Philippines.
                </p>

                <div className="flex flex-wrap gap-3 justify-center pt-4">
                    <span className="px-4 py-2 bg-dark-800 rounded-full text-sm text-gray-300 border border-dark-600 shadow-sm">C# & .NET</span>
                    <span className="px-4 py-2 bg-dark-800 rounded-full text-sm text-gray-300 border border-dark-600 shadow-sm">React & Node.js</span>
                    <span className="px-4 py-2 bg-dark-800 rounded-full text-sm text-gray-300 border border-dark-600 shadow-sm">PostgreSQL</span>
                    <span className="px-4 py-2 bg-dark-800 rounded-full text-sm text-gray-300 border border-dark-600 shadow-sm">n8n Automation</span>
                    <span className="px-4 py-2 bg-dark-800 rounded-full text-sm text-gray-300 border border-dark-600 shadow-sm">LLMs & RAG</span>
                </div>

                <div className="pt-8">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Click the chat icon in the bottom right to talk to my AI twin
                    </p>
                </div>
            </div>
        </section>
    );
}
