import { Download } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { HighlightCard } from "@/components/highlight-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardChrome,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SECTION_ACCENT } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Certifications — an `ls ~/certs` listing, per DESIGN.md §5b.
 *
 * Rendered as terminal list rows inside one window rather than a grid of
 * cards: eleven certificates are a list, and a grid would make them compete
 * with each other for attention that the content does not earn.
 *
 * Every `file` name is preserved from the previous revision — these point at
 * real PDFs in `public/certificates/` and must not drift.
 */

const certificates = [
  { name: "MTCNA", issuer: "MikroTik", file: "mtcna.pdf" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", file: "ccna-itn.pdf" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco", file: "i2cs.pdf" },
  {
    name: "Junior Network Administrator",
    issuer: "BNSP",
    file: "junior-network-admin.pdf",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "AWS / Orbit Future Academy",
    file: "aws-ccp-orbit.pdf",
  },
  {
    name: "LKS SMK Jawa Barat 2024",
    issuer: "Disdik Jawa Barat",
    file: "lks-smk-jabar-2024.pdf",
  },
  {
    name: "NETCOMP UGM",
    issuer: "Universitas Gadjah Mada",
    file: "netcomp-ugm.pdf",
  },
  {
    name: "Cisco Networking Dasar",
    issuer: "ID-Networkers",
    file: "cisco-dasar.pdf",
  },
  {
    name: "Mini Class Cisco",
    issuer: "ID-Networkers",
    file: "mini-class-cisco.pdf",
  },
  {
    name: "Webinar Cyber Security",
    issuer: "ID-Networkers",
    file: "webinar-cybersecurity-2023.pdf",
  },
  {
    name: "Literasi Digital Nasional",
    issuer: "Kominfo",
    file: "e-certificate-2021.pdf",
  },
] as const satisfies readonly { name: string; issuer: string; file: string }[];

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader
        eyebrow="Sertifikasi"
        title="Sertifikat & CV"
        description="Sertifikasi profesional dari Cisco, MikroTik, AWS, dan lembaga lainnya. Unduh CV atau sertifikat langsung."
        accent={SECTION_ACCENT.certifications}
        command="ls ~/certs"
      />

      <HighlightCard title="curriculum-vitae.pdf" className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed sm:text-sm">
            CV lengkap Augie Aristito Sudiarto — cybersecurity, networking,
            pengembangan perangkat lunak, dan pengalaman organisasi.
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
            [ download_cv ]
          </a>
        </div>
      </HighlightCard>

      <Card className="hover-glow">
        <CardChrome label={`~/certs — ${certificates.length} files`} />
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {certificates.map((cert, index) => (
              <li
                key={cert.file}
                className="flex flex-col gap-2 px-4 py-3 transition-colors duration-150 hover:bg-[var(--bg-elev)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-baseline gap-3">
                  <span
                    className="shrink-0 font-mono text-2xs text-muted-foreground tabular-nums"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs text-foreground sm:text-sm">
                      {cert.name}
                    </p>
                    <p className="font-mono text-2xs text-muted-foreground">
                      {cert.issuer} · {cert.file}
                    </p>
                  </div>
                </div>
                <a
                  href={`/certificates/${cert.file}`}
                  download
                  className="shrink-0 border border-border px-2 py-1 text-center font-mono text-2xs text-muted-foreground no-underline transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-2)]"
                >
                  [download]
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="justify-between">
          <Badge bracket variant="default">
            {certificates.length} VERIFIED
          </Badge>
          <span className="font-mono text-2xs text-muted-foreground">
            drwxr-xr-x · x0r909 · 2026
          </span>
        </CardFooter>
      </Card>
    </Section>
  );
}