import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  backgroundImageSrc?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  summary,
  backgroundImageSrc,
  className,
}: PageHeroProps) {
  const hasBg = Boolean(backgroundImageSrc);

  return (
    <section
      className={cn(
        "section-padding",
        hasBg ? "dark-block relative overflow-hidden" : "bg-muted/30",
        !hasBg && "border-b border-border",
        className
      )}
    >
      {hasBg && backgroundImageSrc && (
        <>
          <Image
            src={backgroundImageSrc}
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/75 pointer-events-none" />
        </>
      )}
      <div className={cn("container-shell relative z-10", hasBg ? "max-w-4xl" : "")}>
        {eyebrow && (
          <p
            className={cn(
              "eyebrow",
              hasBg ? "text-primary-foreground/60" : "text-muted-foreground"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "mt-3 font-heading text-4xl tracking-tight sm:text-5xl",
            hasBg ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {title}
        </h1>
        {summary && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
              hasBg ? "text-primary-foreground/75" : "text-muted-foreground"
            )}
          >
            {summary}
          </p>
        )}
      </div>
    </section>
  );
}
