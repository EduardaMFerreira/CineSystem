import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/Login";
import { lightTheme, darkTheme } from "./theme/theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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
      <CssBaseline /> {/* Aplica cores do tema globalmente */}
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
