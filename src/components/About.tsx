import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const highlights = [
  "Secure software development & ethical hacking",
  "Enterprise networking & Linux administration",
  "Full stack web + Android (Kotlin / Jetpack Compose)",
  "Applied AI/ML for real-world problems",
  "Cloud computing & DevSecOps (continuously learning)",
] as const;

export function About() {
  return (
    <section id="about" className="border-y-2 border-border bg-muted/40">
      <div className="section-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">
              About
            </Badge>
            <h2 className="font-head text-3xl md:text-5xl">Who I Am</h2>
          </div>
          <div className="size-16 overflow-hidden border-2 border-border shadow-md md:size-20">
            <Image
              src="/images/foto-closeup.jpg"
              alt="Augie Aristito Sudiarto"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
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
                      className="underline underline-offset-2"
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

          <div className="space-y-6">
            <Card className="border-2 border-border bg-retro-yellow text-black shadow-md hover-lift dark:bg-primary">
              <CardHeader>
                <CardTitle className="font-head text-lg">Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="font-head text-xl leading-snug md:text-2xl">
                  &ldquo;Build Secure. Learn Continuously. Innovate with
                  Purpose.&rdquo;
                </blockquote>
                <ul className="mt-6 space-y-2 text-sm">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-bold">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="overflow-hidden border-2 border-border shadow-md">
                <Image
                  src="/images/foto-sidang.jpg"
                  alt="Augie saat sidang reorganisasi HIMATRIS"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full border-2 border-border bg-retro-pink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
