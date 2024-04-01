const Indicador = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-24 lg:grid-cols-4">
        <div className="bg-sky-400 flex items-center justify-center gap-4 font-bold text-xl text-white">
          <span className="border border-white rounded-full px-2">1</span>
          <span>Bienvenido</span>
        </div>
        <div className="bg-red-400 flex items-center justify-center gap-4 font-bold text-xl text-white">
          <span className="border border-white rounded-full px-2">2</span>
          <span>Inscribete</span>
        </div>
        <div className="bg-teal-400 flex items-center justify-center gap-4 font-bold text-xl text-white">
          <span className="border border-white rounded-full px-2">3</span>
          <span>Capacitate</span>
        </div>
        <div className="bg-orange-400 flex items-center justify-center gap-4 font-bold text-xl text-white">
          <span className="border border-white rounded-full px-2">4</span>
          <span>Certificate</span>
        </div>
      </div>
    </>
  );
};

export default Indicador;
