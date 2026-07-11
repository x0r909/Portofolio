"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl mb-8 flex items-center gap-4">
          <span className="text-cyber-green font-mono text-2xl">01.</span>
          <span className="text-white">About Me</span>
          <div className="h-px flex-grow bg-cyber-border"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="cyber-card">
            <h3 className="text-cyber-cyan mb-4">Background</h3>
            <p className="text-gray-300">
              I am a Cyber Security Engineering student at{" "}
              <span className="text-cyber-green">Politeknik Negeri Cilacap</span>.
              My journey involves exploring the intersections of infrastructure,
              secure software development, and systems architecture.
            </p>
          </div>

          <div className="cyber-card">
            <h3 className="text-cyber-magenta mb-4">Focus</h3>
            <p className="text-gray-300">
              Passionate about defensive security, ethical hacking, and building
              resilient applications. I enjoy automating security processes and
              improving system robustness.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
