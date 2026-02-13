import { Box, Button, TextField, Typography, Container, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyCodeRequest } from "../services/authService";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await verifyCodeRequest(email, codigo);
      navigate("/reset-password", { state: { email, token: response.token } });
    } catch (error: any) {
      setErro(error.response?.data?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
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
          Verificar Código
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          Digite o código de verificação enviado para seu email.
        </Typography>

        {erro && <Alert severity="error">{erro}</Alert>}

        <TextField
          label="Código de Verificação"
          type="text"
          fullWidth
          required
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          inputProps={{ maxLength: 6 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
        >
          {loading ? "Verificando..." : "Verificar"}
        </Button>

        <Box textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{ cursor: "pointer" }}
          >
            Reenviar código
          </Link>
        </Box>

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

