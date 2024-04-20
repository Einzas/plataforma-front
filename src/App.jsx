import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Categoria from "./pages/Categoria";
import Dashboard from "./pages/sysadmin/Dashboard";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import Usuarios from "./pages/sysadmin/Usuarios";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const tk = localStorage.getItem("userInfo");
    let token;

    if (tk) {
      token = JSON.parse(tk).token;
      if (!token || isExpired(token)) {
        localStorage.removeItem("userInfo");
        navigate("/home");
      } else if (!window.location.pathname.startsWith("/sysadmin/")) {
        navigate("/sysadmin/");
      }
    } else if (window.location.pathname.startsWith("/sysadmin/")) {
      navigate("/home");
    }
  }, [navigate]);

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
            path="/registro"
            element={
              <>
                <Register />
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

          <Route
            path="/sysadmin"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="/sysadmin/usuarios"
            element={
              <>
                <Usuarios />
              </>
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
