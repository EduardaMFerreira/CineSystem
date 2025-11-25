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

      <Button
        variant="contained"
        size="large"
        sx={{ py: 1.5, px: 4, backgroundColor: "primary.main" }}
        onClick={() => navigate("/home")}
      >
        Explorar Filmes
      </Button>
    </Container>
  );
}

