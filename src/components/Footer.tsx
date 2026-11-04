const quickLinks = [
  { href: "#home", label: "home" },
  { href: "#projects", label: "projects" },
  { href: "#certifications", label: "certs" },
  { href: "#contact", label: "contact" },
] as const;

const socialLinks = [
  { href: "https://github.com/x0r909", label: "github" },
  { href: "https://linkedin.com/in/augiearistito", label: "linkedin" },
  { href: "mailto:augie.aristitoazka@gmail.com", label: "email" },
] as const;

// py-1 keeps the hit area at 24px — the WCAG 2.2 target-size floor.
const footerLink =
  "py-1 font-mono text-xs text-muted-foreground no-underline transition-colors duration-150 hover:text-[var(--accent)]";

/**
 * Footer — a closing status line, per DESIGN.md §5b (`© 2026 x0r909`).
 *
 * Deliberately not a four-column template footer: the site only has three
 * link groups' worth of content, and one row carries it.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--bg-elev)]/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-mono text-sm text-foreground">
            <span className="text-[var(--accent)]" aria-hidden="true">
              x0r909
            </span>
            <span className="text-muted-foreground">@portfolio:~$ </span>
            exit
          </p>
          <p className="mt-1 font-mono text-2xs text-muted-foreground">
            Cybersecurity engineering · networking · Teknostudio
          </p>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Navigasi">
          <p className="font-mono text-2xs text-muted-foreground/70">
            /navigate
          </p>
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className={footerLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-1" aria-label="Kontak">
          <p className="font-mono text-2xs text-muted-foreground/70">
            /contact
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

      <div className="border-t border-border/60 px-4 py-4 text-center md:px-8">
        <p className="font-mono text-2xs text-muted-foreground">
          © 2026 x0r909 · built with Next.js
        </p>
      </div>
    </footer>
  );
}