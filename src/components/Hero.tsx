import Image from "next/image";
import { Download } from "lucide-react";
import { OffsetFrame } from "@/components/offset-frame";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Hero — the `whoami` output.
 *
 * The typewriter line is real text revealed by a clip that sweeps left to
 * right (see `.typewriter--on` in globals.css). It needs no per-character JS,
 * stays selectable, and is complete for screen readers and find-in-page — the
 * animation is purely visual, so there is nothing to fall back from.
 */
export function Hero() {
  return (
    <Section id="home" className="relative overflow-hidden">
      {/* Corner accent square — the one piece of pure ornament in the hero.
          Hidden on small screens where it would crowd the type. */}
      <div
        aria-hidden="true"
        className="absolute -right-6 top-10 hidden size-24 rotate-12 border border-[var(--accent)] opacity-30 md:block"
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <p className="font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-[var(--accent)]" aria-hidden="true">
              x0r909@portfolio
            </span>
            <span className="text-muted-foreground">:~$ </span>
            <span
              className="typewriter typewriter--on text-foreground"
              style={{ ["--type-chars" as string]: 6 }}
            >
              whoami
            </span>
          </p>

          <h1 className="font-display text-5xl leading-none text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Augie Aristito
            <br />
            <span className="text-[var(--accent)]">Sudiarto</span>
          </h1>

          <div className="flex flex-wrap gap-2" data-build="">
            <Badge bracket variant="default">
              ONLINE
            </Badge>
            <Badge bracket variant="cyan">
              CYBERSECURITY
            </Badge>
            <Badge bracket variant="warn">
              OPEN TO WORK
            </Badge>
          </div>

          <p className="max-w-2xl font-mono text-sm text-foreground/90 sm:text-base">
            Cybersecurity Engineering Student — COO &amp; Co-Founder{" "}
            <a
              href="https://teknostudio.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              Teknostudio
            </a>
          </p>

          <p className="max-w-2xl font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-[var(--accent-2)]" aria-hidden="true">
              #
            </span>{" "}
            Mahasiswa Rekayasa Keamanan Siber di Politeknik Negeri Cilacap,
            tertarik pada secure software development, enterprise networking,
            server infrastructure, dan applied AI.
          </p>

          <div className="flex flex-wrap gap-3" data-build="">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "no-underline")}
            >
              [ view_projects ]
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
              [ download_cv ]
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "no-underline"
              )}
            >
              [ contact_me ]
            </a>
          </div>
        </div>

        <OffsetFrame accent="cyan" offset="md" className="mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="border border-border bg-card shadow-md">
            <div className="flex items-center justify-between border-b border-border bg-[var(--bg-elev)] px-2 py-1.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-[2px] bg-destructive" />
                <span className="size-2 rounded-[2px] bg-warn" />
                <span className="size-2 rounded-[2px] bg-phosphor" />
              </div>
              <span className="font-mono text-2xs text-muted-foreground">
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
            <p className="border-t border-border px-2 py-1.5 font-mono text-2xs text-muted-foreground">
              <span className="text-[var(--accent)]" aria-hidden="true">
                ●
              </span>{" "}
              PCM · Cilacap · 2026
            </p>
          </div>
        </OffsetFrame>
      </div>
    </Section>
  );
}