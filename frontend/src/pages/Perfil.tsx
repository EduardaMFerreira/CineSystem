import { Box, Button, Typography, Container, Paper, Alert } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import LoginModal from "../components/LoginModal";

export default function Perfil() {
  const isLogged = !!localStorage.getItem("token");
  const [showLoginModal, setShowLoginModal] = useState(false);

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
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            window.location.reload(); // Recarrega para mostrar o perfil
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
