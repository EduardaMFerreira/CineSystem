import { Box, Button, TextField, Typography, Container, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    // Validações
    if (!nome.trim()) {
      setErro("O nome é obrigatório");
      return;
    }

    if (!email.trim()) {
      setErro("O email é obrigatório");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErro("Email inválido");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      const data = await registerRequest(nome.trim(), email.trim(), senha);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/post-login");
      } else {
        setErro("Resposta inválida do servidor");
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      if (error.response) {
        setErro(error.response.data?.message || "Erro ao criar conta");
      } else if (error.request) {
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setErro(error.message || "Erro ao criar conta");
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
          Criar Conta
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          Preencha os dados abaixo para criar sua conta
        </Typography>

        {erro && <Alert severity="error">{erro}</Alert>}

        <TextField
          label="Nome completo"
          type="text"
          fullWidth
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
          autoComplete="name"
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
          helperText="Mínimo de 6 caracteres"
        />

        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          required
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </Button>

        <Box textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer" }}
            disabled={loading}
          >
            Já tem uma conta? Entrar
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

