import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
          <Avatar className="size-16 border-2 border-border shadow-md md:size-20">
            <AvatarFallback className="bg-retro-lavender font-head text-lg text-black md:text-xl">
              AA
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
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
                Full stack developer (web & Android/Kotlin+Jetpack Compose),
                serta penerapan AI/ML untuk masalah nyata. Terus belajar cloud
                computing dan DevSecOps.
              </p>
            </CardContent>
          </Card>

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
        </div>
      </div>
    </section>
  );
}
