/**
 * Projects Section
 * Showcase of notable projects
 */

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: 'Craftopia 🎨',
            description: 'A university research project for sharing DIY craft skills. Includes community feeds, AI-powered craft generation, and eco-challenges.',
            tech: ['React', 'Mobile-Responsive', 'Research Project', 'Capstone Project'],
            emoji: '✂️',
            link: 'https://craftopia-web.vercel.app/',
        },
        {
            id: 2,
            title: 'Aviation Birthday Card ✈️',
            description: 'A static aviation-themed birthday invitation card featuring elegant pilot aesthetics, animated elements, and a personalized greeting experience.',
            tech: ['React', 'Static Site', 'Vite'],
            emoji: '🎂',
            link: 'https://lucas-birthday.vercel.app/',
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
                        From full-stack web apps to mobile experiences—here's what I've been building!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="glass-card p-6 flex flex-col hover:border-accent-primary/30 transition-all hover:-translate-y-1"
                        >
                            {/* Project icon */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-4">
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
                                className="text-accent-primary hover:text-accent-secondary transition-colors text-sm font-medium"
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
