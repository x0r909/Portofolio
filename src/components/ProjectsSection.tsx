"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

const ProjectsSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/x0r909/repos?sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching github repos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 flex items-center gap-4">
          <span className="text-cyber-green font-mono text-2xl">03.</span>
          <span className="text-white">Featured Projects</span>
          <div className="h-px flex-grow bg-cyber-border"></div>
        </h2>

        {loading ? (
          <div className="text-center font-mono text-cyber-cyan animate-pulse">
            LOADING_GITHUB_DATA...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-card flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl text-cyber-magenta mb-2 font-mono truncate">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {repo.description || "No description provided."}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-cyber-cyan font-mono text-xs">
                    {repo.language || "Unknown"}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-btn py-1 px-3 text-xs"
                  >
                    View Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
