import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Typography, Box, Paper, Button, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Ticket from '../../assets/ticket.svg';
import { listarSessoesPorFilme } from '../../services/sessaoService';
import { criarReserva } from '../../services/reservaService';

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  filme: any | null;
  token: string;
}

export default function MovieModal({ open, onClose, filme, token }: MovieModalProps) {
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [salaSelecionada, setSalaSelecionada] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Buscar sessões ao abrir
  useEffect(() => {
    if (!filme) return;

    async function buscar() {
      setLoading(true);
      try {
        const data = await listarSessoesPorFilme(filme.id);
        setSessoes(data);
      } catch (err) {
        console.error("Erro ao carregar sessões:", err);
        setSnackbarMessage("Erro ao carregar sessões");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
      setLoading(false);
    }

    buscar();
  }, [filme]);

  // Função para criar reserva
  async function handleReserva() {
    if (!horarioSelecionado) return;

    try {
      // encontra a sessão selecionada pelo horário + data
      const sessao = sessoes.find((s) => {
        const sHorario = new Date(s.horario).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        const sData = new Date(s.horario).toLocaleDateString("pt-BR");
        return sHorario === horarioSelecionado && sData === dataSelecionada;
      });

      if (!sessao) {
        setSnackbarMessage("Selecione uma sessão válida");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await criarReserva(sessao.id, token);

      setSnackbarMessage("Reserva criada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // redirecionar após 1.5s para mostrar snackbar
      setTimeout(() => {
        window.location.href = "/reservas";
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setSnackbarMessage(err.response?.data?.message || "Erro ao criar reserva");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { background: "#f7f7f7", borderRadius: 3 } }}
      >
        {/* TÍTULO */}
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold", fontFamily: "Red hat Text, sans-serif" }}>
          {filme?.titulo ?? "Carregando..."}
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ background: "#fafafa" }}>
          <Box display="flex" justifyContent="center" mb={2} sx={{ position: "relative" }}>
            <img src={Ticket} alt="Ticket" style={{ width: 390 }} />

            {horarioSelecionado && (
              <>
                <Box sx={{ position: "absolute", top: "10%", left: "37%", transform: "translateX(-50%)", textAlign: "center", color: "#ffffffff", fontWeight: "bold", fontFamily: "Red hat Text, sans-serif", fontSize: 20 }}>
                  {filme?.titulo}
                </Box>
                <Box sx={{ position: "absolute", top: "28%", left: "42%", color: "#ffffffff", fontSize: 18 }}>
                  <strong>{salaSelecionada}</strong>
                </Box>
                <Box sx={{ position: "absolute", top: "50%", left: "41%", color: "#ffffffff", fontSize: 14 }}>
                  <strong>{horarioSelecionado}</strong>
                </Box>
                <Box sx={{ position: "absolute", top: "71%", left: "39%", color: "#ffffffff", fontSize: 11 }}>
                  <strong>{dataSelecionada}</strong>
                </Box>
              </>
            )}
          </Box>

          {loading && <Typography>Carregando sessões...</Typography>}

          {!loading && sessoes.length === 0 && <Typography>Nenhuma sessão disponível.</Typography>}

          {!loading && sessoes.length > 0 && (
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} sx={{ mt: 2 }}>
              {sessoes.map((sessao: any) => {
                const horario = new Date(sessao.horario).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                const data = new Date(sessao.horario).toLocaleDateString("pt-BR");
                const selecionado = horarioSelecionado === horario;
                const numeroSala = sessao.sala?.nome?.replace(/\D+/g, "") || "?";

                return (
                  <Paper key={sessao.id} elevation={3} onClick={() => { setHorarioSelecionado(horario); setSalaSelecionada(numeroSala); setDataSelecionada(data); }}
                    sx={{
                      p: 1.5, cursor: "pointer", borderRadius: 3, minHeight: 120,
                      border: selecionado ? "3px solid rgba(126,0,0,1)" : "2px solid rgba(126,0,0,0.7)",
                      background: selecionado ? "rgba(126,0,0,0.15)" : "#fff7ef",
                      transition: "0.2s", "&:hover": { transform: "scale(1.03)", background: "rgba(126,0,0,0.05)" },
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0.3
                    }}>
                    <Typography sx={{ fontSize: 12, opacity: 0.7 }}>Data</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{data}</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.7 }}>Horário</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{horario}</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.7 }}>Sala</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{numeroSala}</Typography>
                  </Paper>
                );
              })}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            disabled={!horarioSelecionado}
            onClick={handleReserva} // 🔥 função de reserva
            sx={{
              backgroundColor: "rgba(126,0,0,1)",
              "&:hover": { backgroundColor: "rgba(100,0,0,1)" },
              padding: "16px 40px",
              fontSize: "1rem",
              fontFamily: "Red hat Text, sans-serif",
            }}
          >
            Reservar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
