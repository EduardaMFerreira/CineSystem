import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { forgotPasswordRequest } from "../services/authService";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onSuccess: (email: string) => void;
}

export default function ForgotPasswordModal({
  open,
  onClose,
  onBack,
  onSuccess,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await forgotPasswordRequest(email);
      setSucesso(true);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao solicitar recuperação de senha");
    } finally {
      setLoading(false);
    }
  }

  function handleContinuar() {
    onSuccess(email);
    setEmail("");
    setSucesso(false);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={onBack} size="small" sx={{ ml: -1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Esqueceu a Senha?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        {sucesso ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="success">
              Um código de verificação foi enviado para seu email!
            </Alert>
            <Button
              variant="contained"
              fullWidth
              onClick={handleContinuar}
              sx={{
                py: 1.5,
                backgroundColor: "primary.main",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Continuar
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Digite seu email e enviaremos um código de verificação para redefinir sua senha.
            </Typography>

            {erro && <Alert severity="error">{erro}</Alert>}

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

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
              {loading ? "Enviando..." : "Enviar Código"}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

