import { useParams } from "react-router-dom";
import { axiosEcommerce } from "../../utils/configAxios";
import { useEffect, useState } from "react";
const Cursos = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState([]); //[1
  const [cursos, setCursos] = useState([]);
  useEffect(() => {
    axiosEcommerce
      .get(`/api/v1/categorias/hijo/${id}`)
      .then((response) => {
        setCategoria(response.data.categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <section className="grid gap-2 my-5">
      <article className="mx-10">
        <span className="text-green-500 text-3xl font-bold  ">Cursos</span>
      </article>
      <hr className="border-t-2 border-gray-500 my-4" />
      {
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoria.map((curso) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={curso.id}
            >
              <img
                src={curso.imagen}
                alt={curso.nombre}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800">
                  {curso.nombre}
                </h1>
                <p className="text-gray-600 text-sm my-2">
                  {curso.descripcion}
                </p>
                <a
                  href="#"
                  className="block text-center w-full bg-green-500 text-white py-2 rounded-lg"
                >
                  Inscribirse
                </a>
              </div>
            </div>
          ))}
        </div>
      }
    </section>
  );
};

export default Cursos;
