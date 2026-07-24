import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
] as const;

export function Skills() {
  return (
    <section id="skills" className="section-container">
      <div className="mb-10">
        <Badge className="mb-3 bg-retro-blue text-black">Skills</Badge>
        <h2 className="font-head text-3xl md:text-5xl">Tech Stack</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tools and technologies I use across security engineering, full stack
          development, and applied AI.
        </p>
      </div>

      <div className="mb-8 hidden gap-4 md:grid md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.id} className="hover-lift">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`size-4 border-2 border-border ${category.accent}`}
                />
                <CardTitle className="font-head text-lg">
                  {category.title}
                </CardTitle>
              </div>
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

      <Accordion type="single" collapsible className="md:hidden" defaultValue="languages">
        {skillCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <span
                  className={`size-3 border-2 border-border ${category.accent}`}
                />
                {category.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
