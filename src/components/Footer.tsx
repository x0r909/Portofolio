const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Sertifikasi" },
  { href: "#contact", label: "Contact" },
] as const;

const socialLinks = [
  { href: "https://github.com/x0r909", label: "GitHub" },
  { href: "https://linkedin.com/in/augiearistito", label: "LinkedIn" },
  { href: "mailto:augie.aristitoazka@gmail.com", label: "Email" },
] as const;

// py-1 keeps the hit area at 24px — the WCAG 2.2 target-size floor. The retro
// accents are fill/decoration only, so link text stays foreground.
const footerLink =
  "py-1 text-xs opacity-80 no-underline transition-opacity duration-200 hover:opacity-100";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-secondary text-secondary-foreground dark:bg-card dark:text-card-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-head text-lg">AUGIE.A.S</p>
          <p className="mt-1 text-xs opacity-80">
            Cybersecurity engineering · full stack · Teknostudio
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="font-head text-xs uppercase tracking-wide opacity-70">
            Navigasi
          </p>
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className={footerLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-2">
          <p className="font-head text-xs uppercase tracking-wide opacity-70">
            Kontak
          </p>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className={footerLink}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t-2 border-border/20 px-4 py-4 text-center md:px-8">
        <p className="font-head text-xs opacity-80">
          © 2026 Augie Aristito Sudiarto. All rights reserved.
        </p>
        <p className="mt-1 text-xs opacity-70">
          Built with Next.js + neobrutalism
        </p>
      </div>
    </footer>
  );
}