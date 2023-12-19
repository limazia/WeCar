import { ReactComponent as EmptyImage } from "@assets/empty.svg";

interface EmptyProps {
  title: string;
  description?: string;
}

export function Empty({ title, description }: EmptyProps) {
  return (
    <div className="empty-box">
      <div className="empty-image">
        <EmptyImage className="img-fluid" />
      </div>

      <div className="empty">
        <span className="empty-title">{title}</span>
        <small className="empty-description">{description}</small>
      </div>
    </div>
  );
}
