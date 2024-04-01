import { useState } from "react";

const Buscar = () => {
  const [clickBuscar, setClickBuscar] = useState(false);

  return (
    <>
      <section className="relative w-[400px] mx-auto">
        <span
          className={`${
            clickBuscar ? "" : "absolute"
          } top-1/2 left-4 text-gray-600 -translate-y-1/2 z-10 duration-300`}
        >
          ¿Qué quieres aprender hoy?
        </span>
        <div className="relative duration-300 ">
          <input
            onClick={() => {
              if (!clickBuscar && document.activeElement !== document.body) {
                setClickBuscar(!clickBuscar);
              }
            }}
            onBlur={() => {
              if (clickBuscar && document.activeElement !== document.body) {
                setClickBuscar(!clickBuscar);
              }
            }}
            type="text"
            className="w-full py-2 px-4 rounded-lg bg-gray-100"
            placeholder={clickBuscar ? "Busca cualquier tema" : ""}
          />
          <button className="absolute right-0 top-0 mt-2 mr-2">
            <i className="bx bx-search-alt-2 text-green-500 text-2xl"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default Buscar;
