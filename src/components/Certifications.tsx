import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
] as const;

export function Certifications() {
  return (
    <section id="certifications" className="section-container">
      <div className="mb-10">
        <Badge className="mb-3 bg-retro-pink text-black">Sertifikasi</Badge>
        <h2 className="font-head text-3xl md:text-5xl">Sertifikat &amp; CV</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Sertifikasi profesional dari Cisco, MikroTik, AWS, dan lembaga
          lainnya. Unduh CV atau sertifikat langsung.
        </p>
      </div>

      <Card className="mb-8 border-2 border-border bg-retro-yellow text-black shadow-md dark:bg-primary">
        <CardHeader>
          <CardTitle className="font-head text-xl">
            Curriculum Vitae
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            CV lengkap Augie Aristito Sudiarto — cybersecurity, full stack
            development, networking, dan pengalaman organisasi.
          </p>
        </CardContent>
        <CardFooter>
          <a
            href="/cv/Augie-Aristito-Sudiarto-CV.pdf"
            download
            className={cn(
              buttonVariants({ size: "sm" }),
              "no-underline bg-black text-white hover:bg-black/80"
            )}
          >
            <Download className="size-4" />
            Download CV
          </a>
        </CardFooter>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.file} className="hover-lift flex h-full flex-col">
            <CardHeader className="pb-2">
              <div
                className={`mb-2 h-2 w-full border-2 border-border ${cert.accent}`}
              />
              <CardTitle className="text-base font-bold">
                {cert.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </CardHeader>
            <CardFooter className="mt-auto pt-2">
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
    </section>
  );
}
