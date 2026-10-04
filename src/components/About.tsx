import Image from "next/image";
import { HighlightCard } from "@/components/highlight-card";
import { OffsetFrame } from "@/components/offset-frame";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SECTION_ACCENT } from "@/lib/accents";

const highlights = [
  "Secure software development & ethical hacking",
  "Enterprise networking & Linux administration",
  "Full stack web + Android (Kotlin / Jetpack Compose)",
  "Applied AI/ML for real-world problems",
  "Cloud computing & DevSecOps (continuously learning)",
] as const;

export function About() {
  return (
    <Section id="about" banded>
      <SectionHeader
        eyebrow="About"
        title="Who I Am"
        accent={SECTION_ACCENT.about}
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <OffsetFrame accent="bg-retro-pink" offset="sm">
          <div className="border-2 border-border bg-card">
            <Image
              src="/images/foto-sidang.jpg"
              alt="Augie saat sidang reorganisasi HIMATRIS"
              width={600}
              height={400}
              className="h-auto w-full"
              unoptimized
            />
            <p className="border-t-2 border-border px-3 py-2 font-mono text-xs text-muted-foreground">
              Sidang Reorganisasi HIMATRIS
            </p>
          </div>
        </OffsetFrame>

        <div className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="font-head text-xl md:text-2xl">
                Cybersecurity Engineering Student
              </CardTitle>
              <CardDescription className="text-base">
                Politeknik Negeri Cilacap — Rekayasa Keamanan Siber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-relaxed text-foreground/90">
              <p>
                Cybersecurity Engineering student dengan minat kuat pada secure
                software development, ethical hacking, enterprise networking,
                Linux administration, dan server infrastructure.
              </p>
              <p>
                Full stack developer (web &amp; Android/Kotlin+Jetpack
                Compose), serta penerapan AI/ML untuk masalah nyata. Terus
                belajar cloud computing dan DevSecOps.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex-row items-center gap-3">
              <div className="size-10 shrink-0 overflow-hidden border-2 border-border">
                <Image
                  src="/images/logo-teknostudio.png"
                  alt="Teknostudio"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
              <div>
                <CardTitle className="font-head text-lg">
                  <a
                    href="https://teknostudio.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5 underline underline-offset-2"
                  >
                    Teknostudio
                  </a>
                </CardTitle>
                <CardDescription>
                  Co-Founder &amp; Chief Operation Officer (COO)
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <HighlightCard title="Philosophy" className="mt-6">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <blockquote className="font-head text-xl leading-snug md:text-2xl">
            &ldquo;Build Secure. Learn Continuously. Innovate with
            Purpose.&rdquo;
          </blockquote>
          <ul className="mt-6 space-y-2 text-sm md:mt-0">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-bold">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </HighlightCard>
    </Section>
  );
}