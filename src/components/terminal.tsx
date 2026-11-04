"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { triggerMatrix } from "@/lib/matrix";

/**
 * The interactive terminal.
 *
 * This is the one genuinely stateful piece of the site, so it carries the most
 * care. It is a real input: Enter runs a command, arrows walk the history, Tab
 * completes known commands, and every command has a real effect (navigation,
 * scrolling, theme swap, mail) — nothing here is a printed fake.
 *
 * A11Y. The whole surface is `role="application"` with an off-screen live
 * region (`aria-live="polite"`) mirroring output, so a screen reader hears
 * each command's result without having to navigate the rendered log. The input
 * is a real <input> with a label, not a fake caret.
 *
 * The command set is Indonesian-flavoured where it addresses the visitor, and
 * English for the shell verbs. Both work; `help` lists them.
 */

type Line =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string; tone?: "ok" | "dim" | "warn" }
  | { kind: "link"; text: string; href: string; external?: boolean };

const THEMES = ["green", "amber", "blue"] as const;

const WELCOME: Line[] = [
  { kind: "output", text: "x0r909 shell — v1.0", tone: "dim" },
  { kind: "output", text: "ketik `help` untuk daftar perintah.", tone: "dim" },
];

const HELP: Line[] = [
  { kind: "output", text: "help        tampilkan daftar ini" },
  { kind: "output", text: "about       siapa saya" },
  { kind: "output", text: "projects    lompat ke bagian projects" },
  { kind: "output", text: "contact     info kontak" },
  { kind: "output", text: "skills      lompat ke bagian skills" },
  { kind: "output", text: "theme <x>   green | amber | blue" },
  { kind: "output", text: "cv          unduh CV" },
  { kind: "output", text: "clear       bersihkan layar" },
  { kind: "output", text: "sudo        jangan." },
];

const ABOUT: Line[] = [
  {
    kind: "output",
    text: "Augie Aristito Sudiarto — mahasiswa Rekayasa Keamanan Siber",
  },
  {
    kind: "output",
    text: "Politeknik Negeri Cilacap. Co-Founder & COO Teknostudio.",
  },
  {
    kind: "output",
    text: "Fokus: secure software, enterprise networking, applied AI/ML.",
    tone: "dim",
  },
];

const CONTACT: Line[] = [
  { kind: "output", text: "email     augie.aristitoazka@gmail.com", tone: "dim" },
  { kind: "link", text: "github    github.com/x0r909", href: "https://github.com/x0r909", external: true },
  {
    kind: "link",
    text: "linkedin  linkedin.com/in/augiearistito",
    href: "https://linkedin.com/in/augiearistito",
    external: true,
  },
  {
    kind: "link",
    text: "mailto    kirim email",
    href: "mailto:augie.aristitoazka@gmail.com",
  },
];

/** Commands offered by Tab completion. */
const COMPLETIONS = [
  "help",
  "about",
  "projects",
  "contact",
  "skills",
  "theme",
  "cv",
  "clear",
  "sudo",
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { theme, setTheme } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  // Follow the tail without yanking the whole page.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  const push = (next: Line[]) => setLines((prev) => [...prev, ...next]);

  const run = (raw: string) => {
    const command = raw.trim();
    if (!command) return;

    push([{ kind: "input", text: command }]);
    setHistory((prev) => [command, ...prev]);
    setHistoryIndex(-1);

    const [verb, ...rest] = command.toLowerCase().split(/\s+/);

    switch (verb) {
      case "help":
        push(HELP);
        break;

      case "about":
        push(ABOUT);
        break;

      case "contact":
        push(CONTACT);
        break;

      case "projects":
        push([{ kind: "output", text: "→ membuka #projects", tone: "ok" }]);
        scrollToId("projects");
        break;

      case "skills":
        push([{ kind: "output", text: "→ membuka #skills", tone: "ok" }]);
        scrollToId("skills");
        break;

      case "cv":
        push([
          { kind: "output", text: "→ mengunduh CV…", tone: "ok" },
          {
            kind: "link",
            text: "/cv/Augie-Aristito-Sudiarto-CV.pdf",
            href: "/cv/Augie-Aristito-Sudiarto-CV.pdf",
          },
        ]);
        break;

      case "theme": {
        const target = rest[0];
        if (!target) {
          push([
            {
              kind: "output",
              text: `fosfor saat ini: ${theme ?? "green"}`,
              tone: "dim",
            },
            { kind: "output", text: "pakai: theme green | amber | blue" },
          ]);
          break;
        }
        if (!THEMES.includes(target as (typeof THEMES)[number])) {
          push([
            {
              kind: "output",
              text: `fosfor tidak dikenal: ${target}`,
              tone: "warn",
            },
            { kind: "output", text: "pilihan: green | amber | blue" },
          ]);
          break;
        }
        setTheme(target);
        push([
          { kind: "output", text: `fosfor → ${target}`, tone: "ok" },
        ]);
        break;
      }

      case "clear":
        setLines([]);
        break;

      case "sudo":
        // Easter egg: three seconds of rain. The rain itself is decoration and
        // lives in `matrix-rain.tsx`, which owns the reduced-motion check.
        triggerMatrix();
        push([
          { kind: "output", text: "[sudo] password for visitor:", tone: "dim" },
          { kind: "output", text: "akses ditolak. tapi lihat layarnya.", tone: "warn" },
        ]);
        break;

      default:
        push([
          {
            kind: "output",
            text: `perintah tidak dikenal: ${verb}`,
            tone: "warn",
          },
          { kind: "output", text: "ketik `help`.", tone: "dim" },
        ]);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(value);
      setValue("");
      return;
    }

    // History walk. index -1 is the live input, 0 is the newest command.
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "Tab") {
      const match = COMPLETIONS.find((c) => c.startsWith(value.toLowerCase()));
      if (match) {
        event.preventDefault();
        setValue(match);
      }
      return;
    }

    // Ctrl+L clears, like a real shell.
    if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="border border-phosphor bg-background shadow-md"
      role="application"
      aria-label="Terminal interaktif"
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-border bg-[var(--bg-elev)] px-3 py-1.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-[2px] bg-destructive" />
          <span className="size-2.5 rounded-[2px] bg-warn" />
          <span className="size-2.5 rounded-[2px] bg-phosphor" />
        </div>
        <span className="font-mono text-2xs text-muted-foreground">
          x0r909@portfolio: /bin/sh
        </span>
      </div>

      {/* output log */}
      <div
        ref={logRef}
        className="h-64 overflow-y-auto px-3 py-3 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {lines.map((line, i) => {
          if (line.kind === "input") {
            return (
              <div key={i} className="flex gap-2 text-foreground">
                <span className="shrink-0 text-phosphor" aria-hidden="true">
                  $
                </span>
                <span className="break-all">{line.text}</span>
              </div>
            );
          }

          if (line.kind === "link") {
            return (
              <div key={i} className="pl-4">
                <a
                  href={line.href}
                  target={line.external ? "_blank" : undefined}
                  rel={line.external ? "noopener noreferrer" : undefined}
                  className="break-all text-cyan underline decoration-dotted underline-offset-4 hover:decoration-solid"
                >
                  {line.text}
                </a>
              </div>
            );
          }

          return (
            <div
              key={i}
              className={
                line.tone === "ok"
                  ? "whitespace-pre-wrap pl-4 text-phosphor"
                  : line.tone === "warn"
                    ? "whitespace-pre-wrap pl-4 text-warn"
                    : "whitespace-pre-wrap pl-4 text-muted-foreground"
              }
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* prompt */}
      <form
        className="flex items-center gap-2 border-t border-border px-3 py-2"
        onSubmit={(event) => {
          event.preventDefault();
          run(value);
          setValue("");
          inputRef.current?.focus();
        }}
      >
        <label htmlFor="terminal-input" className="shrink-0 font-mono text-sm text-phosphor">
          $
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </form>

      {/* Screen-reader mirror of the latest output. Kept outside the log so
          repeated navigation of the visual log does not re-announce it. */}
      <p className="sr-only" aria-live="polite">
        {lines.length > 0 ? lines[lines.length - 1].text : ""}
      </p>
    </div>
  );
}