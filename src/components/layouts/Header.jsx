import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginUser } from "../../store/slices/userInfo.slice";
import { Link } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [loginModal, setLoginModal] = useState(false); // [1
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const searchRef = useRef(null);
  const modalRef = useRef(null);
  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  const dispatch = useDispatch();
  const handleLogin = () => {
    setLoginModal(!loginModal);
  };

  const userInfo = useSelector((store) => store.userInfo);
  const handleLoginForm = (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contrasena = e.target.contrasena.value;

    if (correo && contrasena) {
      Swal.fire({
        icon: "warning",
        title: "¡Conectando!",
        text: "Por favor, espera un momento...",
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: async () => {
          Swal.showLoading();
          await dispatch(loginUser({ correo, contrasena }));

          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "¡Conexión exitosa!",
              text: "¡Bienvenido!",
              showConfirmButton: false,
              showCancelButton: false,
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              timer: 2000,
            })
              .then(() => {
                setLoginModal(false);
                location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }, 1000);
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "¡Por favor, llena todos los campos!",
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      icon: "success",
      title: "¡Hasta luego!",
      text: "¡Vuelve pronto!",
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      timer: 2000,
      didClose: () => {
        dispatch(logOut());
      },
    });
  };

  useEffect(() => {
    if (showSearch) {
      // Esperar brevemente para que el input se renderice y esté listo para recibir foco
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 0); // Un timeout de 0 ms a menudo es suficiente para este propósito
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLoginModal(false);
      }
    };

    if (loginModal) {
      document.addEventListener("mousedown", closeOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [loginModal]);

  return (
    <>
      <header className="h-[50px] bg-white shadow-2xl ">
        <div className="mx-3 flex items-center justify-between h-full">
          <div className="w-32">
            <img src="/imgs/logoutlvte.png" alt="" />
          </div>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-800">
                  Ayuda
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={handleSearch}
                  className="text-gray-600 hover:text-gray-800 grid place-items-center items-center"
                >
                  <i className="bx bx-search"></i>
                </button>
                {showSearch && (
                  <input
                    id="search"
                    ref={searchRef}
                    type="text"
                    className="absolute top-0 right-0 w-48 h-8 bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    placeholder="Buscar..."
                  />
                )}
              </li>
              <li>
                {userInfo.usuario && userInfo.token ? (
                  <div className="relative">
                    {/* Botón para desplegar el menú */}
                    <button
                      onClick={toggleDropdown}
                      className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white"
                    >
                      ≡
                    </button>

                    {/* Menú desplegable */}
                    {isOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link
                          to={"/sysadmin/"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                        >
                          Panel de control
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-green-500 hover:bg-green-600 px-2 py-2 rounded-lg text-white hover:text-gray-800"
                  >
                    Iniciar sesión
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {loginModal && (
        <div
          className="bg-black/20 fixed w-full h-screen z-50"
          onClick={handleLogin}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-white w-[300px] rounded-lg shadow-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Iniciar sesión</h2>
              <button
                onClick={() => setLoginModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleLoginForm}>
                <div className="mb-4">
                  <label
                    htmlFor="correo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contrasena"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid place-content-center gap-2 items-center w-full">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white w-f hover:text-gray-800"
                  >
                    Iniciar sesión
                  </button>
                  <hr />
                  <p className="text-center text-xs">¿No tienes cuenta?</p>
                  <Link
                    to={"/register"}
                    className="bg-red-500 hover:bg-red-600 rounded-lg text-white hover:text-gray-800 py-2  text-center"
                  >
                    Regístrate
                  </Link>
                  <a href="/" className="text-blue-500 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
