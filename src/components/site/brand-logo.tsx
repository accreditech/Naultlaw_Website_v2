import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type BrandLogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function BrandLogo({ className, variant = "dark" }: BrandLogoProps) {
  const src =
    variant === "light"
      ? "/brand/logo-final-white.png"
      : "/brand/logo-final-blue.png";

  return (
    <Link href="/" aria-label={`${siteConfig.shortName} — home`} className={className}>
      <Image
        src={src}
        alt={siteConfig.shortName}
        width={140}
        height={36}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}
