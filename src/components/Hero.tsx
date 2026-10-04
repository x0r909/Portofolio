import Image from "next/image";
import { Download } from "lucide-react";
import { OffsetFrame } from "@/components/offset-frame";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <Section id="home" className="relative overflow-hidden">
      <div className="absolute -right-8 top-8 hidden h-32 w-32 rotate-12 border-2 border-border bg-retro-pink shadow-lg md:block" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <p className="font-mono text-sm text-muted-foreground">
            augie@secure:~$ whoami
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-retro-green text-primary-foreground">
              Available for opportunities
            </Badge>
            <Badge className="bg-retro-lavender text-primary-foreground">
              Cybersecurity Engineering
            </Badge>
          </div>

          <h1 className="font-head text-4xl leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Augie Aristito
            <br />
            Sudiarto
          </h1>

          <p className="max-w-2xl font-head text-base text-foreground/90 sm:text-lg md:text-xl">
            Cybersecurity Engineering Student — Full Stack Developer — COO &amp;
            Co-Founder{" "}
            <a
              href="https://teknostudio.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-retro-orange decoration-2 underline-offset-2"
            >
              Teknostudio
            </a>
          </p>

          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Mahasiswa Rekayasa Keamanan Siber di Politeknik Negeri Cilacap,
            tertarik pada secure software development, enterprise networking,
            server infrastructure, dan applied AI.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "no-underline")}
            >
              Lihat Projects
            </a>
            <a
              href="/cv/Augie-Aristito-Sudiarto-CV.pdf"
              download
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "no-underline"
              )}
            >
              <Download className="size-4" />
              Download CV
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "no-underline"
              )}
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <OffsetFrame accent="bg-retro-lavender" offset="md" className="mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="border-2 border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-border bg-retro-yellow px-3 py-1.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 border-2 border-border bg-destructive" />
                <span className="size-2.5 border-2 border-border bg-retro-orange" />
                <span className="size-2.5 border-2 border-border bg-retro-green" />
              </div>
              <span className="font-mono text-[10px] text-foreground/70">
                ~/augie/avatar.jpg
              </span>
            </div>
            <Image
              src="/images/foto-closeup.jpg"
              alt="Augie Aristito Sudiarto"
              width={400}
              height={533}
              className="h-auto w-full"
              priority
              unoptimized
            />
            <p className="border-t-2 border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
              PCM · Cilacap · 2026
            </p>
          </div>
        </OffsetFrame>
      </div>
    </Section>
  );
}