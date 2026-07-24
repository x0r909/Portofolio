"use client";

import { FormEvent, useState } from "react";
import { Code2, Link2, Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    label: "Email",
    value: "augie.aristitoazka@gmail.com",
    href: "mailto:augie.aristitoazka@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/x0r909",
    href: "https://github.com/x0r909",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/augiearistito",
    href: "https://linkedin.com/in/augiearistito",
    icon: Link2,
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
    <section id="contact" className="section-container">
      <div className="mb-10">
        <Badge className="mb-3 bg-retro-pink text-black">Contact</Badge>
        <h2 className="font-head text-3xl md:text-5xl">Let&apos;s Connect</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Open to collaboration, internship opportunities, and interesting
          security / engineering projects.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "hover-lift h-auto w-full justify-start gap-3 py-4 no-underline"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex flex-col items-start text-left">
                  <span className="font-head text-sm">{link.label}</span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {link.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="font-head text-xl">Send a Message</CardTitle>
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
                <Send data-icon="inline-start" className="size-4" />
                Kirim Pesan
              </Button>
              {status === "sent" && (
                <p className="text-sm text-muted-foreground">
                  Email client siap dibuka. Terima kasih!
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
