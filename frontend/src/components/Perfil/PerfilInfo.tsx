import { Box, TextField, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [nome, setNome] = useState(initialData?.nome || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [senha, setSenha] = useState(initialData?.senha || "");

  const bgColor = isDark ? "#2F2F2F" : "#FFFFFF";
  const borderColor = isDark ? "#555555" : "#CFCFCF";
  const textColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <Box
      sx={{
        width: "1150px",
        height: "378px",
        border: `1px solid ${borderColor}`,
        borderRadius: "0px",
        p: 4,
        mb: 3,
        backgroundColor: bgColor,
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
          sx={{
            input: { color: textColor },
            "& .MuiInputLabel-root": { color: textColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: borderColor },
              "&:hover fieldset": { borderColor: borderColor },
              "&.Mui-focused fieldset": { borderColor: borderColor },
            },
          }}
        />

        {/* Email */}
        <TextField
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
          sx={{
            input: { color: textColor },
            "& .MuiInputLabel-root": { color: textColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: borderColor },
              "&:hover fieldset": { borderColor: borderColor },
              "&.Mui-focused fieldset": { borderColor: borderColor },
            },
          }}
        />

        {/* Senha */}
        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={!isEditing}
          sx={{
            input: { color: textColor },
            "& .MuiInputLabel-root": { color: textColor },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: borderColor },
              "&:hover fieldset": { borderColor: borderColor },
              "&.Mui-focused fieldset": { borderColor: borderColor },
            },
          }}
        />

        {/* Botão funcional */}
        <EditarBotao isEditing={isEditing} onClick={onClick} />
      </Box>
    </Box>
  );
}
