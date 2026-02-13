import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import TicketReserva from "../components/Ticket/TicketReserva";
import { listarReservas, deletarReserva } from "../services/reservaService";

interface Reserva {
  id: number;
  sessao: {
    filme: { titulo: string };
    sala: { nome: string };
    horario: string;
  };
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarReservas();
        const parsed = data.map((r: any) => ({
          ...r,
          id: Number(r.id),
        }));
        setReservas(parsed);
      } catch (err) {
        console.error("Erro ao listar reservas:", err);
      }
    }
    carregar();
  }, []);

  async function handleDelete(id: number) {
    try {
      console.log("Deletando reserva:", id);

      const resultado = await deletarReserva(id);
      console.log("Backend:", resultado);

      setReservas(prev => prev.filter(r => r.id !== id));
      setSnackbar({
        open: true,
        message: "Reserva cancelada com sucesso",
        severity: "success",
      });
    } catch (err: any) {
      console.error("Erro ao deletar reserva:", err.response?.data || err);
      setSnackbar({
        open: true,
        message: "Erro ao cancelar reserva",
        severity: "error",
      });
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", display: "flex", gap: 2 }}>
      <Box sx={{ width: "10px", height: "120px", bgcolor: "#5A0C07" }} />

      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={600} sx={{ mb: 7, mt: 4 }}>
          MINHAS RESERVAS
        </Typography>

        <Box display="flex" gap={3} flexWrap="wrap">
          {reservas.map(r => (
            <TicketReserva
              key={r.id}
              id={r.id}
              filme={r.sessao.filme.titulo}
              sala={r.sessao.sala.nome.replace(/\D+/g, "")}
              horario={new Date(r.sessao.horario).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              data={new Date(r.sessao.horario).toLocaleDateString("pt-BR")}
              onDelete={() => handleDelete(r.id)}
            />
          ))}

          {reservas.length === 0 && <Typography>Nenhuma reserva encontrada.</Typography>}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
