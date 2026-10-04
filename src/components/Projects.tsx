import { Code2, ExternalLink } from "lucide-react";
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
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "AetherOS",
    description:
      "Sistem operasi hobi untuk arsitektur x86_64 yang dibangun dari nol dengan C dan Assembly. Booting via UEFI, console serial + framebuffer, dan self-test bawaan.",
    stack: ["C", "Assembly", "UEFI", "x86_64"],
    github: "https://github.com/x0r909/AetherOS",
    accent: "bg-retro-orange",
  },
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
] as const;

export function Projects() {
  return (
    <section id="projects" className="border-y-2 border-border bg-muted/40">
      <div className="section-container">
        <div className="mb-10">
          <Badge className="mb-3 bg-retro-orange text-black">Projects</Badge>
          <h2 className="font-head text-3xl md:text-5xl">Featured Work</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Proyek pilihan dari sistem operasi, platform monitoring, sistem
            informasi rumah sakit, aplikasi Android, sampai machine learning
            terapan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="hover-lift flex h-full flex-col">
              <CardHeader>
                <div
                  className={`mb-3 h-3 w-full border-2 border-border ${project.accent}`}
                />
                <CardTitle className="font-head text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
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
                  <Code2 data-icon="inline-start" className="size-4" />
                  GitHub
                  <ExternalLink data-icon="inline-end" className="size-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
