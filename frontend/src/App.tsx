import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/Login";
import Perfil from "./pages/perfil"; 
import MinhasReservas from "./pages/MinhasReservas"; // <-- ADICIONAR AQUI

import { lightTheme, darkTheme } from "./theme/theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isLogged={isLogged}
          handleLogout={handleLogout}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/perfil" element={<Perfil />} />

            {/* 👇 ADICIONAR ESSA LINHA */}
            <Route path="/reservas" element={<MinhasReservas />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
