"use client";

import { motion } from "framer-motion";

const skills = [
  "Cyber Security",
  "Network Security",
  "System Administration",
  "Web Development",
  "API Security",
  "Ethical Hacking",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-container bg-cyber-surface/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 flex items-center gap-4">
          <span className="text-cyber-cyan font-mono text-2xl">02.</span>
          <span className="text-white">Technical Skills</span>
          <div className="h-px flex-grow bg-cyber-border"></div>
        </h2>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 bg-cyber-bg border border-cyber-border rounded text-cyber-green font-mono text-sm hover:border-cyber-green transition-colors cursor-default"
            >
              [ {skill} ]
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
