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
    { label: "HOME", path: "/home" },
    { label: "FILMES", path: "/filmes" },
    { label: "RESERVAS", path: "/reservas", requiresAuth: true },
    { label: "CONTATO", path: "/contato" },
    { label: "PERFIL", path: "/perfil", requiresAuth: true },
  ];

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
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          px: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              color: (theme) => theme.palette.primary.main,
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
                      color: active
                        ? (theme) => theme.palette.primary.main
                        : (theme) => theme.palette.text.secondary,
                      fontWeight: active ? "bold" : "semi-bold",
                      fontSize: "0.8rem",
                      letterSpacing: 1.5,
                      position: "relative",
                      pb: "6px",
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: active
                          ? (theme) => theme.palette.primary.main
                          : (theme) => theme.palette.text.primary,
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
                            backgroundColor: (theme) => theme.palette.primary.main,
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
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={toggleDarkMode}
              sx={{
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) => theme.palette.secondary.main,
                "&:hover": { backgroundColor: (theme) => theme.palette.secondary.dark },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {isLogged && (
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  "&:hover": { backgroundColor: (theme) => theme.palette.secondary.dark },
                }}
              >
                <LogoutIcon />
              </IconButton>
            )}

            {isMobile && (
              <IconButton
                sx={{ color: (theme) => theme.palette.text.primary }}
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
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
            minHeight: "100%",
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
                  color: active
                    ? (theme) => theme.palette.primary.main
                    : (theme) => theme.palette.text.primary,
                  fontWeight: active ? "bold" : "normal",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: (theme) => theme.palette.primary.main,
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
