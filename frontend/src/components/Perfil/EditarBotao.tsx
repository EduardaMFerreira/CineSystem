import { Button } from "@mui/material";

interface EditarBotaoProps {
  onClick?: () => void;
  isEditing: boolean;
}

export default function EditarBotao({ onClick, isEditing }: EditarBotaoProps) {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClick}
      fullWidth
      sx={{
        width: "300px",
        fontWeight: 700,
        py: 1.8,
        borderRadius: "0Px",
        textTransform: "none",
        fontSize: "16px",
        justifySelf: "end",

        // 🌈 EXEMPLO: mudar cor customizada
        bgcolor: isEditing ? "#015f28ff" : "#8C1816",
        "&:hover": {
          bgcolor: isEditing ? "#015f28ff" : "#8C1816",
        },

        // sombra opcional
        boxShadow: "0px 3px 6px rgba(0,0,0,0.22)",
      }}
    >
      {isEditing ? "SALVAR" : "EDITAR DADOS"}
    </Button>
  );
}
