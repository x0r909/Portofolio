"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Github,
  LaptopMinimal,
  LineChart,
  Mail,
  MapPin,
  Network as NetworkIcon,
  Radar,
  ShieldCheck,
  Linkedin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const certifications = [
  {
    title: "MTCNA",
    fullName: "MikroTik Certified Network Associate",
    issuer: "MikroTik",
  },
];

const skills = [
  {
    title: "Infrastruktur & Cloud",
    icon: NetworkIcon,
    items: ["LAN/WAN", "Routing & Switching", "VLAN", "MikroTik", "Linux Server", "Virtualization"],
  },
  {
    title: "Keamanan Jaringan",
    icon: ShieldCheck,
    items: ["Firewalling", "IDS/IPS", "Zero Trust mindset", "Hardening", "Network Segmentation"],
  },
  {
    title: "Blue Team",
    icon: Radar,
    items: ["Log Analysis", "Threat Hunting dasar", "SIEM workflow", "Incident Response dasar", "Playbook"],
  },
  {
    title: "Alat & Stack",
    icon: LaptopMinimal,
    items: ["Wireshark", "Nmap", "Suricata", "Zeek", "ELK/Splunk (dasar)", "Bash/Python"]
  },
];

const experiences = [
  {
    title: "D4 Rekayasa Keamanan Siber",
    place: "Politeknik Negeri Cilacap",
    time: "Mahasiswa",
    focus: "Membangun dan mengamankan infrastruktur jaringan kampus, lab, dan simulasi blue team.",
  },
  {
    title: "Network & Security Projects",
    place: "Freelance / Lab",
    time: "2023 - Sekarang",
    focus: "Desain topologi, konfigurasi router/firewall, monitoring, serta latihan incident response terarah.",
  },
];

const organizations = [
  {
    org: "HIMATRIS",
    fullName: "Himpunan Mahasiswa Komputer dan Bisnis Politeknik Negeri Cilacap",
    role: "Staff Muda PSDM",
    period: "2024/2025",
  },
  {
    org: "HIMATRIS",
    fullName: "Himpunan Mahasiswa Komputer dan Bisnis Politeknik Negeri Cilacap",
    role: "Sekretaris Umum",
    period: "2025/2026",
  },
];

const projects = [
  {
    title: "Threat Detection & Log Analysis Lab",
    summary:
      "Setup pipeline deteksi ancaman dari berbagai sumber ke SIEM, tuning alert, dan korelasi event untuk identifikasi serangan.",
    stack: ["Suricata", "Zeek", "ELK Stack", "Sigma Rules"],
  },
  {
    title: "Incident Response Playbook & Simulation",
    summary:
      "Membangun playbook IR terstruktur, simulasi skenario serangan, dan dokumentasi proses triage hingga containment.",
    stack: ["TheHive", "MITRE ATT&CK", "Bash/Python", "Wireshark"],
  },
  {
    title: "Network Hardening & Monitoring",
    summary:
      "Implementasi segmentasi jaringan, hardening konfigurasi, dan monitoring real-time untuk mendeteksi anomali.",
    stack: ["MikroTik", "Suricata", "Grafana", "SNMP"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
} as const;

function TerminalBar({ title = "~" }: { title?: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#00ff41]/10 bg-[#00ff41]/2.5 shrink-0">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c841]" />
      <span className="ml-auto font-mono text-[10px] text-[#00ff41]/35 tracking-widest">{title}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 pb-24 pt-14 sm:px-8 lg:px-12">

      {/* ── HERO ── */}
      <motion.section
        className="grid items-start gap-10 md:gap-12 lg:grid-cols-[1.15fr_0.95fr]"
        initial="initial"
        animate="animate"
      >
        <motion.div {...fadeUp}>
          {/* Terminal prompt */}
          <div className="mb-5 font-mono text-xs tracking-wider">
            <span className="text-[#00ff41]/35">root@portfolio</span>
            <span className="text-[#c8f5c4]/20">:</span>
            <span className="text-[#00d4ff]/55">~</span>
            <span className="text-[#c8f5c4]/20">$ </span>
            <span className="text-[#00ff41]/65">whoami</span>
          </div>

          <div className="mb-6 relative inline-block">
            <div className="absolute -inset-2 rounded-full bg-[#00ff41]/15 blur-lg" />
            <Image
              src="/img/photo-profile.jpeg"
              alt="Augie Aristito Sudiarto"
              width={112}
              height={112}
              className="relative rounded-full border-2 border-[#00ff41]/35 object-cover"
              priority
            />
            <span className="absolute bottom-0.5 right-0.5 status-dot" />
          </div>

          <Badge variant="glow" className="mb-5">
            Networking / Blue Team
          </Badge>

          <h1 className="glitch blink-cursor text-glow text-4xl font-semibold leading-tight text-[#00ff41] font-mono sm:text-5xl">
            Augie Aristito Sudiarto
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-[#c8f5c4]/55">
            <span className="text-[#00ff41]/35"># </span>
            Mahasiswa D4 Rekayasa Keamanan Siber di Politeknik Negeri Cilacap.
            Fokus pada arsitektur dan hardening infrastruktur jaringan, serta kesiapan blue team untuk menjaga layanan tetap stabil dan aman.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#c8f5c4]/55">
            <span className="inline-flex items-center gap-2 border border-[#00ff41]/20 bg-[#00ff41]/4 px-3 py-1.5 tracking-wide">
              <MapPin size={11} className="text-[#00ff41]" /> Cilacap, Indonesia
            </span>
            <span className="inline-flex items-center gap-2 border border-[#00ff41]/20 bg-[#00ff41]/4 px-3 py-1.5 tracking-wide">
              <span className="status-dot" />
              Available for collaboration
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                &gt; view_projects <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="#contact">&gt; contact_me</a>
            </Button>
            <Button variant="ghost" asChild size="lg">
              <a href="mailto:augie.aristitoazka@gmail.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> send_email
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 font-mono text-[11px] text-[#c8f5c4]/45">
            <a
              className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              href="https://github.com/x0r909"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-3.5 w-3.5" /> github.com/x0r909
            </a>
            <a
              className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              href="https://www.linkedin.com/in/augiearistito"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-3.5 w-3.5" /> linkedin/augiearistito
            </a>
            <a
              className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              href="https://www.instagram.com/aw.akira_/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-linear-to-br from-pink-400 via-purple-400 to-orange-300" />
              aw.akira_
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute -inset-6 rounded-2xl bg-[#00ff41]/4 blur-3xl" />
          <Card className="relative flex flex-col overflow-hidden rounded-md border-0 p-0">
            <TerminalBar title="mission_status.sh" />
            <CardHeader className="flex flex-row items-center justify-between gap-3 px-6 pt-5">
              <div>
                <CardTitle className="text-lg font-mono text-[#00ff41]">./Mission Ready</CardTitle>
                <CardDescription>
                  Arsitektur yang resilient, monitoring yang sigap, respons yang tenang.
                </CardDescription>
              </div>
              <Radar className="h-8 w-8 shrink-0 text-[#00ff41]/55" />
            </CardHeader>
            <CardContent className="space-y-2.5 px-6 pb-6">
              <div className="flex items-start gap-3 border border-[#00ff41]/10 bg-[#00ff41]/3 p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00ff41]" />
                <p className="font-mono text-xs leading-relaxed text-[#c8f5c4]/60">
                  Hardening akses, segmentasi, dan baseline monitoring supaya insiden lebih mudah dikendalikan.
                </p>
              </div>
              <div className="flex items-start gap-3 border border-[#00ff41]/10 bg-[#00ff41]/3 p-3">
                <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-[#00d4ff]" />
                <p className="font-mono text-xs leading-relaxed text-[#c8f5c4]/60">
                  Observabilitas ringan: alert sederhana yang bisa diikuti tindakan nyata.
                </p>
              </div>
              <div className="flex items-start gap-3 border border-[#00ff41]/10 bg-[#00ff41]/3 p-3">
                <LaptopMinimal className="mt-0.5 h-4 w-4 shrink-0 text-[#00ff41]" />
                <p className="font-mono text-xs leading-relaxed text-[#c8f5c4]/60">
                  Dokumentasi rapi, playbook singkat, dan pengetahuan tim yang mudah dibagikan.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* ── SKILLS ── */}
      <section id="skills" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">01_keahlian</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-md border-0 p-0">
                <TerminalBar title={skill.title.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".sh"} />
                <CardHeader className="flex flex-row items-start justify-between px-5 pt-4">
                  <div>
                    <CardTitle>{skill.title}</CardTitle>
                    <CardDescription>Fokus praktik dan tooling</CardDescription>
                  </div>
                  <skill.icon className="h-5 w-5 shrink-0 text-[#00ff41]/55" />
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap items-start gap-1.5 px-5 pb-5">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">02_sertifikasi</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-md border-0 p-0">
                <TerminalBar title="cert.json" />
                <CardHeader className="flex flex-row items-start justify-between px-5 pt-4">
                  <div>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.fullName}</CardDescription>
                  </div>
                  <Award className="h-5 w-5 shrink-0 text-[#00d4ff]/65" />
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <Badge variant="glow">{cert.issuer}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">03_pengalaman</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-md border-0 p-0">
                <TerminalBar title="experience.log" />
                <CardHeader className="px-5 pt-4">
                  <CardTitle className="flex items-start justify-between gap-2 text-sm">
                    <span>{exp.title}</span>
                    <Badge variant="default" className="shrink-0 text-[9px]">{exp.time}</Badge>
                  </CardTitle>
                  <CardDescription>{exp.place}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-5 pb-5">
                  <p className="font-mono text-xs leading-relaxed text-[#c8f5c4]/55">
                    <span className="text-[#00ff41]/40">&gt; </span>{exp.focus}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ORGANIZATIONS ── */}
      <section id="organizations" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">04_organisasi</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {organizations.map((org, idx) => (
            <motion.div
              key={`${org.org}-${org.period}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-md border-0 p-0">
                <TerminalBar title="org.log" />
                <CardHeader className="px-5 pt-4">
                  <CardTitle className="flex items-start justify-between gap-2 text-sm">
                    <span>{org.org}</span>
                    <Badge variant="default" className="shrink-0 text-[9px]">{org.period}</Badge>
                  </CardTitle>
                  <CardDescription>{org.fullName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-5 pb-5">
                  <p className="font-mono text-xs leading-relaxed text-[#c8f5c4]/55">
                    <span className="text-[#00ff41]/40">&gt; </span>{org.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">05_proyek</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-md border-0 p-0">
                <TerminalBar title={`proj_${String(idx + 1).padStart(2, "0")}.sh`} />
                <CardHeader className="px-5 pt-4">
                  <CardTitle className="text-sm leading-snug">{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-wrap items-start gap-1.5 px-5 pb-5">
                  {project.stack.map((item) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="section-title">06_kontak</div>
          <div className="h-px flex-1 bg-[#00ff41]/10" />
        </div>
        <Card className="overflow-hidden rounded-md border-0 p-0">
          <TerminalBar title="contact.sh" />
          <CardHeader className="px-6 pt-5">
            <CardTitle className="text-lg">Siap diskusi atau kolaborasi?</CardTitle>
            <CardDescription>
              Hubungi saya melalui email atau media sosial di bawah ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="space-y-2.5 border border-[#00ff41]/10 bg-[#00ff41]/2 p-4 font-mono text-xs">
              <div className="flex items-center gap-3 text-[#c8f5c4]/65">
                <span className="w-3 text-[#00ff41]/40">$</span>
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#00ff41]" />
                <a href="mailto:augie.aristitoazka@gmail.com" className="hover:text-[#00ff41] transition-colors underline-offset-4 hover:underline">
                  augie.aristitoazka@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#c8f5c4]/65">
                <span className="w-3 text-[#00ff41]/40">$</span>
                <Linkedin className="h-3.5 w-3.5 shrink-0 text-[#00ff41]" />
                <a href="https://www.linkedin.com/in/augiearistito" target="_blank" rel="noreferrer" className="hover:text-[#00ff41] transition-colors underline-offset-4 hover:underline">
                  linkedin.com/in/augiearistito
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#c8f5c4]/65">
                <span className="w-3 text-[#00ff41]/40">$</span>
                <Github className="h-3.5 w-3.5 shrink-0 text-[#00ff41]" />
                <a href="https://github.com/x0r909" target="_blank" rel="noreferrer" className="hover:text-[#00ff41] transition-colors underline-offset-4 hover:underline">
                  github.com/x0r909
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#c8f5c4]/65">
                <span className="w-3 text-[#00ff41]/40">$</span>
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-linear-to-br from-pink-400 via-purple-400 to-orange-300" />
                <a href="https://www.instagram.com/aw.akira_/" target="_blank" rel="noreferrer" className="hover:text-[#00ff41] transition-colors underline-offset-4 hover:underline">
                  instagram.com/aw.akira_/
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="mailto:augie.aristitoazka@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> &gt; send_email
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="https://www.linkedin.com/in/augiearistito" target="_blank" rel="noreferrer">
                  &gt; connect_linkedin
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#00ff41]/10 pt-6 pb-2 text-center font-mono text-[11px] text-[#c8f5c4]/25">
        <span className="text-[#00ff41]/30">root@portfolio</span>
        <span className="text-[#c8f5c4]/15">:</span>
        <span className="text-[#00d4ff]/40">~</span>
        <span className="text-[#c8f5c4]/15">$ </span>
        <span>echo &quot;© 2026 Augie Aristito Sudiarto. All rights reserved.&quot;</span>
      </footer>
    </main>
  );
}
