"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Github,
  LaptopMinimal,
  LineChart,
  Mail,
  MapPin,
  Network as NetworkIcon,
  Radar,
  ShieldCheck,
  Signal,
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

const stats = [
  { label: "Infrastruktur Jaringan", value: "Ahli", icon: Signal },
  { label: "Keamanan Jaringan", value: "Blue Team", icon: ShieldCheck },
  { label: "Lokasi", value: "P.N. Cilacap", icon: MapPin },
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

const projects = [
  {
    title: "Segmentasi & Zero Trust Lab",
    summary:
      "Membangun lab multi-segmen dengan policy berbasis identitas, menganalisis lalu lintas dan hardening akses.",
    stack: ["VLAN", "ACL", "WireGuard", "MFA"],
  },
  {
    title: "Blue Team Mini SOC",
    summary:
      "Pipeline log dari firewall dan endpoint ke SIEM, dashboard deteksi anomali, alert playbook dasar.",
    stack: ["Suricata", "Zeek", "ELK", "Sigma rules"],
  },
  {
    title: "Jaringan Kampus Efisien",
    summary:
      "Perancangan topologi modular, QoS ringan, dan monitoring kesehatan link untuk lingkungan kampus kecil.",
    stack: ["MikroTik", "QoS", "SNMP", "Grafana"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <motion.section
        className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.9fr]"
        initial="initial"
        animate="animate"
      >
        <motion.div {...fadeUp}>
          <Badge variant="glow" className="mb-4">
            Networking / Blue Team
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Augie Aristito Sudiarto
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Mahasiswa D4 Rekayasa Keamanan Siber di Politeknik Negeri Cilacap. 
            Fokus pada arsitektur dan hardening infrastruktur jaringan, serta kesiapan blue team untuk menjaga layanan tetap stabil dan aman.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 bg-white/5">
              <MapPin size={16} /> Cilacap, Indonesia
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 bg-white/5">
              <BadgeCheck size={16} /> Available for collaboration
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                Lihat Proyek <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="#contact">Hubungi Saya</a>
            </Button>
            <Button variant="ghost" asChild size="lg">
              <a
                href="mailto:augie.aristitoazka@gmail.com"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email cepat
              </a>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="glass accent-ring rounded-2xl border border-white/10 px-4 py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.35 }}
              >
                <div className="flex items-center gap-3 text-white/80">
                  <stat.icon className="h-5 w-5 text-[#9de2ff]" />
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                    {stat.label}
                  </p>
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 text-white/70">
            <a
              className="flex items-center gap-2 text-sm underline-offset-4 hover:text-white hover:underline"
              href="https://github.com/x0r909"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              className="flex items-center gap-2 text-sm underline-offset-4 hover:text-white hover:underline"
              href="https://www.linkedin.com/in/augiearistito"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              className="flex items-center gap-2 text-sm underline-offset-4 hover:text-white hover:underline"
              href="https://www.instagram.com/aw.akira_/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300" />
              Instagram
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#9de2ff]/20 via-transparent to-[#b9ffd6]/20 blur-3xl" />
          <Card className="relative border-white/10 bg-white/[0.04] p-6">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl">Mission Ready</CardTitle>
                <CardDescription>
                  Arsitektur yang resilient, monitoring yang sigap, respons yang tenang.
                </CardDescription>
              </div>
              <Radar className="h-10 w-10 text-[#9de2ff]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <ShieldCheck className="h-5 w-5 text-[#b9ffd6]" />
                <p className="text-sm text-white/70">
                  Hardening akses, segmentasi, dan baseline monitoring supaya insiden lebih mudah dikendalikan.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <LineChart className="h-5 w-5 text-[#9de2ff]" />
                <p className="text-sm text-white/70">
                  Observabilitas ringan: alert sederhana yang bisa diikuti tindakan nyata.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <LaptopMinimal className="h-5 w-5 text-[#b9ffd6]" />
                <p className="text-sm text-white/70">
                  Dokumentasi rapi, playbook singkat, dan pengetahuan tim yang mudah dibagikan.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      <section id="skills" className="mt-16 space-y-8">
        <div className="section-title">Keahlian</div>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
            >
              <Card className="h-full border-white/10 bg-white/[0.04]">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>{skill.title}</CardTitle>
                    <CardDescription>Fokus praktik dan tooling</CardDescription>
                  </div>
                  <skill.icon className="h-6 w-6 text-[#9de2ff]" />
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="outline" className="border-white/20 text-white/80">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="mt-16 space-y-8">
        <div className="section-title">Pengalaman & Studi</div>
        <div className="grid gap-6 lg:grid-cols-2">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
            >
              <Card className="h-full border-white/10 bg-white/[0.04]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span>{exp.title}</span>
                    <Badge variant="default" className="bg-white/10 text-white">
                      {exp.time}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{exp.place}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/75 leading-relaxed">{exp.focus}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="mt-16 space-y-8">
        <div className="section-title">Proyek Terpilih</div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
            >
              <Card className="h-full border-white/10 bg-white/[0.04]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={item} variant="outline" className="border-white/20 text-white/80">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-16 space-y-6">
        <div className="section-title">Kontak</div>
        <Card className="border-white/10 bg-white/[0.04]">
          <CardHeader>
            <CardTitle>Siap diskusi atau kolaborasi?</CardTitle>
            <CardDescription>
              Kirim pesan singkat tentang kebutuhan jaringan atau rencana peningkatan keamanan. Form ini tidak
              terhubung ke backend; gunakan email jika ingin respon cepat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="mb-2 block text-sm text-white/70">Nama</label>
                <input
                  name="name"
                  placeholder="Nama lengkap"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#9de2ff] focus:outline-none"
                  autoComplete="off"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="mb-2 block text-sm text-white/70">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="email@contoh.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#9de2ff] focus:outline-none"
                  autoComplete="off"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/70">Pesan</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Ceritakan kebutuhan jaringan atau target keamanan yang ingin dicapai"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#9de2ff] focus:outline-none"
                  autoComplete="off"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-white/60">
                  Form ini statis. Untuk respon cepat, gunakan tombol email atau LinkedIn di atas.
                </p>
                <div className="flex gap-3">
                  <Button type="submit">Kirim Pesan</Button>
                  <Button variant="outline" asChild>
                    <a
                      href="mailto:augie.aristitoazka@gmail.com"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" /> Email langsung
                    </a>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
