import { Box } from "@mui/material";
import PerfilHeader from "../components/Perfil/PerfilHeader";
import PerfilInfo from "../components/Perfil/PerfilInfo";
import { useState } from "react";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);

  const userMock = {
    nome: "Ana Luiza",
    email: "ana@example.com",
    senha: "123456",
  };

  const handleEditar = () => {
    setIsEditing(!isEditing);
    console.log("Modo edição:", !isEditing);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", display: "flex", gap: 4 }}>
      
      {/* Retângulo vertical à direita */}
      <Box
        sx={{
          width: "10px",
          height: "120px",
          bgcolor: "#5A0C07",
          boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
        }}
      />

      {/* Área principal */}
      <Box sx={{ flex: 1 }}>
        <PerfilHeader />
        
        {/* AGORA O BOTÃO DE DENTRO FUNCIONA */}
        <PerfilInfo 
          initialData={userMock} 
          isEditing={isEditing} 
          onClick={handleEditar} 
        />

        {/* BOTÃO FORA REMOVIDO */}
      </Box>
    </Box>
  );
}
