import { Download } from "lucide-react";
import { AccentBar } from "@/components/accent-bar";
import { HighlightCard } from "@/components/highlight-card";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SECTION_ACCENT, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

const certificates = [
  {
    name: "MTCNA",
    issuer: "MikroTik",
    file: "mtcna.pdf",
    accent: "bg-retro-orange",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    file: "ccna-itn.pdf",
    accent: "bg-retro-blue",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    file: "i2cs.pdf",
    accent: "bg-retro-pink",
  },
  {
    name: "Junior Network Administrator",
    issuer: "BNSP",
    file: "junior-network-admin.pdf",
    accent: "bg-retro-green",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "AWS / Orbit Future Academy",
    file: "aws-ccp-orbit.pdf",
    accent: "bg-retro-yellow",
  },
  {
    name: "LKS SMK Jawa Barat 2024",
    issuer: "Disdik Jawa Barat",
    file: "lks-smk-jabar-2024.pdf",
    accent: "bg-retro-lavender",
  },
  {
    name: "NETCOMP UGM",
    issuer: "Universitas Gadjah Mada",
    file: "netcomp-ugm.pdf",
    accent: "bg-retro-orange",
  },
  {
    name: "Cisco Networking Dasar",
    issuer: "ID-Networkers",
    file: "cisco-dasar.pdf",
    accent: "bg-retro-blue",
  },
  {
    name: "Mini Class Cisco",
    issuer: "ID-Networkers",
    file: "mini-class-cisco.pdf",
    accent: "bg-retro-green",
  },
  {
    name: "Webinar Cyber Security",
    issuer: "ID-Networkers",
    file: "webinar-cybersecurity-2023.pdf",
    accent: "bg-retro-pink",
  },
  {
    name: "Literasi Digital Nasional",
    issuer: "Kominfo",
    file: "e-certificate-2021.pdf",
    accent: "bg-retro-yellow",
  },
] as const satisfies readonly {
  name: string;
  issuer: string;
  file: string;
  accent: Accent;
}[];

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader
        eyebrow="Sertifikasi"
        title="Sertifikat & CV"
        description="Sertifikasi profesional dari Cisco, MikroTik, AWS, dan lembaga lainnya. Unduh CV atau sertifikat langsung."
        accent={SECTION_ACCENT.certifications}
      />

      <HighlightCard title="Curriculum Vitae" className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            CV lengkap Augie Aristito Sudiarto — cybersecurity, full stack
            development, networking, dan pengalaman organisasi.
          </p>
          <a
            href="/cv/Augie-Aristito-Sudiarto-CV.pdf"
            download
            className={cn(
              buttonVariants({ size: "lg" }),
              "shrink-0 no-underline"
            )}
          >
            <Download className="size-4" />
            Download CV
          </a>
        </div>
      </HighlightCard>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.file} size="sm" className="hover-lift flex h-full flex-col">
            <AccentBar accent={cert.accent} />
            <CardHeader>
              <CardTitle className="text-base font-bold">{cert.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </CardHeader>
            <CardFooter className="mt-auto">
              <a
                href={`/certificates/${cert.file}`}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "no-underline"
                )}
              >
                <Download className="size-3.5" />
                Download
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}