import { Box, Button, TextField, Typography, Link, Alert } from "@mui/material";
import { useState } from "react";
import { loginRequest } from "../services/authService";

interface LoginFormProps {
  onLogin?: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginForm({
  onLogin,
  onSwitchToRegister,
  onForgotPassword,
}: LoginFormProps) {
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
      } else {
        setErro("Resposta inválida do servidor");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.response) {
        setErro(error.response.data?.message || "Erro ao fazer login");
      } else if (error.request) {
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setErro(error.message || "Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {erro && <Alert severity="error">{erro}</Alert>}

      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        autoComplete="email"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        required
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        disabled={loading}
        autoComplete="current-password"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      <Box textAlign="right">
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            if (onForgotPassword) onForgotPassword();
          }}
          sx={{
            cursor: "pointer",
            color: "primary.main",
            fontWeight: 500,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Esqueceu a senha?
        </Link>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={{
          py: 1.5,
          backgroundColor: "primary.main",
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      <Box textAlign="center" sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary" component="span">
          Não tem uma conta?{" "}
        </Typography>
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            if (onSwitchToRegister) onSwitchToRegister();
          }}
          sx={{
            cursor: "pointer",
            color: "primary.main",
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Criar conta
        </Link>
      </Box>
    </Box>
  );
}

