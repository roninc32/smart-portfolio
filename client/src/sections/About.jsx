/**
 * About Section
 * Brief about me section with skills highlight
 */

export default function About() {
    const skills = [
        { category: 'Languages & Tools', items: ['C#', '.NET', 'React Native', 'React', 'Node.js', 'Express', 'NestJS'] },
        { category: 'Databases', items: ['PostgreSQL', 'MSSQL', 'SQLite'] },
        { category: 'AI & Automation', items: ['RAG', 'n8n', 'Power Automate', 'OpenClaw', 'Claude', 'Gemini'] },
        { category: 'Core Concepts', items: ['Full-Stack Dev', 'Autonomous Agents', 'Rapid Prototyping', 'API Integrations'] },
    ];

    return (
        <section id="about" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I'm an IT graduate focused on turning ideas into working prototypes quickly. 
                        My professional journey includes internships at GoTeam as an AI Automation Engineer, 
                        where I integrated AI agents and built automated workflows, and Alliance Software Inc., 
                        where I designed backend services and database structures.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup) => (
                        <div
                            key={skillGroup.category}
                            className="glass-card p-6 hover:border-white/30 transition-colors"
                        >
                            <h3 className="text-white font-semibold mb-4">
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((skill) => (
                                    <li key={skill} className="text-gray-300 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
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
