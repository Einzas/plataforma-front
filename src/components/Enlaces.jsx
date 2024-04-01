const Enlaces = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center gap-5 place-content-center p-10  items-center">
      <article className="rounded-xl bg-gradient-to-b from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 hover:p-7 duration-300  hover:cursor-pointer text-white p-5 grid justify-center items-center content-center">
        <i className="bx bxs-videos"></i>
        Cursos
      </article>
      <article className="rounded-xl bg-gradient-to-b from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 hover:p-7 duration-300  hover:cursor-pointer text-white p-5 grid justify-center items-center content-center">
        <i className="bx bxs-chalkboard"></i> Maestros
      </article>
      <article className="rounded-xl bg-gradient-to-b from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 hover:p-7 duration-300  hover:cursor-pointer text-white p-5 grid justify-center items-center content-center">
        <i className="bx bxs-briefcase-alt-2"></i> Especialidades
      </article>
      <article className="rounded-xl bg-gradient-to-b from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 hover:p-7 duration-300  hover:cursor-pointer text-white p-5 grid justify-center items-center content-center">
        <i className="bx bx-user"></i>
        Soporte
      </article>
    </section>
  );
};

export default Enlaces;
