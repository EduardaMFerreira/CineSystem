import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

export default function Contato() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  // Cor da caixa de redes sociais dependendo do modo
  const redesBg = theme.palette.mode === "dark" ? "#2F2F2F" : "#f0f0f0";

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pb={8}>
      {/* Barra principal */}
      <Box width="70%" display="flex" alignItems="center" mb={4} mt={8}>
        <Box
          sx={{
            width: "8px",
            height: "80px",
            bgcolor: "#5A0C07",
            borderRadius: "px",
            mr: 2,
          }}
        />
        <Typography variant="h4" fontWeight={700}>
          ENTRAR EM CONTATO
        </Typography>
      </Box>

      {/* Texto explicativo */}
      <Box width={{ xs: "90%", md: "70%" }} textAlign="left" mb={6}>
        <Typography fontSize={isMobile ? "1rem" : "1.2rem"} color="text.secondary">
          Tem alguma dúvida sobre nossas sessões, reservas ou filmes em cartaz? <br />
          Fale conosco - teremos prazer em ajudar!
        </Typography>
      </Box>

      {/* Caixa das redes sociais */}
      <Box
        width={{ xs: "90%", md: "70%" }}
        bgcolor={redesBg}
        borderRadius={2}
        p={4}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={20} // aumenta espaço entre redes
        justifyContent="center"
        alignItems="center"
      >
        {/* Instagram */}
        <Box display="flex" alignItems="center" gap={2}>
          <InstagramIcon sx={{ color: "#5A0C07", fontSize: 28 }} />
          <Typography fontWeight={500}>Instagram: @cinesystem</Typography>
        </Box>

        {/* WhatsApp */}
        <Box display="flex" alignItems="center" gap={2}>
          <WhatsAppIcon sx={{ color: "#5A0C07", fontSize: 28 }} />
          <Typography fontWeight={500}>WhatsApp: (xx) xxxx-xxxx</Typography>
        </Box>

        {/* E-mail */}
        <Box display="flex" alignItems="center" gap={2}>
          <EmailIcon sx={{ color: "#5A0C07", fontSize: 28 }} />
          <Typography fontWeight={500}>E-mail: cinesystem@gmail.com</Typography>
        </Box>
      </Box>
    </Box>
  );
}
