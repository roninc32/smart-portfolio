/**
 * About Section
 * Brief about me section with skills highlight
 */

export default function About() {
    const skills = [
        { category: 'Languages', items: ['JavaScript', 'TypeScript', 'SQL', 'Python'] },
        { category: 'Frontend', items: ['React.js', 'React Native', 'Tailwind CSS', 'HTML5/CSS3'] },
        { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'MongoDB'] },
        { category: 'Tools', items: ['Git/GitHub', 'VS Code', 'Postman', 'Figma'] },
    ];

    return (
        <section id="about" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I'm a passionate developer who loves building full-stack web applications and mobile experiences.
                        When I'm not coding, I'm probably ranking up in Dota 2 or watching One Piece! 🏴‍☠️
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup) => (
                        <div
                            key={skillGroup.category}
                            className="glass-card p-6 hover:border-accent-primary/30 transition-colors"
                        >
                            <h3 className="text-accent-primary font-semibold mb-4">
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((skill) => (
                                    <li key={skill} className="text-gray-300 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-accent-secondary rounded-full"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
