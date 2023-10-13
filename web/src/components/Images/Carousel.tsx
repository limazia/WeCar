interface CarouselProps {
  images: string[];
}

export function Carousel({ images = [] }: CarouselProps) {
  return (
    <div
      id="carCarouselIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {images.map((_, index) => (
          <li
            key={index}
            data-target="#carCarouselIndicators"
            data-slide-to={index}
            className={` ${index === 0 ? "active" : ""}`}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              marginRight: "7px",
              marginLeft: "7px",
            }}
          />
        ))}
      </ol>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              className="card-img-top d-block w-100 car-images"
              src={image}
              alt=""
            />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carCarouselIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carCarouselIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
