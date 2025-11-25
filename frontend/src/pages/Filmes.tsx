import React, { useRef, useState, useEffect } from "react";
import { 
  Box, Typography, Button, useTheme, TextField, 
  MenuItem, Select, FormControl 
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { listarFilmes } from "../services/filmeService";

interface Filme {
  id: number;
  titulo: string;
  genero: string;
  duracao: number;
  bannerUrl: string;
}

export default function Filmes() {
  const theme = useTheme();
  const navigate = useNavigate();
  const carrosselRef1 = useRef<HTMLDivElement | null>(null);
  const carrosselRef2 = useRef<HTMLDivElement | null>(null);
  const primaryRed = "#5A0C07";

  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedGenero, setSelectedGenero] = useState<string>("");

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const data = await listarFilmes();
        setFilmes(data);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    carregarFilmes();
  }, []);

  const generos = Array.from(new Set(filmes.map(f => f.genero)));

  const filterFilmes = (filmesArray: Filme[]) =>
    filmesArray.filter(f =>
      (!selectedGenero || f.genero === selectedGenero) &&
      f.titulo.toLowerCase().includes(searchText.toLowerCase())
    );

  const scrollCarrossel = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };

  const renderCarrossel = (filmesArray: Filme[], ref: React.RefObject<HTMLDivElement | null>) => (
    <Box display="flex" alignItems="center" gap={2} width="100%" justifyContent="flex-start" mb={6}>
      <ArrowBackIosIcon
        fontSize="large"
        sx={{ cursor: "pointer", display: { xs: "none", md: "block" } }}
        onClick={() => scrollCarrossel(ref, "left")}
      />

      <Box
        ref={ref}
        display="flex"
        gap={4}
        sx={{
          overflowX: "auto",
          paddingBottom: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {filmesArray.length === 0 ? (
          <Typography color="text.secondary">Nenhum filme encontrado...</Typography>
        ) : (
          filterFilmes(filmesArray).map((filme) => (
            <Box
              key={filme.id}
              p={2}
              minWidth="250px"
              width={{ xs: "250px", md: "280px" }}
              borderRadius={2}
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              bgcolor={theme.palette.mode === "dark" ? "#2F2F2F" : "#fff"}
            >
              <img
                src={filme.bannerUrl}
                width="100%"
                style={{ borderRadius: "8px", height: "380px", objectFit: "cover" }}
              />
              <Typography fontWeight={700} mt={1} fontSize="1rem">
                {filme.titulo}
              </Typography>
              <Typography mt={1} fontSize="0.85rem" color={theme.palette.text.secondary}>
                Gênero: {filme.genero} <br />
                Duração: {filme.duracao} min
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, backgroundColor: primaryRed }}
                onClick={() => navigate(`/escolher-sessao/${filme.id}`)}
              >
                Escolher Sessão
              </Button>
            </Box>
          ))
        )}
      </Box>

      <ArrowForwardIosIcon
        fontSize="large"
        sx={{ cursor: "pointer", display: { xs: "none", md: "block" } }}
        onClick={() => scrollCarrossel(ref, "right")}
      />
    </Box>
  );

  // Divide os filmes em dois carrosséis
  const metade = Math.ceil(filmes.length / 2);
  const filmes1 = filmes.slice(0, metade);
  const filmes2 = filmes.slice(metade);

  return (
    <Box p={1} minHeight="100vh">
      {/* Título */}
      <Box width="70%" display="flex" alignItems="center" mb={3} mt={2}>
        <Box sx={{ width: "8px", height: "80px", bgcolor: primaryRed, borderRadius: "px", mr: 2 }} />
        <Typography variant="h4" fontWeight={700}>
          FILMES EM CARTAZ
        </Typography>
      </Box>

      {/* Filtros */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <Select
            value={selectedGenero}
            onChange={(e: SelectChangeEvent) => setSelectedGenero(e.target.value)}
            displayEmpty
            renderValue={(selected) => selected || "Gênero"}
            sx={{
              backgroundColor: primaryRed,
              color: "#f5f5f5",
              fontWeight: 500,
              "& .MuiSelect-icon": { color: "#f5f5f5" },
              "& .MuiMenuItem-root": { color: "#000" },
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            {generos.map((gen) => (
              <MenuItem key={gen} value={gen}>{gen}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Digite o filme desejado..."
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: 300,
            maxWidth: 600,
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Dois Carrosséis */}
      {renderCarrossel(filmes1, carrosselRef1)}
      {renderCarrossel(filmes2, carrosselRef2)}
    </Box>
  );
}
