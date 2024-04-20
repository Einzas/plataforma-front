import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../store/slices/userInfo.slice";
import Swal from "sweetalert2";
const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    if (localStorage.getItem("validacion") === "false") {
      localStorage.setItem("validacion", "true");
    }
    dispatch(registerUser(data));
    if (localStorage.getItem("validacion") === "false") {
      return;
    } else {
      reset();
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "¡Bienvenido!",
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timer: 2000,
      }).then(() => {
        navigate("/home");
      });
    }
  };
  return (
    <>
      <main className="grid place-content-center bg-white bg-center items-center bg-[url('/imgs/fondo.jpg')]  bg-no-repeat bg-cover h-screen">
        <section className="mb-6">
          <article className="w-64">
            {/* Imagen de
            <a href="https://www.freepik.es/vector-gratis/fondo-abstracto-blanco_12188663.htm#query=texturas%20blancas&position=0&from_view=keyword&track=ais&uuid=87238b5d-d809-49e8-9a4a-dc2a6800c375">
              Freepik
            </a> */}
            <img src="/imgs/logoutlvte.png" alt="Logo" />
          </article>
        </section>
        <section className="bg-white rounded-lg shadow-2xl px-5 py-3">
          <article className="text-center text-2xl text-green-800">
            Registro
          </article>
          <hr className="my-2 bg-green-300 text-green-300 py-[1px]" />
          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              placeholder="Nombre"
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              {...register("nombre", { required: true })}
            />
            <input
              type="text"
              placeholder="Apellidos"
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              {...register("apellido", { required: true })}
            />
            <input
              type="text"
              placeholder="Cedula"
              maxLength={13}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              {...register("cedula", { required: true, maxLength: 13 })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            <input
              type="email"
              placeholder="Correo"
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              {...register("correo", { required: true })}
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase();
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              {...register("contrasena", { required: true })}
            />
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-600 px-2 py-2 rounded-lg text-white hover:text-gray-800"
            >
              Registrarse
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Register;
