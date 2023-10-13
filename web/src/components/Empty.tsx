import { ElementType } from "react";

interface EmptyProps {
  imageElement?: ElementType;
  image?: string;
  title: string;
  description: string;
}

export function Empty({
  imageElement: Image,
  image,
  title,
  description,
}: EmptyProps) {
  return (
    <div className="empty-box">
      <div className="empty-image">
        {Image ? (
          <Image className="img-fluid" />
        ) : (
          <img src={image} alt="" className="img-fluid" />
        )}
      </div>

      <div className="empty">
        <span className="empty-title">{title}</span>
        <small className="empty-description">{description}</small>
      </div>
    </div>
  );
}
