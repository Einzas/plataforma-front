import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logOut } from "../../store/slices/userInfo.slice";
import PropTypes from "prop-types";

const UserI = ({ nombre }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);
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
        navigate("/home");
      },
    });
  };
  return (
    <div>
      <div className="fixed right-4 top-2">
        {/* Botón para desplegar el menú */}
        <button
          onClick={toggleDropdown}
          className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white"
        >
          {nombre}
        </button>

        {/* Menú desplegable */}
        {isOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <Link
              to={"/sysadmin/"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              Perfil
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
    </div>
  );
};

UserI.propTypes = {
  nombre: PropTypes.string.isRequired,
};

export default UserI;
