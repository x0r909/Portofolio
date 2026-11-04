import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { OffsetFrame } from "@/components/offset-frame";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardChrome,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { REPOS, type Repo } from "@/lib/projects.generated";
import { SECTION_ACCENT } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Projects — window cards, per DESIGN.md §9 and §8.
 *
 * The list is GitHub, not a hand-kept array: `src/lib/projects.generated.ts` is
 * a snapshot written by `npm run sync:projects`, and this component only
 * formats it. Adding a repository to the account is enough to get a card here
 * after the next sync — nothing needs editing in JSX.
 *
 * Three fields are derived, never invented:
 *
 *   status  — from `archived` and `pushedAt`
 *   meta    — the push date, exactly as GitHub reports it
 *   stack   — GitHub's `topics`, falling back to its primary `language`
 *
 * A repository with no description shows the push line only. There is no
 * placeholder prose: an empty description is a fact about the repo, so it is
 * rendered as absence rather than filled in.
 */

type Status = "ONLINE" | "DORMANT" | "ARCHIVED";

const STATUS_VARIANT: Record<Status, "default" | "warn" | "dim" | "cyan"> = {
  ONLINE: "default",
  DORMANT: "warn",
  ARCHIVED: "dim",
};

/** Six months without a push reads as dormant rather than active. */
const DORMANT_MS = 1000 * 60 * 60 * 24 * 182;

function statusOf(repo: Repo): Status {
  if (repo.archived) return "ARCHIVED";
  const age = Date.now() - Date.parse(repo.pushedAt);
  return age > DORMANT_MS ? "DORMANT" : "ONLINE";
}

function stackOf(repo: Repo): readonly string[] {
  if (repo.topics.length > 0) return repo.topics;
  return repo.language ? [repo.language] : [];
}

/** `2026-10-31T09:10:03Z` → `2026-10-31`, without a timezone round-trip. */
const pushedOn = (repo: Repo) => repo.pushedAt.slice(0, 10);

function RepoLink({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-border px-2 py-1 font-mono text-2xs text-muted-foreground no-underline transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-2)]"
    >
      [repo]
    </a>
  );
}

export function Projects() {
  // The snapshot is sorted newest-first by the sync script; the first entry is
  // the most recently pushed repository.
  const [featured, ...rest] = REPOS;

  return (
    <Section id="projects" banded>
      <SectionHeader
        eyebrow="Projects"
        title="Featured Work"
        description="Repositori publik terbaru, ditarik langsung dari GitHub. Urut sesuai push terakhir."
        accent={SECTION_ACCENT.projects}
        command="gh repo list x0r909"
      />

      {featured ? (
        <OffsetFrame accent="warn" offset="lg" className="mb-10">
          <Card className="hover-glow glitch-hover flex flex-col">
            <CardChrome label={`~/projects/${featured.name}`} />
            <div className="md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-6">
              <div>
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <CardTitle className="font-display text-2xl md:text-3xl">
                    {featured.name}
                  </CardTitle>
                  <Badge bracket variant={STATUS_VARIANT[statusOf(featured)]}>
                    {statusOf(featured)}
                  </Badge>
                </CardHeader>
                {featured.description ? (
                  <CardDescription className="px-4 pb-4 text-sm leading-relaxed">
                    {featured.description}
                  </CardDescription>
                ) : null}
                <CardContent className="flex flex-wrap gap-1.5">
                  {stackOf(featured).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </CardContent>
              </div>

              <div className="flex flex-col justify-end gap-3 border-t border-dashed border-border p-4 md:border-t-0 md:border-l">
                <p className="font-mono text-2xs text-muted-foreground">
                  {statusOf(featured) === "ARCHIVED" ? "archived" : "pushed"}{" "}
                  {pushedOn(featured)} · {featured.stars} ★ · {featured.forks}{" "}
                  {featured.forks === 1 ? "fork" : "forks"}
                </p>
                <RepoLink repo={featured} />
              </div>
            </div>
          </Card>
        </OffsetFrame>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {rest.map((repo) => (
          <Card
            key={repo.name}
            className="hover-glow glitch-hover flex h-full flex-col"
          >
            <CardChrome label={repo.name} />
            <CardHeader className="flex-row items-start justify-between gap-3">
              <CardTitle className="font-display text-lg leading-tight">
                {repo.name}
              </CardTitle>
              <Badge bracket variant={STATUS_VARIANT[statusOf(repo)]}>
                {statusOf(repo)}
              </Badge>
            </CardHeader>
            {repo.description ? (
              <CardDescription className="line-clamp-4 px-4 text-xs leading-relaxed">
                {repo.description}
              </CardDescription>
            ) : (
              <CardDescription className="px-4 text-xs italic">
                tanpa deskripsi
              </CardDescription>
            )}
            <CardContent className="flex flex-wrap gap-1.5">
              {stackOf(repo).map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="mt-auto justify-between gap-3">
              <span className="font-mono text-2xs text-muted-foreground">
                {pushedOn(repo)}
              </span>
              <RepoLink repo={repo} />
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-muted-foreground">
        <span className="text-[var(--accent)]" aria-hidden="true">
          $
        </span>{" "}
        lihat semua repositori di{" "}
        <a
          href="https://github.com/x0r909"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid"
          )}
        >
          github.com/x0r909
        </a>
      </p>
    </Section>
  );
}