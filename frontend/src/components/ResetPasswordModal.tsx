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
import { resetPasswordRequest } from "../services/authService";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  token: string;
  onSuccess: () => void;
}

export default function ResetPasswordModal({
  open,
  onClose,
  email,
  token,
  onSuccess,
}: ResetPasswordModalProps) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordRequest(email, token, senha);
      setSucesso(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
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
          <IconButton onClick={onClose} size="small" sx={{ ml: -1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Redefinir Senha
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        {sucesso ? (
          <Alert severity="success">
            Senha redefinida com sucesso! Você pode fazer login agora.
          </Alert>
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
              Digite sua nova senha.
            </Typography>

            {erro && <Alert severity="error">{erro}</Alert>}

            <TextField
              label="Nova Senha"
              type="password"
              fullWidth
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
              helperText="Mínimo de 6 caracteres"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Confirmar Nova Senha"
              type="password"
              fullWidth
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
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
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

