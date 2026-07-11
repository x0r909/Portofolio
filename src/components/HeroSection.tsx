"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute w-96 h-96 rounded-full bg-cyber-cyan/5 blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-64 h-64 rounded-full bg-cyber-magenta/5 blur-3xl -bottom-20 -right-20 animate-pulse"></div>

      <div className="section-container text-center z-10">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="terminal-text text-xs md:text-sm border border-cyber-green/30 rounded px-3 py-1">
            $ <span className="text-white">whoami</span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-tight"
        >
          <span className="glitch-text" data-text="Augie Aristito">
            Augie Aristito
          </span>
          <br />
          <span className="mt-2 block">
            <span className="glow-magenta text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Sudiarto
            </span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 text-cyber-cyan font-mono text-sm md:text-base mb-4"
        >
          <span className="h-px w-4 md:w-8 bg-cyber-cyan/50"></span>
          <span className="tracking-wider">CYBER SECURITY ENGINEERING</span>
          <span className="h-px w-4 md:w-8 bg-cyber-cyan/50"></span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cyber-dim font-mono text-sm md:text-base mb-8 max-w-xl mx-auto"
        >
          <span className="text-cyber-green">$</span> "securing systems through code and curiosity"
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="#projects" className="cyber-btn inline-block">
            View Projects
          </Link>
          <Link
            href="#contact"
            className="cyber-btn cyber-btn-magenta inline-block"
          >
            Contact Me
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-cyber-dim font-mono text-xs">scroll down</span>
            <div className="w-4 h-6 border border-cyber-cyan/30 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 bg-cyber-cyan rounded-full mt-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
