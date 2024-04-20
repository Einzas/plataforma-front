import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserI from "../UserI";

const Sidebar = ({ sidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let nombre = userInfo.usuario.nombre.split("")[0];

  useEffect(() => {
    // Verificar el rol del usuario al cargar el componente
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);

    if (userInfo && userInfo.usuario.rol === 1) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      <div
        className={`fixed transition-all ${
          sidebar ? "-left-0" : "-left-full"
        } lg:static top-0 w-[80%] md:w-[50%] lg:w-full h-full overflow-y-scroll md:overflow-hidden col-span-1 p-8 border-r z-50 bg-white`}
      >
        {/* Logo */}
        <div className="text-center p-8">
          <h1 className="uppercase font-bold tracking-[4px]">
            <img src="/imgs/logoutlvte.png" alt="" />
          </h1>
        </div>
        {/* Menu */}
        <div className="flex flex-col justify-between">
          <nav>
            <ul>
              <li>
                <Link
                  className="flex items-center gap-4 p-4 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors"
                  to={"/sysadmin"}
                >
                  <i className="bx bxs-dashboard"></i> Dashboard
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <div
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-4 p-4 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors cursor-pointer"
                  >
                    <i className="bx bx-user"></i> Administración
                    <i
                      className={`${
                        menuOpen ? "transform rotate-180" : "transform rotate-0"
                      } bx bx-chevron-down ml-auto`}
                    ></i>
                  </div>
                  {menuOpen && (
                    <ul className="pl-8">
                      <li>
                        <Link
                          className="flex items-center gap-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors"
                          to={"usuarios"}
                        >
                          Usuarios
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center gap-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors"
                          to={"roles"}
                        >
                          Roles
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center gap-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors"
                          to={"permisos"}
                        >
                          Permisos
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}
              <li>
                <Link
                  className="flex items-center gap-4 p-4 text-gray-400 hover:text-white rounded-lg hover:bg-green-400 transition-colors"
                  to={"/contact"}
                >
                  <i className="bx bx-food-menu"></i> Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <UserI nombre={nombre}></UserI>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.bool.isRequired,
};
export default Sidebar;
