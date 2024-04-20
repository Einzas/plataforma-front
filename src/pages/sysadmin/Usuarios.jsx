import { useState, useEffect } from "react";
import Button from "../../components/sysadmin/layouts/Button";
import Sidebar from "../../components/sysadmin/layouts/Sidebar";

import { axiosEcommerce } from "../../utils/configAxios";
const Usuarios = () => {
  const [sidebar, setSidebar] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const paginateLogic = () => {
    const USER_PER_PAGE = 5;
    const sliceInit = (currentPage - 1) * USER_PER_PAGE;
    const sliceEnd = sliceInit + USER_PER_PAGE;
    const currentUsers = usuarios.slice(sliceInit, sliceEnd);
    const lastPage = Math.ceil(usuarios.length / USER_PER_PAGE) || 1;
    const PAGES_PER_GROUP = 5;
    const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
    const pagesInGroup = [];
    const minPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
    const maxPage = currentGroup * PAGES_PER_GROUP;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) pagesInGroup.push(i);
    }
    return {
      currentUsers,
      lastPage,
      pagesInGroup,
    };
  };

  const { currentUsers, lastPage, pagesInGroup } = paginateLogic();

  const handlePage = (page) => {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    axiosEcommerce
      .get("/usuarios", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
        },
      })
      .then((response) => {
        setUsuarios(response.data.usuarios);
      });
  }, []);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      <Sidebar sidebar={sidebar} />
      <Button sidebar={sidebar} handleSidebar={handleSidebar} />
      <div className="col-span-5 relative px-5 py-4">
        <h1 className="text-xl mb-4">Usuarios</h1>
        <hr className="py-[1px] bg-green-500" />
        <section className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <article className="flex flex-col overflow-auto">
            <table className="table-auto min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border border-green-700 p-2">Nombre</th>
                  <th className="border border-green-700 p-2">Apellidos</th>
                  <th className="border border-green-700 p-2">Cedula</th>
                  <th className="border border-green-700 p-2">Correo</th>
                  <th className="border border-green-700 p-2">Telefono</th>
                  <th className="border border-green-700 p-2">Rol</th>
                  <th className="border border-green-700 p-2">Estado</th>
                  <th className="border border-green-700 p-2" colSpan={2}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentUsers.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-200">
                    <td className="border border-gray-300 p-2">
                      {usuario.nombre}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.apellido}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.cedula}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.correo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {usuario.telefono}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="bg-green-500 px-2 py-1 rounded-full text-white">
                        {usuario.id_rol === 1
                          ? "Administrador"
                          : usuario.id_rol === 2
                          ? "Profesor"
                          : usuario.id_rol === 3
                          ? "Estudiante"
                          : "Invitado"}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`${
                          usuario.estado ? "bg-green-500" : "bg-red-500"
                        } px-2 py-1 rounded-full text-white`}
                      >
                        {usuario.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">
                        Editar
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-green-400 hover:cursor-pointer text-black font-bold py-2 px-4 rounded-l"
            >
              Anterior
            </button>
            {pagesInGroup.map((page) => (
              <button
                key={page}
                onClick={() => handlePage(page)}
                className={`py-2 px-4 ${
                  page === currentPage
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 hover:bg-green-400 text-black"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="bg-gray-300 hover:bg-green-400 hover:cursor-pointer text-black font-bold py-2 px-4 rounded-r"
            >
              Siguiente
            </button>
          </div>
        </section>
        <button className="absolute  left-5  sm:right-3  bg-green-600 hover:bg-green-400 text-white px-2 py-3">
          Crear Usuario
        </button>

        {/* Modal de crear usuario */}
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 items-center justify-center grid place-content-center">
          <div className="bg-white w-[500px] p-4 rounded-lg  ">
            <h1 className="text-xl">Crear Usuario</h1>
            <hr className="my-2" />
            <form action="" className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <input
                type="text"
                placeholder="Apellidos"
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <input
                type="text"
                placeholder="Cedula"
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <input
                type="email"
                placeholder="Correo"
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-600 px-2 py-2 rounded-lg text-white hover:text-gray-800"
              >
                Crear Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Usuarios;
