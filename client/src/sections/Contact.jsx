/**
 * Contact Section
 * Contact information and social links
 */

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Let's <span className="gradient-text">Connect</span>
                </h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                    Interested in working together? Feel free to reach out through any of
                    these channels. I'm always open to new opportunities!
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {/* Email */}
                    <a
                        href="mailto:roninc32@gmail.com"
                        className="glass-card px-6 py-4 flex items-center gap-3 hover:border-accent-primary/30 transition-colors"
                    >
                        <span className="text-2xl">📧</span>
                        <div className="text-left">
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-gray-200">roninc32@gmail.com</p>
                        </div>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/roninc32"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card px-6 py-4 flex items-center gap-3 hover:border-accent-primary/30 transition-colors"
                    >
                        <span className="text-2xl">🐙</span>
                        <div className="text-left">
                            <p className="text-xs text-gray-500">GitHub</p>
                            <p className="text-gray-200">@roninc32</p>
                        </div>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/ronin-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card px-6 py-4 flex items-center gap-3 hover:border-accent-primary/30 transition-colors"
                    >
                        <span className="text-2xl">💼</span>
                        <div className="text-left">
                            <p className="text-xs text-gray-500">LinkedIn</p>
                            <p className="text-gray-200">/in/ronin-dev</p>
                        </div>
                    </a>
                </div>

                <p className="text-gray-500 text-sm">
                    Or just chat with my AI assistant above—it knows a lot about me! 😊
                </p>
            </div>
        </section>
    );
}
