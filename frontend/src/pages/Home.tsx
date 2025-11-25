import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useEffect, useRef, useState } from "react";
import { listarFilmes } from "../services/filmeService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [filmes, setFilmes] = useState<any[]>([]);
  const [podeDeslizar, setPodeDeslizar] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();

  const carrosselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarFilmes();
        setFilmes(data.slice(0, 4));
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    if (carrosselRef.current) {
      const precisa =
        carrosselRef.current.scrollWidth > carrosselRef.current.clientWidth;
      setPodeDeslizar(precisa);
    }
  }, [filmes]);

  const cardBg = theme.palette.mode === "dark" ? "#2F2F2F" : "#fff";
  const textPrimary = theme.palette.mode === "dark" ? "#fff" : "#000";
  const textSecondary = theme.palette.mode === "dark" ? "#ccc" : theme.palette.text.secondary;
  const btnBg = theme.palette.mode === "dark" ? "#8B1A1A" : "#5A0C07";
  const btnHover = theme.palette.mode === "dark" ? "#A32B2B" : "#7A0000";

  return (
    <Box display="flex" flexDirection="column" alignItems="center">

      {/* CONTAINER CENTRALIZADO */}
      <Box width="100%" maxWidth="1200px" display="flex" flexDirection="column" alignItems="center">

        <Typography
          variant={isMobile ? "h2" : "h1"}
          align="center"
          mt={10}
          fontWeight={700}
          color="primary.main"
          letterSpacing={1}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& span": {
              marginLeft: 1,
              color: "#5A0C07",
            },
          }}
        >
          CINESystem
        </Typography>

        {/* CARD */}
        <Box
          mt={10}
          mb={10}
          p={5}
          width="100%"
          borderRadius={2}
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          bgcolor={cardBg}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
        >
          <Box flex={1}>
            <Typography variant="h5" fontWeight={700} color={textPrimary}>
              Somos Um Cinema Dedicado À Melhor Tecnologia E Muita Pipoca
            </Typography>

            <Typography variant="body1" mt={2} color={textSecondary}>
              Localizado no coração da cidade, o CineSystem é o lugar ideal para
              se divertir e viver grandes histórias na telona!
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                py: 1.2,
                px: 3,
                backgroundColor: btnBg,
                color: "#fff",
                fontWeight: 600,
                "&:hover": { backgroundColor: btnHover },
              }}
            >
              <RoomIcon sx={{ mr: 1 }} />
              Veja como chegar
            </Button>
          </Box>

          <Box
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#444" : "#CFCFCF",
              width: { xs: "100%", md: "2px" },
              height: { xs: "2px", md: "auto" },
              my: { xs: 2, md: 0 },
            }}
          />

          <Box flex={1}>
            <Typography variant="h5" fontWeight={700} pb={2} color={textPrimary}>
              Divirta-se assistindo aos melhores filmes!
            </Typography>

            <Box>
              <Box mt={3} display="flex" alignItems="center" gap={1}>
                <ConfirmationNumberIcon sx={{ color: theme.palette.primary.main }} />
                <Typography fontSize="1rem" color={textPrimary}>Aberto ao público</Typography>
              </Box>

              <Box mt={2} display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                <Typography fontSize="1rem" color={textSecondary}>
                  <strong>SEG À SEX:</strong> das 14h às 23h (última sessão às 22h)
                  <br />
                  <strong>SÁB/DOM:</strong> das 13h às 23h (última sessão às 22h)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* FILMES EM CARTAZ — ALINHADO À ESQUERDA IGUAL AO OUTRO COMPONENTE */}
        <Box width="100%" display="flex" alignItems="center" mb={4} mt={2}>
          <Box
            sx={{
              width: "8px",
              height: "80px",
              bgcolor: "#5A0C07",
              mr: 2,
            }}
          />
          <Typography variant="h4" fontWeight={700} color={textPrimary}>
            FILMES EM CARTAZ
          </Typography>
        </Box>

        {/* CARROSSEL */}
        <Box display="flex" alignItems="center" gap={2} width="100%" justifyContent="center">
          {podeDeslizar && (
            <ArrowBackIosIcon
              fontSize="large"
              sx={{ cursor: "pointer", display: { xs: "none", md: "block" }, color: textPrimary }}
            />
          )}

          <Box
            ref={carrosselRef}
            display="flex"
            gap={4}
            sx={{
              maxWidth: "100%",
              overflowX: { xs: "auto", md: "visible" },
              paddingBottom: 1,
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": { background: "#888", borderRadius: 4 },
            }}
          >
            {filmes.length === 0 ? (
              <Typography color={textSecondary}>Carregando filmes...</Typography>
            ) : (
              filmes.map((filme) => (
                <Box
                  key={filme.id}
                  p={2}
                  minWidth="250px"
                  width={{ xs: "250px", md: "280px" }}
                  borderRadius={2}
                  boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                  bgcolor={cardBg}
                >
                  <img
                    src={filme.bannerUrl}
                    width="100%"
                    style={{ borderRadius: "8px" }}
                  />

                  <Typography fontWeight={700} mt={1} color={textPrimary}>
                    {filme.titulo}
                  </Typography>

                  <Typography mt={1} color={textSecondary}>
                    Gênero: {filme.genero} <br />
                    Duração: {filme.duracao} min
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: btnBg,
                      color: "#fff",
                      "&:hover": { backgroundColor: btnHover },
                    }}
                    onClick={() => navigate(`/escolher-sessao/${filme.id}`)}
                  >
                    Escolher Sessão
                  </Button>
                </Box>
              ))
            )}
          </Box>

          {podeDeslizar && (
            <ArrowForwardIosIcon
              fontSize="large"
              sx={{ cursor: "pointer", display: { xs: "none", md: "block" }, color: textPrimary }}
            />
          )}
        </Box>

        {/* BOTÃO TODOS OS FILMES */}
        <Button
          variant="contained"
          sx={{
            mt: 6,
            mb: 8,
            width: "100%",
            py: 2,
            backgroundColor: btnBg,
            color: "#fff",
            fontWeight: 700,
            "&:hover": { backgroundColor: btnHover },
          }}
          onClick={() => navigate("/filmes")}
        >
          TODOS OS FILMES DISPONÍVEIS
        </Button>

      </Box>
    </Box>
  );
}
