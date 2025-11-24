import { Box, Button, TextField, Typography, Container, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";

interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await loginRequest(email, senha);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        if (onLogin) onLogin();
        // Dispara evento para atualizar estado em outras partes da aplicação
        window.dispatchEvent(new Event("storage"));
        navigate("/post-login");
      } else {
        setErro("Resposta inválida do servidor");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.response) {
        // Erro com resposta do servidor
        setErro(error.response.data?.message || "Erro ao fazer login");
      } else if (error.request) {
        // Erro de rede (servidor não respondeu)
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        // Outro tipo de erro
        setErro(error.message || "Erro ao fazer login");
      }
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
          Login
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

        <TextField
          label="Senha"
          type="password"
          fullWidth
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Box textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{ cursor: "pointer" }}
          >
            Esqueceu a senha?
          </Link>
        </Box>

        <Box textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer" }}
          >
            Não tem uma conta? Criar conta
          </Link>
        </Box>
      </Box>
    </Container>
  );
}