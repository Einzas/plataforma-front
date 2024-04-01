import { useEffect, useState } from "react";
import { axiosEcommerce } from "../utils/configAxios";
import { Link } from "react-router-dom";
const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  const bgColorsRamdon = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-gray-500",
  ];

  useEffect(() => {
    axiosEcommerce
      .get("/api/v1/categorias/padres")
      .then((response) => {
        setCategorias(response.data.categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="flex my-5 flex-wrap justify-center items-center gap-5 px-5">
      {categorias.map((categoria) => (
        <Link
          to={`/categoria/${categoria.id}`}
          className={`${
            bgColorsRamdon[Math.floor(Math.random() * bgColorsRamdon.length)]
          } text-white p-2 rounded-lg w-40 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-2xl`}
          key={categoria.id}
        >
          <span>{categoria.nombre}</span>
        </Link>
      ))}
    </section>
  );
};

export default Categorias;
