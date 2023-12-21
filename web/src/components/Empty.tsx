import { ReactComponent as ObjectEmpty } from "@assets/empty.svg";
import { ReactComponent as CarEmpty } from "@assets/car-empty.svg";

interface EmptyProps {
  type?: "object" | "car";
  title: string;
  description?: string;
}

export function Empty({ type = "object", title, description }: EmptyProps) {
  return (
    <div className="empty-box">
      <div className="empty-image">
        {type === "object" ? <ObjectEmpty /> : <CarEmpty />}
      </div>

      <div className="empty">
        <span className="empty-title">{title}</span>
        <small className="empty-description">{description}</small>
      </div>
    </div>
  );
}
