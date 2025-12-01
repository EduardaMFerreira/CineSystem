import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";

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
import MinhasReservas from "./pages/MinhasReservas";
import Contato from "./pages/Contato";
import Perfil from "./pages/Perfil";
import ReservasProtected from "./components/ReservasProtected";
import AuthGuard from "./components/AuthGuard";
import { lightTheme, darkTheme } from "./theme/theme";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // ALERTA GLOBAL
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<"success" | "info" | "warning" | "error">("success");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function handleLogin() {
    setIsLogged(true);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          alertMsg={alertMsg}
          setAlertMsg={setAlertMsg}
          alertType={alertType}
          setAlertType={setAlertType}
          handleLogin={handleLogin}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Componente interno para usar useNavigate()
function AppRoutes({
  darkMode,
  toggleDarkMode,
  isLogged,
  setIsLogged,
  alertOpen,
  setAlertOpen,
  alertMsg,
  setAlertMsg,
  alertType,
  setAlertType,
  handleLogin,
}: any) {
  const navigate = useNavigate();

  // 🔥 LOGOUT COMPLETO — alerta + redirecionamento + pipoca
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogged(false);

    // ALERTA PERSONALIZADO
    setAlertMsg("Você saiu da sua conta Cinesystem! Até o próximo filme!");
    setAlertType("info");
    setAlertOpen(true);

    // REDIRECIONAMENTO
    navigate("/home");
  }

  return (
    <>
      <ScrollToTop />

      {/* ALERTA GLOBAL */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000} // mais tempo para leitura
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertType}
          sx={{ fontSize: "1rem", display: "flex", alignItems: "center" }}
          icon={<span style={{ fontSize: '1.5rem' }}>🍿</span>} // ícone de pipoca
        >
          {alertMsg}
        </Alert>
      </Snackbar>

      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/welcome"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <Welcome />
            </AuthGuard>
          }
        />
        <Route
          path="/login"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <Login onLogin={handleLogin} />
            </AuthGuard>
          }
        />
        <Route
          path="/register"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <Register />
            </AuthGuard>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <ForgotPassword />
            </AuthGuard>
          }
        />
        <Route
          path="/verify-code"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <VerifyCode />
            </AuthGuard>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthGuard requireAuth={false} redirectTo="/home">
              <ResetPassword />
            </AuthGuard>
          }
        />
        <Route
          path="/post-login"
          element={
            <AuthGuard requireAuth={true} redirectTo="/login">
              <PostLogin />
            </AuthGuard>
          }
        />

        {/* ROTAS COM LAYOUT */}
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
                <MinhasReservas />
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

        {/* Rota inicial */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/home" replace />
              : <Navigate to="/welcome" replace />
          }
        />
      </Routes>
    </>
  );
}
