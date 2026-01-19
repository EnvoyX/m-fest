interface SponsorItemProps {
  icon: string;
  alt: string;
  src: string;
  height: number;
  invert?: boolean;
}

function SponsorItem({
  icon,
  alt,
  src,
  height,
  invert,
}: SponsorItemProps) {
  return (
    <div className="flex">
      <img
        className={`h-${height} mb-12 ${invert ? "invert" : ""}`}
        src={src}
        alt={alt}
        width="auto"
      />
    </div>
  );
}

export default SponsorItem;
