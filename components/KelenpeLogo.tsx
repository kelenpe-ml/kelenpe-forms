import Image from "next/image";

const LOGO_WIDTH = 883;
const LOGO_HEIGHT = 745;

type KelenpeLogoProps = {
  priority?: boolean;
  className?: string;
};

export function KelenpeLogo({
  priority = false,
  className = "",
}: KelenpeLogoProps) {
  return (
    <div className={`w-fit max-w-[min(100%,12rem)] ${className}`}>
      <Image
        src="/kelenpe-logo.png"
        alt="Kelenpe"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes="(max-width: 640px) 160px, 192px"
        className="h-10 w-auto max-w-full sm:h-12"
      />
    </div>
  );
}
