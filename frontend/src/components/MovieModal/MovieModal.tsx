import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Paper,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Ticket from '../../assets/ticket.svg';

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MovieModal({ open, onClose }: MovieModalProps) {
  // estados para seleção
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [salaSelecionada, setSalaSelecionada] = useState<string | null>(null);

  const horarios = ['14:30', '16:00', '18:20', '21:00'];
  const salas = ['Sala 01', 'Sala 02', 'Sala 03'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Título + X */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'bold'
        }}
      >
        Detalhes do Filme
        <IconButton onClick={onClose} size="small" >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>

        {/* --- TICKET NO TOPO --- */}
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            src={Ticket}
            alt="Ticket"
            style={{ width: 400, height: 'auto' }}
          />
        </Box>

        {/* --- RETÂNGULO COM BORDA VERMELHA --- */}
        <Box
          sx={{
            border: '2px solid rgba(126, 0, 0, 1)',
            borderRadius: 2,
            p: 3,
            mt: 1
          }}
        >
          {/* --- COLUNAS DENTRO DO RETÂNGULO --- */}
          <Box
            display="flex"
            gap={3}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {/* Horários */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
                border: '2px solid rgba(126, 0, 0, 1)'
              }}
            >
             <Typography variant="h6" mb={1} sx={{ fontWeight: 'bold' }}>
                Horários Disponíveis
             </Typography>



              <Box display="flex" flexDirection="column" gap={1}>
                {horarios.map((hora) => (
                  <Button
                    key={hora}
                    variant="outlined"
                    onClick={() => setHorarioSelecionado(hora)}
                    sx={{
                      borderRadius: 2,
                      paddingY: 1,
                      textTransform: 'none',
                      fontSize: '16px',
                      borderColor:
                        horarioSelecionado === hora
                          ? 'rgba(126, 0, 0, 1)'
                          : 'rgba(126, 0, 0, 1)',
                      backgroundColor:
                        horarioSelecionado === hora ? 'rgba(126, 0, 0, 0.35)' : 'transparent',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: 'rgba(126, 0, 0, 0.3)'
                      }
                    }}
                  >
                    {hora}
                  </Button>
                ))}
              </Box>
            </Paper>

            {/* Salas */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
                border: '2px solid rgba(126, 0, 0, 1)'
              }}
            >
              <Typography variant="h6" mb={1} sx={{ fontWeight: 'bold' }}>
                Salas
              </Typography>

              <Box display="flex" flexDirection="column" gap={1}>
                {salas.map((sala) => (
                  <Button
                    key={sala}
                    variant="outlined"
                    onClick={() => setSalaSelecionada(sala)}
                    sx={{
                      borderRadius: 2,
                      paddingY: 1,
                      textTransform: 'none',
                      fontSize: '16px',
                      borderColor:
                        salaSelecionada === sala
                          ? 'rgba(126, 0, 0, 1)'
                          : 'rgba(126, 0, 0, 1)',
                      backgroundColor:
                        salaSelecionada === sala ? 'rgba(126, 0, 0, 0.35)' : 'transparent',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: 'rgba(126, 0, 0, 0.3)'
                      }
                    }}
                  >
                    {sala}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>
      </DialogContent>

      {/* --- BOTÃO RESERVAR --- */}
      <DialogActions sx={{ justifyContent: 'flex-end', p: 2}}>
        <Button
            variant="contained"
            color="primary"
            disabled={!horarioSelecionado || !salaSelecionada}
            onClick={() => (window.location.href = '/reservas')}
            sx={{
              px: 4,
              py: 1.6,
              fontSize: '15px',
              fontWeight: 'bold',
              borderRadius: 2
            }}
          >
            Reservar
       </Button>
      </DialogActions>
    </Dialog>
  );
}
