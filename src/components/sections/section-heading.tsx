import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  tone?: "default" | "inverse";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  tone = "default",
  align = "left",
}: SectionHeadingProps) {
  const isInverse = tone === "inverse";
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow",
            isInverse ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 font-heading text-3xl tracking-tight sm:text-4xl",
          isInverse ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base leading-7",
            isInverse ? "text-primary-foreground/70" : "text-muted-foreground",
            !centered && "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
