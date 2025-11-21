import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 3,
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.background.paper, // usa o tema
        color: (theme) => theme.palette.text.primary,              // usa o tema
        mt: 5,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ fontSize: "1rem" }}>
        © {new Date().getFullYear()} CineSystem. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
