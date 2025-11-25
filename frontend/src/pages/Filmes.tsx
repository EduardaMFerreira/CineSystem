import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  TextField,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
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

  const generos = Array.from(new Set(filmes.map((f) => f.genero)));

  const filmesFiltrados = filmes.filter(
    (f) =>
      (!selectedGenero || f.genero === selectedGenero) &&
      f.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      p={{ xs: 2, md: 3 }}
      minHeight="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="100%" maxWidth="1200px">
        
        {/* Título */}
        <Box display="flex" alignItems="center" mb={3} mt={2}>
          <Box
            sx={{
              width: "8px",
              height: { xs: "50px", md: "80px" },
              bgcolor: primaryRed,
              mr: 2
            }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            fontSize={{ xs: "1.8rem", md: "2.3rem" }}
          >
            FILMES EM CARTAZ
          </Typography>
        </Box>

        {/* Filtros */}
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
          mb={4}
          width="100%"
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              value={selectedGenero}
              onChange={(e: SelectChangeEvent) =>
                setSelectedGenero(e.target.value)
              }
              displayEmpty
              renderValue={(selected) => selected || "Gênero"}
              sx={{
                backgroundColor: primaryRed,
                color: "#f5f5f5",
                fontWeight: 500,
                "& .MuiSelect-icon": { color: "#f5f5f5" }
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              {generos.map((gen) => (
                <MenuItem key={gen} value={gen}>
                  {gen}
                </MenuItem>
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
              width: {
                xs: "100%",
                sm: "80%",
                md: "70%"
              },
              maxWidth: 700,
              backgroundColor:
                theme.palette.mode === "dark" ? "#2F2F2F" : "#fff",
              borderRadius: 1
            }}
          />
        </Box>

        {/* GRID RESPONSIVO */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(auto-fill, minmax(170px, 1fr))",
            sm: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(auto-fill, minmax(250px, 1fr))"
          }}
          gap={3}
          width="100%"
        >
          {filmesFiltrados.length === 0 ? (
            <Typography color="text.secondary" fontSize="1rem" ml={1}>
              Nenhum filme encontrado...
            </Typography>
          ) : (
            filmesFiltrados.map((filme) => (
              <Box
                key={filme.id}
                p={2}
                borderRadius={2}
                boxShadow="0 4px 12px rgba(0,0,0,0.12)"
                bgcolor={theme.palette.mode === "dark" ? "#2F2F2F" : "#fff"}
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" }
                }}
              >
                <img
                  src={filme.bannerUrl}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "auto",
                    aspectRatio: "3 / 4",
                    objectFit: "cover"
                  }}
                />

                <Typography
                  fontWeight={700}
                  mt={1}
                  fontSize={{ xs: "0.95rem", md: "1.05rem" }}
                >
                  {filme.titulo}
                </Typography>

                <Typography
                  mt={1}
                  fontSize={{ xs: "0.8rem", md: "0.9rem" }}
                  color={theme.palette.text.secondary}
                >
                  Gênero: {filme.genero} <br />
                  Duração: {filme.duracao} min
                </Typography>

                {/* Botão */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#8B1A1A" : primaryRed,
                    color:
                      theme.palette.mode === "dark" ? "#fff" : "#f5f5f5",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem"
                    },
                    fontWeight: 600,
                    paddingY: {
                      xs: "6px",
                      sm: "7px",
                      md: "8px"
                    },
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#A32B2B" : "#7A0000"
                    }
                  }}
                  onClick={() => navigate(`/escolher-sessao/${filme.id}`)}
                >
                  Escolher Sessão
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
