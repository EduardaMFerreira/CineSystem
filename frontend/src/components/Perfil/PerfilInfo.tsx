import { Box, TextField } from "@mui/material";
import { useState } from "react";
import EditarBotao from "./EditarBotao";

interface PerfilInfoProps {
  initialData?: { nome: string; email: string; senha: string };
  isEditing: boolean;
  onClick?: () => void; // alternar entre edição e salvar
}

export default function PerfilInfo({
  initialData,
  isEditing,
  onClick,
}: PerfilInfoProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [senha, setSenha] = useState(initialData?.senha || "");

  return (
    <Box
      sx={{
        width: "1150px",
        height: "378px",
        border: "1px solid #CFCFCF",
        borderRadius: "0px",
        p: 4,
        mb: 3,
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ml: -5,
      }}
    >
      {/* GRID de 2 colunas */}
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={9}
        alignItems="center"
      >
        {/* Nome */}
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={!isEditing}
        />

        {/* Email */}
        <TextField
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />

        {/* Senha */}
        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={!isEditing}
        />

        {/* Botão funcional */}
        <EditarBotao isEditing={isEditing} onClick={onClick} />
      </Box>
    </Box>
  );
}
