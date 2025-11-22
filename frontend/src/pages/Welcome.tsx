import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        gap: 4,
      }}
    >
      <Typography variant="h3" fontWeight={700} color="primary.main" align="center">
        Bem-vindo ao CineSystem
      </Typography>

      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
        Sua experiência cinematográfica começa aqui!
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth="400px">
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ py: 1.5, backgroundColor: "primary.main" }}
          onClick={() => navigate("/login")}
        >
          Entrar
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          sx={{ py: 1.5, borderColor: "primary.main", color: "primary.main" }}
          onClick={() => navigate("/register")}
        >
          Criar Conta
        </Button>
      </Box>
    </Container>
  );
}

