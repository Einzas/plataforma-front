import { useParams } from "react-router-dom";
import { axiosEcommerce } from "../../utils/configAxios";
import { useEffect, useState } from "react";

const Cabecera = () => {
  const { id } = useParams();
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
  const random = Math.floor(Math.random() * bgColorsRamdon.length);
  const [categoria, setCategoria] = useState({});
  useEffect(() => {
    axiosEcommerce
      .get(`/categorias/${id}`)
      .then((response) => {
        setCategoria(response.data.categoria);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <section className={`${bgColorsRamdon[random]} text-white py-2`}>
      <h1 className=" text-4xl font-bold text-center my-5">
        {categoria.nombre}
      </h1>
      <p className="text-center">{categoria.descripcion}</p>
    </section>
  );
};

export default Cabecera;
