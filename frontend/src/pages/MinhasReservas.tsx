import { Box, Typography } from "@mui/material";
import { useState } from "react";
import TicketReserva from "../components/Ticket/TicketReserva";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([
    {
      id: "1",
      filme: "Duna Parte 2",
      sala: "4",
      horario: "19:30",
      data: "21/11/25",
    },
    {
      id: "2",
      filme: "Divertida Mente 2",
      sala: "2",
      horario: "15:10",
      data: "22/11/25",
    },
  ]);

  // 🔥 Função que deleta
  function handleDelete(id: string) {
    setReservas((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", display: "flex", gap: 2 }}>
      
      {/* Retângulo vertical à direita */}
      <Box
        sx={{
          width: "10px",
          height: "120px",
          bgcolor: "#5A0C07",
          boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
        }}
      />

      {/* ---------- CONTEÚDO PRINCIPAL ---------- */}
      <Box sx={{ flex: 1, p: 1 }}>
        
        {/* TÍTULO */}
        <Box mb={7} mt={4.1} ml={2}>
          <Typography variant="h4" fontWeight={600}>
            MINHAS RESERVAS
          </Typography>
        </Box>

        {/* LISTA DE TICKETS */}
        <Box display="flex" gap={3} flexWrap="wrap">
          {reservas.map((r) => (
            <TicketReserva
              key={r.id}
              {...r}
              onDelete={() => handleDelete(r.id)} // 🔥 passa função pro filho
            />
          ))}
        </Box>

      </Box>

    </Box>
  );
}
