import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/Login";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import PostLogin from "./pages/PostLogin";
import Filmes from "./pages/Filmes";
import Reservas from "./pages/Reservas";
import Contato from "./pages/Contato";
import Perfil from "./pages/Perfil";
import EscolherSessao from "./pages/EscolherSessao";
import ReservasProtected from "./components/ReservasProtected";
import { lightTheme, darkTheme } from "./theme/theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Verifica se há token no localStorage ao carregar
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    checkAuth();

    // Listener para mudanças no localStorage (entre abas)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogged(false);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Rotas de autenticação sem Layout */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/post-login" element={<PostLogin />} />

          {/* Rotas protegidas com Layout */}
          <Route
            path="/home"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <Home />
              </Layout>
            }
          />
          <Route
            path="/filmes"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <Filmes />
              </Layout>
            }
          />
          <Route
            path="/reservas"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <ReservasProtected isLogged={isLogged}>
                  <Reservas />
                </ReservasProtected>
              </Layout>
            }
          />
          <Route
            path="/contato"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <Contato />
              </Layout>
            }
          />
          <Route
            path="/perfil"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <Perfil />
              </Layout>
            }
          />
          <Route
            path="/escolher-sessao/:filmeId"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isLogged={isLogged}
                handleLogout={handleLogout}
              >
                <EscolherSessao />
              </Layout>
            }
          />

          {/* Redireciona raiz para welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
