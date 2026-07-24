export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-secondary text-secondary-foreground dark:bg-card dark:text-card-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm md:flex-row md:px-8 md:text-left">
        <p className="font-head">
          © 2026 Augie Aristito Sudiarto. All rights reserved.
        </p>
        <p className="font-mono text-xs opacity-80">
          Built with Next.js + RetroUI
        </p>
      </div>
    </footer>
  );
}
