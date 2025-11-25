import { Box, Container, Typography } from "@mui/material";
import PerfilHeader from "../components/Perfil/PerfilHeader";
import PerfilInfo from "../components/Perfil/PerfilInfo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

export default function Perfil() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
    if (!token) setShowLoginModal(true);
  }, []);

  const userMock = {
    nome: "Ana Luiza",
    email: "ana@example.com",
    senha: "123456",
  };

  const handleEditar = () => {
    setIsEditing(!isEditing);
  };

  if (!isLogged) {
    return (
      <LoginModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          navigate("/home");
        }}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          setIsLogged(true);
        }}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", gap: 4 }}>

        {/* Barra lateral */}
        <Box
          sx={{
            width: "10px",
            height: "120px",
            bgcolor: "#5A0C07",
            boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
          }}
        />

        {/* Conteúdo */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Meu Perfil
          </Typography>

          <PerfilHeader />

          <PerfilInfo
            initialData={userMock}
            isEditing={isEditing}
            onClick={handleEditar}
          />
        </Box>
      </Box>
    </Container>
  );
}
