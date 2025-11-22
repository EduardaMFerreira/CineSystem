import { Box, Button, Typography, useMediaQuery } from "@mui/material";
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
  const navigate = useNavigate();

  const carrosselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarFilmes();
        setFilmes(data.slice(0, 4)); // AGORA: máximo 4 filmes
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    if (carrosselRef.current) {
      const precisa =
        carrosselRef.current.scrollWidth >
        carrosselRef.current.clientWidth;
      setPodeDeslizar(precisa);
    }
  }, [filmes]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography
        variant={isMobile ? "h2" : "h1"}
        align="center"
        mt={8}
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
        m={10}
        p={5}
        width="70%"
        borderRadius={2}
        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
        bgcolor={(theme) =>
          theme.palette.mode === "dark" ? "#2F2F2F" : "background.paper"
        }
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
      >
        <Box flex={1}>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            Somos Um Cinema Dedicado À Melhor Tecnologia E Muita Pipoca
          </Typography>

          <Typography variant="body1" mt={2} color="text.secondary">
            Localizado no coração da cidade, o CineSystem é o lugar ideal para
            se divertir e viver grandes histórias na telona!
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 4, py: 1.2, px: 3, backgroundColor: "primary.main" }}
          >
            <RoomIcon sx={{ mr: 1 }} />
            Veja como chegar
          </Button>
        </Box>

        <Box
          sx={{
            bgcolor: "#CFCFCF",
            width: { xs: "100%", md: "2px" },
            height: { xs: "2px", md: "auto" },
            my: { xs: 2, md: 0 },
          }}
        />

        <Box flex={1}>
          <Typography variant="h5" fontWeight={700} pb={2}>
            Divirta-se assistindo aos melhores filmes!
          </Typography>

          <Box>
            <Box mt={3} display="flex" alignItems="center" gap={1}>
              <ConfirmationNumberIcon color="primary" />
              <Typography fontSize="1rem">Aberto ao público</Typography>
            </Box>

            <Box mt={2} display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon color="primary" />
              <Typography fontSize="1rem">
                <strong>SEG À SEX:</strong> das 14h às 23h (última sessão às
                22h);
                <br />
                <strong>SÁB/DOM:</strong> das 13h às 23h (última sessão às 22h)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* FILMES EM CARTAZ */}
      <Box width="70%" display="flex" alignItems="center" mb={4} mt={2}>
        <Box
          sx={{
            width: "6px",
            height: "32px",
            bgcolor: "#5A0C07",
            borderRadius: "4px",
            mr: 2,
          }}
        />
        <Typography variant="h4" fontWeight={700}>
          FILMES EM CARTAZ
        </Typography>
      </Box>

      {/* CARROSSEL */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        width="100%"
        justifyContent="center"
      >
        {podeDeslizar && (
          <ArrowBackIosIcon
            fontSize="large"
            sx={{ cursor: "pointer", display: { xs: "none", md: "block" } }}
          />
        )}

        <Box
          ref={carrosselRef}
          display="flex"
          gap={4}
          sx={{
            maxWidth: "90vw",
            overflowX: { xs: "auto", md: "visible" },
            paddingBottom: 1,
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: 4,
            },
          }}
        >
          {filmes.length === 0 ? (
            <Typography color="text.secondary">Carregando filmes...</Typography>
          ) : (
            filmes.map((filme) => (
              <Box
                key={filme.id}
                p={2}
                minWidth="250px"
                width={{ xs: "250px", md: "280px" }}
                borderRadius={2}
                boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                bgcolor={(theme) =>
                  theme.palette.mode === "dark" ? "#2F2F2F" : "background.paper"
                }
              >
                <img
                  src={filme.bannerUrl}
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />

                <Typography fontWeight={700} mt={1}>
                  {filme.titulo}
                </Typography>

                <Typography mt={1}>
                  Gênero: {filme.genero} <br />
                  Duração: {filme.duracao} min
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "primary.main" }}
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
            sx={{ cursor: "pointer", display: { xs: "none", md: "block" } }}
          />
        )}
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 6,
          mb: 8,
          width: "70%",
          py: 2,
          backgroundColor: "primary.main",
          fontWeight: 700,
        }}
        onClick={() => navigate("/filmes")}
      >
        TODOS OS FILMES DISPONÍVEIS
      </Button>
    </Box>
  );
}
