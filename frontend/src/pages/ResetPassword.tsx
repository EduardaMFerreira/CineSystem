import { Box, Button, TextField, Typography, Container, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordRequest } from "../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state || {};
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!email || !token) {
      setErro("Dados inválidos. Por favor, solicite a recuperação novamente.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordRequest(email, token, senha);
      setSucesso(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Alert severity="success">
            Senha redefinida com sucesso! Redirecionando para o login...
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" fontWeight={700} color="primary.main" align="center">
          Redefinir Senha
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          Digite sua nova senha.
        </Typography>

        {erro && <Alert severity="error">{erro}</Alert>}

        <TextField
          label="Nova Senha"
          type="password"
          fullWidth
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <TextField
          label="Confirmar Nova Senha"
          type="password"
          fullWidth
          required
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </Button>

        <Box textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer" }}
          >
            Voltar para o login
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

