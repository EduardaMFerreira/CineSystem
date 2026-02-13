import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({
  children,
  darkMode,
  toggleDarkMode,
  isLogged,
  handleLogout,
}: {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLogged: boolean;
  handleLogout: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1C1C1C" : "#F7F7F7",
      }}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLogged={isLogged}
        handleLogout={handleLogout}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
