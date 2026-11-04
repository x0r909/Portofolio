import Image from "next/image";
import { HighlightCard } from "@/components/highlight-card";
import { OffsetFrame } from "@/components/offset-frame";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardChrome,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * About — rendered as the output of `cat about.txt`, per DESIGN.md §5b.
 *
 * The prose stays real paragraphs inside a window panel rather than a
 * preformatted blob: the file metaphor is the frame, not an excuse to lock the
 * text out of reflow, selection, or screen readers.
 */

const highlights = [
  "Secure software development & ethical hacking",
  "Enterprise networking & Linux administration",
  "Web & Android development (Kotlin / Jetpack Compose)",
  "Applied AI/ML for real-world problems",
  "Cloud computing & DevSecOps (continuously learning)",
] as const;

export function About() {
  return (
    <Section id="about" banded>
      <SectionHeader
        eyebrow="About"
        title="Who I Am"
        accent="cyan"
        command="cat about.txt"
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <OffsetFrame accent="cyan" offset="sm">
          <div className="border border-border bg-card">
            <Image
              src="/images/foto-sidang.jpg"
              alt="Augie saat sidang reorganisasi HIMATRIS"
              width={600}
              height={400}
              className="h-auto w-full"
              unoptimized
            />
            <p className="border-t border-border px-3 py-2 font-mono text-2xs text-muted-foreground">
              Sidang Reorganisasi HIMATRIS
            </p>
          </div>
        </OffsetFrame>

        <div className="space-y-4">
          <Card className="hover-glow">
            <CardChrome label="identity.txt" />
            <CardHeader>
              <CardTitle className="font-display text-xl md:text-2xl">
                Cybersecurity Engineering Student
              </CardTitle>
              <p className="font-mono text-xs text-[var(--accent-2)]">
                Politeknik Negeri Cilacap — Rekayasa Keamanan Siber
              </p>
            </CardHeader>
            <CardContent className="space-y-3 font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm">
              <p>
                Cybersecurity Engineering student dengan minat kuat pada secure
                software development, ethical hacking, enterprise networking,
                Linux administration, dan server infrastructure.
              </p>
              <p>
                Pengembangan web &amp; Android (Kotlin + Jetpack Compose),
                serta penerapan AI/ML untuk masalah nyata. Terus belajar cloud
                computing dan DevSecOps.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardChrome label="teknostudio.exe" />
            <CardHeader className="flex-row items-center gap-3">
              <div className="size-10 shrink-0 overflow-hidden border border-border bg-[var(--bg-elev)]">
                <Image
                  src="/images/logo-teknostudio.png"
                  alt="Teknostudio"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base">
                  <a
                    href="https://teknostudio.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid"
                  >
                    Teknostudio
                  </a>
                </CardTitle>
                <p className="font-mono text-2xs text-muted-foreground">
                  Co-Founder &amp; Chief Operation Officer (COO)
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <HighlightCard title="philosophy.log" className="mt-6">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <blockquote className="font-display text-xl leading-snug text-foreground md:text-2xl">
            &ldquo;Build Secure. Learn Continuously. Innovate with
            Purpose.&rdquo;
          </blockquote>
          <ul className="mt-6 space-y-2 font-mono text-xs md:mt-0">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--accent)]" aria-hidden="true">
                  ▸
                </span>
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </HighlightCard>
    </Section>
  );
}