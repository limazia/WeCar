import { cars } from "@utils/database/cars";

interface BrandLogoProps {
  brand_slug: string;
  size?: string | number;
  className?: string;
}

export function BrandLogo({ brand_slug, size, className }: BrandLogoProps) {
  const car = cars.find((car) => car.slug === brand_slug);

  return (
    <>
      {car !== undefined && (
        <img
          src={`${import.meta.env.VITE_APP_URL}/logos/${car?.image.thumb}`}
          className={className}
          alt={brand_slug}
          width={size}
        />
      )}
    </>
  );
}
