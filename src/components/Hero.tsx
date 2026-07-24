import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="home" className="section-container relative overflow-hidden">
      <div className="absolute -right-8 top-8 hidden h-32 w-32 rotate-12 border-2 border-border bg-retro-pink shadow-lg md:block" />
      <div className="absolute -left-6 bottom-12 hidden h-24 w-24 -rotate-6 border-2 border-border bg-retro-blue shadow-md md:block" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge className="bg-retro-green text-black">Available for opportunities</Badge>

          <h1 className="font-head text-4xl leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Augie Aristito
            <br />
            Sudiarto
          </h1>

          <p className="max-w-2xl font-head text-base text-foreground/90 sm:text-lg md:text-xl">
            Cybersecurity Engineering Student — Full Stack Developer — Network
            Engineer — AI/ML Enthusiast
          </p>

          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Mahasiswa Rekayasa Keamanan Siber di Politeknik Negeri Cilacap,
            tertarik pada secure software development, enterprise networking,
            server infrastructure, dan applied AI.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "no-underline")}
            >
              Lihat Projects
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "no-underline"
              )}
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <aside className="border-2 border-border bg-secondary text-secondary-foreground shadow-lg dark:bg-card dark:text-card-foreground">
          <div className="flex items-center gap-2 border-b-2 border-border bg-retro-yellow px-4 py-2 text-black">
            <span className="size-3 border-2 border-border bg-destructive" />
            <span className="size-3 border-2 border-border bg-retro-orange" />
            <span className="size-3 border-2 border-border bg-retro-green" />
            <span className="ml-2 font-mono text-xs font-bold">augie@secure:~</span>
          </div>
          <div className="space-y-2 p-4 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-retro-green">$</span> whoami
            </p>
            <p className="pl-4">augie_aristito_sudiarto</p>
            <p>
              <span className="text-retro-green">$</span> cat status.log
            </p>
            <p className="pl-4">
              system_status: <span className="text-retro-green">online</span>
            </p>
            <p className="pl-4">
              secure_connection:{" "}
              <span className="text-retro-blue">active</span>
            </p>
            <p className="pl-4">
              learning_mode: <span className="text-retro-yellow">continuous</span>
            </p>
            <p>
              <span className="text-retro-green">$</span>{" "}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
