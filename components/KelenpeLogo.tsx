import Image from "next/image";

const LOGO_WIDTH = 79;
const LOGO_HEIGHT = 44;

export function KelenpeLogo({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/kelenpe-logo.png"
      alt="Kelenpe"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className="h-[44px] w-auto"
    />
  );
}
