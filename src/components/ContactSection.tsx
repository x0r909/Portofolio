"use client";

import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="section-container bg-cyber-surface/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-6 flex justify-center items-center gap-4">
          <span className="text-cyber-magenta font-mono text-2xl">04.</span>
          <span className="text-white">Get In Touch</span>
        </h2>

        <p className="text-gray-300 max-w-lg mx-auto mb-8 font-mono text-sm">
          Interested in working together or just want to chat? Reach out to me
          on any of the following channels:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://github.com/x0r909"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn w-48 text-center"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/augiearistito"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn cyber-btn-magenta w-48 text-center"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/aw.akira_"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn border-cyber-yellow text-cyber-yellow hover:glow-yellow hover:text-cyber-yellow/80 w-48 text-center"
            style={{
              borderColor: "#ffff00",
              color: "#ffff00",
            }}
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
