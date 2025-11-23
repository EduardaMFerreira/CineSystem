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
import { verifyCodeRequest } from "../services/authService";

interface VerifyCodeModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  email: string;
  onSuccess: (token: string) => void;
}

export default function VerifyCodeModal({
  open,
  onClose,
  onBack,
  email,
  onSuccess,
}: VerifyCodeModalProps) {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await verifyCodeRequest(email, codigo);
      onSuccess(response.token);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Código inválido");
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
          <IconButton onClick={onBack} size="small" sx={{ ml: -1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Verificar Código
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
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
            Digite o código de verificação enviado para seu email.
          </Typography>

          {erro && <Alert severity="error">{erro}</Alert>}

          <TextField
            label="Código de Verificação"
            type="text"
            fullWidth
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))}
            disabled={loading}
            inputProps={{ maxLength: 6 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            placeholder="000000"
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
            {loading ? "Verificando..." : "Verificar"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

