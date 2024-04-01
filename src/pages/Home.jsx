import Buscar from "../components/Buscar";
import Categorias from "../components/Categorias";
import Enlaces from "../components/Enlaces";
import Indicador from "../components/Indicador";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <Indicador></Indicador>
      <Slider></Slider>
      <Enlaces></Enlaces>
      <Buscar></Buscar>
      <Categorias></Categorias>
    </>
  );
};

export default Home;
