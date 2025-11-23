import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketImg2 from "../../assets/Ticket Vazio.svg";

interface TicketProps {
  id: string;
  filme: string;
  sala: string;
  horario: string;
  data: string;
  onDelete?: () => void;
}

export default function TicketReserva({
  id,
  filme,
  sala,
  horario,
  data,
  onDelete,
}: TicketProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        height: 180,
        mb: 3,
      }}
    >
      {/* imagem base */}
      <img
        src={TicketImg2}
        alt="Ticket"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Nome do filme */}
      <Box sx={{ position: "absolute", top: 43, left: 45, color: "white" }}>
        <Typography fontWeight="bold" fontSize={16}>
          {filme}
        </Typography>
      </Box>

      {/* Sala */}
      <Box sx={{ position: "absolute", top: 64, left: 100, color: "white" }}>
        <Typography fontSize={14}> {sala}</Typography>
      </Box>

      {/* Data */}
      <Box sx={{ position: "absolute", top: 109, left: 82, color: "white" }}>
        <Typography fontSize={13}> {data}</Typography>
      </Box>

      {/* Horário */}
      <Box sx={{ position: "absolute", top: 86, left: 98, color: "white" }}>
        <Typography fontSize={14}> {horario}</Typography>
      </Box>

      {/* Botão de deletar */}
      <IconButton
        onClick={onDelete}
        sx={{
          position: "absolute",
          top: 100,
          right: 30,
          color: "white",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
