import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccentBar } from "@/components/accent-bar";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { SECTION_ACCENT, type Accent } from "@/lib/accents";

const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    accent: "bg-retro-yellow",
    skills: [
      "Python",
      "PHP",
      "Kotlin",
      "Java",
      "JavaScript",
      "TypeScript",
      "Go",
      "Bash",
      "Docker",
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Tools",
    accent: "bg-retro-orange",
    skills: [
      "Laravel",
      "Node.js",
      "Next.js",
      "NestJS",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    id: "data-ai",
    title: "Databases & AI/ML",
    accent: "bg-retro-blue",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    accent: "bg-retro-pink",
    skills: ["Wireshark", "Kali Linux", "OWASP Top 10", "MikroTik"],
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
        description="Tools and technologies I use across security engineering, full stack development, and applied AI."
        accent={SECTION_ACCENT.skills}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.id} className="hover-lift flex h-full flex-col">
            <AccentBar accent={category.accent} />
            <CardHeader>
              <CardTitle className="font-head text-lg">
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}