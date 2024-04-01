import { useState, useEffect } from "react";

const Slider = () => {
  const [imagesToShow, setImagesToShow] = useState(0);
  const images = [
    {
      id: 1,
      src: "imgs/main/contabilidad.jpg",
      alt: "Imagen 1",
      a: "https://www.google.com",
    },
    {
      id: 2,
      src: "imgs/main/informatica.jpg",
      alt: "Imagen 2",
      a: "https://www.google.com",
    },
    {
      id: 3,
      src: "imgs/main/mecanica.jpg",
      alt: "Imagen 3",
      a: "https://www.google.com",
    },
    {
      id: 4,
      src: "imgs/main/quimica.jpg",
      alt: "Imagen 4",
      a: "https://www.google.com",
    },
  ];

  const handleNext = () => {
    setImagesToShow((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setImagesToShow((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const positionImages = {
    0: "-ml-[0%]",
    1: "-ml-[100%]",
    2: "-ml-[200%]",
    3: "-ml-[300%]",
  };

  // Agrega useEffect aquí
  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval); //
  }, [imagesToShow]);

  return (
    <section className="w-full lg:h-[400px]  m-auto">
      <div className="relative overflow-hidden mx-5 lg:mx-40">
        <section
          className={`flex w-[400%] ${positionImages[imagesToShow]} duration-200`}
        >
          {images.map((image) => (
            <a
              className="w-[calc(100%_/_4)] p-4 rounded-lg h-[200px] lg:h-[400px]"
              href={image.a}
              key={image.id}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-contain rounded-lg"
              />
            </a>
          ))}
        </section>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform translate-x-1/2 -translate-y-1/2 z-10 hover:bg-black/20 rounded-full p-2"
        >
          <i className="bx bx-chevron-left text-white text-2xl"></i>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:bg-black/20 rounded-full p-2"
        >
          <i className="bx bx-chevron-right text-white text-2xl"></i>
        </button>
      </div>
    </section>
  );
};

export default Slider;
