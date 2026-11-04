"use client";

import { FormEvent, useState } from "react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardChrome,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SECTION_ACCENT } from "@/lib/accents";

/**
 * Contact — an `ssh`-style link list plus a mail form, per DESIGN.md §5b.
 *
 * NO SUBMISSION ENDPOINT. The form builds a `mailto:` URL and assigns it to
 * `window.location.href`. This is deliberate and must stay that way: the site
 * is a static export (`output: "export"`), so there are no server actions and
 * no route handlers to post to.
 *
 * The contact addresses here are duplicated in `layout.tsx`'s JSON-LD
 * (`email` / `sameAs`). Changing one requires changing the other.
 */

const contactLinks = [
  {
    label: "email",
    value: "augie.aristitoazka@gmail.com",
    href: "mailto:augie.aristitoazka@gmail.com",
  },
  {
    label: "github",
    value: "github.com/x0r909",
    href: "https://github.com/x0r909",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/augiearistito",
    href: "https://linkedin.com/in/augiearistito",
  },
  {
    label: "website",
    value: "teknostudio.id",
    href: "https://teknostudio.id",
  },
] as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:augie.aristitoazka@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <Section id="contact" banded>
      <SectionHeader
        eyebrow="Contact"
        title="Let's Connect"
        description="Open to collaboration, internship opportunities, and interesting security / engineering projects."
        accent={SECTION_ACCENT.contact}
        command="ssh augie@x0r909.dev"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="hover-glow h-fit">
          <CardChrome label="links" />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {contactLinks.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-baseline gap-3 px-4 py-3 no-underline transition-colors duration-150 hover:bg-[var(--bg-elev)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent-2)]"
                    >
                      <span className="w-20 shrink-0 font-mono text-2xs text-muted-foreground">
                        {link.label}
                      </span>
                      <span className="min-w-0 break-all font-mono text-xs text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid sm:text-sm">
                        {link.value}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardChrome label="send-message.sh" />
          <CardHeader>
            <CardTitle className="font-display text-xl">
              Send a Message
            </CardTitle>
            <CardDescription>
              Isi form di bawah — akan membuka email client kamu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nama lengkap"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tulis pesanmu di sini..."
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                [ kirim_pesan ]
              </Button>
              {status === "sent" && (
                <p
                  className="font-mono text-xs text-muted-foreground"
                  role="status"
                >
                  Email client siap dibuka. Terima kasih!
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}