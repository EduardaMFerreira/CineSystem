import { Box, Button, Typography, Container, Paper, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LoginModal from "../components/LoginModal";

export default function Perfil() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  if (!isLogged) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Você precisa estar autenticado para acessar seu perfil.</strong>
            </Typography>
            <Typography variant="body2">
              Faça login ou crie uma conta para visualizar e editar suas informações.
            </Typography>
          </Alert>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setShowLoginModal(true)}
            sx={{ backgroundColor: "primary.main" }}
          >
            Fazer Login ou Criar Conta
          </Button>
        </Paper>

        <LoginModal
          open={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            // Se fechar sem login, redireciona para home
            if (!localStorage.getItem("token")) {
              navigate("/home");
            }
          }}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            setIsLogged(true);
            // Não precisa recarregar, o estado já foi atualizado
          }}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
        Meu Perfil
      </Typography>

      <Paper sx={{ p: 4, mt: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Informações Pessoais</Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setShowLoginModal(true)}
            sx={{ borderColor: "primary.main", color: "primary.main" }}
          >
            Editar
          </Button>
        </Box>

        <Typography variant="body1" color="text.secondary">
          Aqui você pode visualizar e editar suas informações pessoais.
        </Typography>
      </Paper>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          // Aqui você pode adicionar lógica para editar perfil
        }}
      />
    </Container>
  );
}
