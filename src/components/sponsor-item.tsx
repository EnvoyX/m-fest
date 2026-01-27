import { cn } from "@/lib/utils";

interface SponsorItemProps {
  icon: string;
  alt: string;
  src: string;
  height: number;
  invert?: boolean;
  className?: string;
}

function SponsorItem({
  icon,
  alt,
  src,
  height,
  invert,
  className,
}: SponsorItemProps) {
  return (
    <div className="flex">
      <img
        className={cn(
          `h-${height}  mb-12 ${invert ? "invert" : ""} ${className ?? ""}`,
        )}
        src={src}
        alt={alt}
        width="auto"
      />
    </div>
  );
}

export default SponsorItem;
