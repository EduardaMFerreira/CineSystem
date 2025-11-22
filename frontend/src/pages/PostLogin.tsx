import { Box, Typography, Container, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PostLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "success.main" }} />
        <Typography variant="h4" fontWeight={700} color="primary.main" align="center">
          Login realizado com sucesso!
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          Redirecionando para a página inicial...
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          sx={{ mt: 2, backgroundColor: "primary.main" }}
        >
          Ir para página inicial
        </Button>
      </Box>
    </Container>
  );
}

