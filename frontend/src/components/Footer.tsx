import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 3,
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        color: "#5A0C07",
        mt: 5,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{  fontSize: "1rem",}}>
        © {new Date().getFullYear()} CineSystem. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
