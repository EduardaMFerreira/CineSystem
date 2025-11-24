import { Box, Button, Typography, Container, Alert, Paper, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listarSessoesPorFilme, getSessao } from "../services/sessaoService";
import { listarFilmes } from "../services/filmeService";
import { criarReserva } from "../services/reservaService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LockIcon from "@mui/icons-material/Lock";
import LoginModal from "../components/LoginModal";

export default function EscolherSessao() {
  const { filmeId } = useParams<{ filmeId: string }>();
  const navigate = useNavigate();
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [filme, setFilme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState<number | null>(null);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Verifica se está autenticado ao carregar a página
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const logged = !!token;
      setIsLogged(logged);
    };
    
    checkAuth();
    
    // Listener para mudanças no localStorage
    window.addEventListener("storage", checkAuth);
    
    // Verifica periodicamente (para mudanças na mesma aba)
    const interval = setInterval(checkAuth, 500);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    async function carregar() {
      // Só carrega as sessões se estiver autenticado
      if (!isLogged) {
        setLoading(false);
        return;
      }

      try {
        if (filmeId) {
          const [sessoesData, filmesData] = await Promise.all([
            listarSessoesPorFilme(parseInt(filmeId)),
            listarFilmes(),
          ]);
          setSessoes(sessoesData);
          const filmeEncontrado = filmesData.find((f: any) => f.id === parseInt(filmeId));
          setFilme(filmeEncontrado);
        }
      } catch (error: any) {
        setErro("Erro ao carregar sessões");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [filmeId, isLogged]);

  async function handleReservar(sessaoId: number) {
    const token = localStorage.getItem("token");
    if (!token) {
      setSessaoSelecionada(sessaoId);
      setShowLoginModal(true);
      return;
    }

    try {
      await criarReserva(sessaoId, []);
      navigate("/reservas");
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao criar reserva");
    }
  }

  function formatarData(data: string) {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Se não estiver autenticado, mostra a tela de acesso restrito
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
          Quase lá! Entre na sua conta para continuar
          </Typography>
          
          <Alert severity="info" sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Entre ou cadastre-se </strong>
            </Typography>
            <Typography variant="body2">
              para visualizar e reservar sessões.
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  if (!filme) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Filme não encontrado</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          {filme.titulo}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gênero: {filme.genero} | Duração: {filme.duracao} min
        </Typography>
      </Box>

      {erro && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErro("")}>
          {erro}
        </Alert>
      )}

      <Typography variant="h5" fontWeight={600} mb={3}>
        Sessões Disponíveis
      </Typography>

      {sessoes.length === 0 ? (
        <Alert severity="info">Nenhuma sessão disponível para este filme.</Alert>
      ) : (
        <Grid container spacing={3}>
          {sessoes.map((sessao) => (
            <Grid item xs={12} sm={6} md={4} key={sessao.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="body1" fontWeight={600}>
                    {formatarData(sessao.horario)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <ConfirmationNumberIcon color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    Sala: {sessao.sala?.nome || "N/A"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleReservar(sessao.id)}
                  sx={{ mt: 1, backgroundColor: "primary.main" }}
                >
                  Reservar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <LoginModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setSessaoSelecionada(null);
        }}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          if (sessaoSelecionada) {
            handleReservar(sessaoSelecionada);
          }
        }}
      />
    </Container>
  );
}

