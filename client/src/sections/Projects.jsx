/**
 * Projects Section
 * Showcase of notable projects
 */

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: 'Smart Portfolio | AI-Powered Personal Site 🤖',
            description: 'A personal portfolio website featuring a custom AI chatbot powered by Retrieval Augmented Generation (RAG). Programmed to instantly answer questions about my background, skills, and projects.',
            tech: ['React', 'Node.js', 'LLMs', 'RAG'],
            emoji: '🤖',
            link: '#',
        },
        {
            id: 2,
            title: 'Craftopia | Upcycling Platform ♻️',
            description: 'Wrote the main research proposal and mapped out the core features for an upcycling app geared toward college students to share DIY craft skills.',
            tech: ['Research', 'Capstone Project', 'App Design'],
            emoji: '♻️',
            link: 'https://craftopia-web.vercel.app/',
        },
    ];

    return (
        <section id="projects" className="py-20 px-4 bg-dark-800/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From full-stack web apps to AI integrations—here's what I've been building!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="glass-card p-6 flex flex-col hover:border-white/30 transition-all hover:-translate-y-1"
                        >
                            {/* Project icon */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dark-500 to-dark-700 border border-white/10 flex items-center justify-center mb-4">
                                <span className="text-xl">{project.emoji}</span>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-dark-600/50 rounded text-xs text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                            >
                                View Project →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
