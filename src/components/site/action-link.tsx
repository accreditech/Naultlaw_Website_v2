import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import type { VariantProps } from "class-variance-authority";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & VariantProps<typeof buttonVariants>;

export function ActionLink({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
