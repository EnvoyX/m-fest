import { cn } from "@/lib/utils";

interface SponsorItemProps {
  alt: string;
  src: string;
  width: number;
  invert?: boolean;
  className?: string;
}

function SponsorItem({
  alt,
  src,
  width,
  invert,
  className,
}: SponsorItemProps) {
  return (
    <div className="flex">
      <img
        className={cn(
          `w-${width}  mb-12 ${invert ? "invert" : ""} ${className ?? ""}`,
        )}
        src={src}
        alt={alt}
        height="auto"
      />
    </div>
  );
}

export default SponsorItem;
