interface SectionTitleProps {
  title: string;
  subtitle?: string;
  uppercase?: boolean;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function SectionTitle({
  title = "",
  subtitle = "",
  uppercase = true,
  className = "",
  variant = "h1",
}: SectionTitleProps) {
  const headerClass = `${className} ${uppercase ? "text-uppercase" : ""}`.trim();
  const HeaderTag = variant;

  return (
    <div className="section-title">
      <HeaderTag className={headerClass}>{title}</HeaderTag>
      {subtitle && <small>{subtitle}</small>}
    </div>
  );
}
