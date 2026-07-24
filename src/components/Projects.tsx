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
    title: "SIMRS",
    description:
      "Sistem Informasi Manajemen Rumah Sakit. Monorepo Next.js App Router + NestJS + Prisma + PostgreSQL + Redis + MinIO, RBAC multi-persona, audit logging, PWA.",
    stack: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "MinIO",
    ],
    github: "https://github.com/x0r909/SIMRS",
    accent: "bg-retro-yellow",
  },
  {
    title: "StudySync",
    description:
      "Aplikasi kolaboratif Kanban task management untuk mahasiswa (Android, Kotlin/Jetpack Compose) dengan Firebase (Auth, Firestore, FCM, Storage).",
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "FCM"],
    github: "https://github.com/x0r909/StudySync",
    accent: "bg-retro-blue",
  },
  {
    title: "VDP Web App (PT. Ujug-Ujug)",
    description:
      "Vulnerability Disclosure Program berbasis Laravel 11, dibangun untuk praktikum web security dengan mitigasi lengkap OWASP Top 10.",
    stack: ["Laravel 11", "PHP", "OWASP", "MySQL"],
    github: "https://github.com/x0r909",
    accent: "bg-retro-pink",
  },
  {
    title: "LinuxDev-Manager",
    description:
      "Manajer environment pengembangan web ala Laragon namun untuk Linux, dibuat dengan Python.",
    stack: ["Python", "Linux", "DevTools"],
    github: "https://github.com/x0r909/LinuxDev-Manager",
    accent: "bg-retro-green",
  },
  {
    title: "Mosquito Larvae ML Pipeline",
    description:
      "Pipeline klasifikasi risiko jentik nyamuk (rawan/tidak_rawan/tidak_relevan) menggabungkan YOLOv8s, EfficientNetV2-S, dan IndoBERT.",
    stack: ["YOLOv8", "EfficientNetV2", "IndoBERT", "PyTorch"],
    github: "https://github.com/x0r909/Agar-Plate-Preprocessing",
    accent: "bg-retro-orange",
  },
  {
    title: "PuteFashion",
    description:
      "Chatbot e-commerce WhatsApp untuk penjualan hijab/kerudung berbasis n8n + Supabase.",
    stack: ["n8n", "Supabase", "WhatsApp", "Automation"],
    github: "https://github.com/x0r909",
    accent: "bg-retro-lavender",
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
            Selected projects spanning hospital systems, Android apps, web
            security, Linux tooling, and applied ML.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="hover-lift h-full">
              <CardHeader>
                <div className={`mb-3 h-3 w-full border-2 border-border ${project.accent}`} />
                <CardTitle className="font-head text-xl">{project.title}</CardTitle>
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
              <CardFooter>
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
                  View on GitHub
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
