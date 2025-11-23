import { Box, Typography, Container, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { ReactNode } from "react";

interface ReservasProtectedProps {
  children: ReactNode;
  isLogged: boolean;
}

export default function ReservasProtected({ children, isLogged }: ReservasProtectedProps) {
  const navigate = useNavigate();

  if (!isLogged) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
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
          <LockIcon sx={{ fontSize: 80, color: "warning.main" }} />
          <Typography variant="h4" fontWeight={700} color="primary.main" align="center">
            Acesso Restrito
          </Typography>
          
          <Alert severity="info" sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Você precisa estar autenticado para acessar esta página.</strong>
            </Typography>
            <Typography variant="body2">
              Crie uma conta ou faça login para visualizar e gerenciar suas reservas.
            </Typography>
          </Alert>

          <Box display="flex" gap={2} width="100%" maxWidth="400px" mt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{ py: 1.5, backgroundColor: "primary.main" }}
            >
              Criar Conta
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{ py: 1.5, borderColor: "primary.main", color: "primary.main" }}
            >
              Fazer Login
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return <>{children}</>;
}





