import { Box, Container } from "@mui/material";
import PerfilHeader from "../components/Perfil/PerfilHeader";
import PerfilInfo from "../components/Perfil/PerfilInfo";
import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState<{ nome: string; email: string; senha: string } | null>(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const API_BASE_URL = "https://cinesystem.onrender.com"; // <-- Nova URL Base

    fetch(`${API_BASE_URL}/users/me`, { // <-- Usando a nova URL
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados do usuário");
        return res.json();
      })
      .then((data) => {
        setUserData({ nome: data.nome, email: data.email, senha: "" }); // senha não vem da API
      })
      .catch((err) => {
        console.error(err);
        setShowLoginModal(true);
      });
}, []);

  const handleEditar = () => {
    setIsEditing(!isEditing);
  };

  if (!isLogged)
    return (
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    );

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
          <PerfilHeader />

          {userData && (
            <PerfilInfo
              initialData={userData}
              isEditing={isEditing}
              onClick={handleEditar}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
