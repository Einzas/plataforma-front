import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Categoria from "./pages/Categoria";

function App() {
  return (
    <>
      <section className="grid font-['Roboto'] bg-gray-200">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/categoria/:id"
            element={
              <>
                <Header />
                <Categoria />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
