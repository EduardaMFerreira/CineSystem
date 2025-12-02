import {
  Box,
  TextField,
  useTheme,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

interface PerfilInfoProps {
  initialData: { nome: string; email: string };
  isEditing: boolean;
  onClick: () => void;
}

// 📌 DEFINIÇÃO DA URL BASE DA API
const API_BASE_URL = "https://cinesystem.onrender.com";

export default function PerfilInfo({
  initialData,
  isEditing,
  onClick,
}: PerfilInfoProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [nome, setNome] = useState(initialData.nome);
  const [email, setEmail] = useState(initialData.email);
  const [senha, setSenha] = useState("");

  // ALERTA
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const showAlert = (msg: string, type: "success" | "error") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  const salvarAlteracoes = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ CORREÇÃO AQUI: Usando API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          email,
          senha: senha.length > 0 ? senha : undefined,
        }),
      });

      if (!res.ok) {
        // Se a resposta não for OK (ex: 400, 401, 500), tenta logar o erro
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        console.error("Erro na API:", errorData);
        showAlert("Erro ao atualizar perfil!", "error");
        return;
      }

      showAlert("Perfil atualizado com sucesso!", "success");
      onClick();
    } catch (err) {
      console.error(err);
      showAlert("Erro ao atualizar perfil!", "error");
    }
  };

  const bgColor = isDark ? "#2F2F2F" : "#FFFFFF";
  const borderColor = isDark ? "#555" : "#CFCFCF";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1150px",
        border: `1px solid ${borderColor}`,
        p: { xs: 2, md: 4 },
        mb: 3,
        backgroundColor: bgColor,
        borderRadius: "8px",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={{ xs: 4, md: 6 }}
        alignItems="center"
      >
        {/* Nome */}
        <TextField
          label="Nome"
          value={nome}
          disabled={!isEditing}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />

        {/* Email */}
        <TextField
          label="E-mail"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        {/* Senha */}
        <TextField
          label="Senha"
          type="password"
          value={senha}
          disabled={!isEditing}
          onChange={(e) => setSenha(e.target.value)}
          fullWidth
        />

        {/* Botão */}
        {isEditing ? (
          <Button
            variant="contained"
            color="success"
            sx={{ height: "56px" }}
            onClick={salvarAlteracoes}
            fullWidth
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: "56px",
              background: "#5A0C07",
              "&:hover": { background: "#4a0a06" },
            }}
            onClick={onClick}
          >
            Editar
          </Button>
        )}
      </Box>

      {/* ALERTA */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertType}
          sx={{ fontSize: "1rem" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}