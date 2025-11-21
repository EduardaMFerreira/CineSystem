import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  handleLogout: () => void;
  isLogged: boolean;
}

export default function Navbar({ darkMode, toggleDarkMode, handleLogout, isLogged }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "FILMES", path: "/filmes" },
    { label: "RESERVAS", path: "/reservas", requiresAuth: true },
    { label: "CONTATO", path: "/contato" },
    { label: "PERFIL", path: "/perfil", requiresAuth: true },
  ];

  // 🔥 Função para lidar com cliques protegidos
  const handleNavClick = (item: any) => {
    if (item.requiresAuth && !isLogged) {
      navigate("/login");
    } else {
      navigate(item.path);
    }
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#5A0C07",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          paddingY: 1,
          padding: "0.5rem 1rem",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LOGO */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#5A0C07",
              fontSize: "1.8rem",
            }}
          >
            CINESystem
          </Typography>

          {/* MENU DESKTOP */}
          {!isMobile && (
            <Stack direction="row" spacing={3} alignItems="center">
              {navItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Button
                    key={item.path}
                    onClick={() => handleNavClick(item)}
                    sx={{
                      color: active ? "#5A0C07" : "#555",
                      fontWeight: active ? "bold" : "normal",
                      fontSize: "1rem",
                      letterSpacing: 1.5,
                      position: "relative",
                      paddingBottom: "6px",
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: active ? "#5A0C07" : "#333",
                      },
                      "&::after": active
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "40%",
                            height: "3px",
                            borderRadius: "2px",
                            backgroundColor: "#5A0C07",
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          )}

          {/* ÍCONES + MOBILE */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={toggleDarkMode}
              sx={{
                color: "#5A0C07",
                backgroundColor: "#F2EDEC",
                "&:hover": { backgroundColor: "#E6D7D7" },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* SAIR só aparece se logado */}
            {isLogged && (
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "#5A0C07",
                  backgroundColor: "#F2EDEC",
                  "&:hover": { backgroundColor: "#E6D7D7" },
                }}
              >
                <LogoutIcon />
              </IconButton>
            )}

            {/* ÍCONE DO MENU HAMBÚRGUER (MOBILE) */}
            {isMobile && (
              <IconButton
                sx={{ color: "#5A0C07"}}
                onClick={() => setOpenDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                onClick={() => handleNavClick(item)}
                sx={{
                  justifyContent: "flex-start",
                  color: active ? "#5A0C07" : "#444",
                  fontWeight: active ? "bold" : "normal",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#5A0C07",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
}
