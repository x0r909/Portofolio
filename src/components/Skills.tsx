import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardChrome,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Accent } from "@/lib/accents";

/**
 * Skills — an `ls -la` listing, per DESIGN.md §5b.
 *
 * Each category is a "directory" panel and each skill is a row. There are no
 * proficiency numbers and no bars: a percentage of a skill is not a fact, and
 * a bar makes an arbitrary claim look measured. The list says which tools are
 * in the kit; nothing claims how good at them anyone is.
 *
 * The `$` prompt prefix is the only ornament, and it is `aria-hidden` because
 * it repeats what the panel already says.
 */

const skillCategories = [
  {
    id: "security",
    title: "Security",
    accent: "phosphor",
    skills: [
      "Wireshark",
      "Kali Linux",
      "OWASP Top 10",
      "MikroTik",
      "Ethical Hacking",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    accent: "cyan",
    skills: [
      "Python",
      "PHP / Laravel",
      "Go",
      "Node.js / NestJS",
      "Java / Kotlin",
      "Rust",
    ],
  },
  {
    id: "infra",
    title: "Infra / Linux",
    accent: "warn",
    skills: ["Linux Admin", "Docker", "Networking", "Bash", "Nginx", "Proxmox"],
  },
  {
    id: "aiml",
    title: "AI / ML",
    accent: "cyan",
    skills: ["PyTorch", "TensorFlow", "OpenCV", "NumPy / Pandas"],
  },
] as const satisfies readonly {
  id: string;
  title: string;
  accent: Accent;
  skills: readonly string[];
}[];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="Tech Stack"
        description="Tools and technologies I use across security engineering, backend development, infrastructure, and applied AI."
        accent="phosphor"
        command="ls -la /skills"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.id} className="hover-glow flex h-full flex-col">
            <CardChrome label={`${category.id}/`} />
            <CardHeader>
              <CardTitle className="font-display text-lg">
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="font-mono text-xs">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-baseline gap-2 border-b border-dashed border-border/60 py-1.5 last:border-b-0"
                  >
                    <span
                      className="shrink-0 text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      $
                    </span>
                    <span className="text-foreground/90">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}