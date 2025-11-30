import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import TicketReserva from "../components/Ticket/TicketReserva";
import { listarReservas, deletarReserva } from "../services/reservaService";

interface Reserva {
  id: number;
  sessao: {
    filme: {
      titulo: string;
    };
    sala: {
      nome: string;
    };
    horario: string;
  };
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Buscar reservas do usuário
  useEffect(() => {
    async function carregarReservas() {
      try {
        const data = await listarReservas();
        const reservasNumeros = data.map((r: any) => ({
          ...r,
          id: Number(r.id),
        }));
        setReservas(reservasNumeros);
      } catch (err) {
        console.error("Erro ao listar reservas:", err);
      }
    }
    carregarReservas();
  }, []);

  // Deletar reserva
  async function handleDelete(reservaId: number) {
    try {
      console.log("Tentando deletar reserva ID:", reservaId);
      const resultado = await deletarReserva(reservaId);
      console.log("Resposta do backend:", resultado);

      setReservas(prev => prev.filter(r => r.id !== reservaId));
      setSnackbar({ open: true, message: "Reserva cancelada com sucesso", severity: "success" });
    } catch (err: any) {
      console.error("Erro ao deletar reserva:", err.response?.data || err.message);
      setSnackbar({ open: true, message: "Erro ao cancelar reserva", severity: "error" });
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", display: "flex", gap: 2 }}>
      {/* Barra vertical */}
      <Box sx={{ width: "10px", height: "120px", bgcolor: "#5A0C07", boxShadow: "0px 0px 8px rgba(0,0,0,0.15)" }} />

      {/* Conteúdo */}
      <Box sx={{ flex: 1, p: 1 }}>
        <Box mb={7} mt={4.1} ml={2}>
          <Typography variant="h4" fontWeight={600}>
            MINHAS RESERVAS
          </Typography>
        </Box>

        <Box display="flex" gap={3} flexWrap="wrap">
          {reservas.map(r => (
            <TicketReserva
              key={r.id}
              id={r.id}
              filme={r.sessao.filme.titulo}
              sala={r.sessao.sala.nome.replace(/\D+/g, "")} 
              horario={new Date(r.sessao.horario).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              data={new Date(r.sessao.horario).toLocaleDateString("pt-BR")}
              onDelete={() => handleDelete(r.id)}
            />
          ))}

          {reservas.length === 0 && (
            <Typography>Nenhuma reserva encontrada.</Typography>
          )}
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
