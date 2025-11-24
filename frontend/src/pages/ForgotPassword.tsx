import { Box, Button, TextField, Typography, Container, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await forgotPasswordRequest(email);
      setSucesso(true);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao solicitar recuperação de senha");
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
            Um código de verificação foi enviado para seu email!
          </Alert>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/verify-code", { state: { email } })}
            sx={{ py: 1.5, backgroundColor: "primary.main" }}
          >
            Continuar
          </Button>
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
          Esqueceu a Senha?
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          Digite seu email e enviaremos um código de verificação para redefinir sua senha.
        </Typography>

        {erro && <Alert severity="error">{erro}</Alert>}

        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
        >
          {loading ? "Enviando..." : "Enviar Código"}
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

