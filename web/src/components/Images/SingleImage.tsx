import CarDefault from "@assets/car-default.jpg";

interface SingleImage {
  image: string;
}

export function SingleImage({ image }: SingleImage) {
  return (
    <img className="card-img-top car-images" src={image || CarDefault} alt="" />
  );
}
