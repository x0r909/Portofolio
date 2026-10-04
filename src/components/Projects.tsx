import { Code2, ExternalLink } from "lucide-react";
import { AccentBar } from "@/components/accent-bar";
import { OffsetFrame } from "@/components/offset-frame";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SECTION_ACCENT, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  stack: readonly string[];
  github: string;
  accent: Accent;
};

const featured: Project = {
  title: "AetherOS",
  description:
    "Sistem operasi hobi untuk arsitektur x86_64 yang dibangun dari nol dengan C dan Assembly. Booting via UEFI, console serial + framebuffer, dan self-test bawaan.",
  stack: ["C", "Assembly", "UEFI", "x86_64"],
  github: "https://github.com/x0r909/AetherOS",
  accent: "bg-retro-orange",
};

const projects: readonly Project[] = [
  {
    title: "SentinelStack",
    description:
      "Stack monitoring all-in-one untuk Proxmox, Docker, dan Linux. Observability lengkap: metrik, log, tracing, dan uptime dalam satu deployment.",
    stack: ["Go", "Shell", "Grafana", "Prometheus", "Loki", "Docker"],
    github: "https://github.com/x0r909/SentinelStack",
    accent: "bg-retro-green",
  },
  {
    title: "SIMRS",
    description:
      "Sistem Informasi Manajemen Rumah Sakit. Monorepo Next.js App Router + NestJS + Prisma + PostgreSQL + Redis + MinIO, RBAC multi-persona, audit logging, PWA.",
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Redis", "MinIO"],
    github: "https://github.com/x0r909/SIMRS",
    accent: "bg-retro-yellow",
  },
  {
    title: "StudySync",
    description:
      "Aplikasi kolaboratif Kanban task management untuk mahasiswa (Android, Kotlin/Jetpack Compose) dengan Firebase Auth, Firestore, FCM, dan Storage.",
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "FCM"],
    github: "https://github.com/x0r909/StudySync",
    accent: "bg-retro-blue",
  },
  {
    title: "SIM KP HIMATRIS",
    description:
      "Sistem manajemen organisasi HIMATRIS untuk alur kerja dan administrasi kepengurusan. Laravel 12 + React 19 + Inertia, full TypeScript.",
    stack: ["Laravel 12", "React 19", "Inertia", "TypeScript"],
    github: "https://github.com/x0r909/sim-kp-himatris",
    accent: "bg-retro-pink",
  },
  {
    title: "Agar-Plate Preprocessing",
    description:
      "Pipeline preprocessing citra cawan petri dengan FastAPI dan OpenCV. Auto-tuned Circular Hough Transform + CLAHE untuk segmentasi koloni yang konsisten.",
    stack: ["Python", "FastAPI", "OpenCV", "NumPy"],
    github: "https://github.com/x0r909/Agar-Plate-Preprocessing",
    accent: "bg-retro-lavender",
  },
  {
    title: "LinuxDev-Manager",
    description:
      "Manajer environment pengembangan web ala Laragon namun untuk Linux. Mengatur service, virtual host, dan runtime dari satu antarmuka desktop.",
    stack: ["Python", "PyQt5", "Linux", "DevTools"],
    github: "https://github.com/x0r909/LinuxDev-Manager",
    accent: "bg-retro-orange",
  },
];

export function Projects() {
  return (
    <Section id="projects" banded>
      <SectionHeader
        eyebrow="Projects"
        title="Featured Work"
        description="Proyek pilihan dari sistem operasi, platform monitoring, sistem informasi rumah sakit, aplikasi Android, sampai machine learning terapan."
        accent={SECTION_ACCENT.projects}
      />

      <OffsetFrame accent="bg-retro-orange" offset="lg" className="mb-10">
        <Card className="hover-lift shadow-xl">
          <AccentBar accent={featured.accent} />
          <div className="md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-6">
            <div>
              <CardHeader>
                <CardTitle className="font-head text-2xl md:text-3xl">
                  {featured.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {featured.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {featured.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </div>

            <div className="flex flex-col justify-end gap-4 p-4 md:border-l-2 md:border-border">
              <p className="font-mono text-xs text-muted-foreground">
                {featured.stack.length} technologies · systems programming
              </p>
              <a
                href={featured.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "no-underline"
                )}
              >
                <Code2 className="size-4" />
                Lihat di GitHub
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </Card>
      </OffsetFrame>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="hover-lift flex h-full flex-col"
          >
            <AccentBar accent={project.accent} />
            <CardHeader>
              <CardTitle className="font-head text-lg">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-4 text-sm leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "no-underline"
                )}
              >
                <Code2 className="size-4" />
                GitHub
                <ExternalLink className="size-3.5" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}