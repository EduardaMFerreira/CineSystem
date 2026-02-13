import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordModal from "./ForgotPasswordModal";
import VerifyCodeModal from "./VerifyCodeModal";
import ResetPasswordModal from "./ResetPasswordModal";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const [tab, setTab] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main" align="center" gutterBottom>
          Bem-vindo ao CineSystem
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          variant="fullWidth"
          sx={{
            mt: 2,
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
          }}
        >
          <Tab label="Entrar" />
          <Tab label="Criar Conta" />
        </Tabs>
      </Box>
      <Divider />
      <DialogContent sx={{ px: 4, py: 3 }}>
        {tab === 0 ? (
          <LoginForm
            onLogin={() => {
              if (onLoginSuccess) onLoginSuccess();
              else {
                window.location.reload();
              }
            }}
            onSwitchToRegister={() => setTab(1)}
            onForgotPassword={() => {
              setShowForgotPassword(true);
            }}
          />
        ) : (
          <RegisterForm
            inModal={true}
            onSuccess={() => {
              if (onLoginSuccess) onLoginSuccess();
              else {
                window.location.reload();
              }
            }}
            onSwitchToLogin={() => setTab(0)}
          />
        )}
      </DialogContent>

      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBack={() => setShowForgotPassword(false)}
        onSuccess={(email) => {
          setForgotPasswordEmail(email);
          setShowForgotPassword(false);
          setShowVerifyCode(true);
        }}
      />

      <VerifyCodeModal
        open={showVerifyCode}
        onClose={() => {
          setShowVerifyCode(false);
          setForgotPasswordEmail("");
        }}
        onBack={() => {
          setShowVerifyCode(false);
          setShowForgotPassword(true);
        }}
        email={forgotPasswordEmail}
        onSuccess={(token) => {
          setResetToken(token);
          setShowVerifyCode(false);
          setShowResetPassword(true);
        }}
      />

      <ResetPasswordModal
        open={showResetPassword}
        onClose={() => {
          setShowResetPassword(false);
          setResetToken("");
          setForgotPasswordEmail("");
        }}
        email={forgotPasswordEmail}
        token={resetToken}
        onSuccess={() => {
          setShowResetPassword(false);
          setResetToken("");
          setForgotPasswordEmail("");
          onClose();
        }}
      />
    </Dialog>
  );
}

