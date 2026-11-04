import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Terminal } from "@/components/terminal";

/**
 * The session, in order: `[BOOT] → [HERO] → [ABOUT] → [SKILLS] → [PROJECTS] →
 * [TERMINAL] → [CERTS] → [CONTACT]` (DESIGN.md §5b).
 *
 * Motion is not composed here. Every section is a live-build target and
 * `build-live.tsx` constructs its elements in place as they reach the
 * viewport, so nothing may wrap a section in an extra container.
 *
 * Section rhythm: Hero plain → About band → Skills plain → Projects band →
 * Terminal plain → Certs plain → Contact band.
 *
 * The Terminal section is composed inline rather than in its own component
 * because the shell itself (`terminal.tsx`) is the whole body; a wrapper file
 * would add a layer that only forwards props.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />

      <Section id="terminal">
        <SectionHeader
          eyebrow="Terminal"
          title="Shell"
          description="Coba ketik `help`. Perintah di sini benar-benar berjalan: navigasi, ganti fosfor, dan unduh CV."
          accent="phosphor"
          command="./x0r909.sh"
        />
        <Terminal />
      </Section>

      <Certifications />
      <Contact />
    </>
  );
}