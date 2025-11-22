import nodemailer from "nodemailer";

// Configuração do transporter de email
// Para desenvolvimento, você pode usar serviços como Gmail, Outlook, ou serviços de teste como Ethereal
const createTransporter = () => {
  // Configuração usando variáveis de ambiente
  // Para Gmail: você precisa criar uma "App Password" nas configurações da conta
  // Para outros serviços, ajuste conforme necessário
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER, // Seu email
      pass: process.env.SMTP_PASS, // Sua senha ou App Password
    },
  });

  return transporter;
};

export class EmailService {
  /**
   * Envia um email com o código de recuperação de senha
   */
  static async sendPasswordResetCode(email: string, codigo: string) {
    try {
      const transporter = createTransporter();

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: "Código de Recuperação de Senha - CineSystem",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #5A0C07;">Recuperação de Senha - CineSystem</h2>
            <p>Olá,</p>
            <p>Você solicitou a recuperação de senha para sua conta no CineSystem.</p>
            <p>Seu código de verificação é:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <h1 style="color: #5A0C07; margin: 0; font-size: 32px; letter-spacing: 5px;">${codigo}</h1>
            </div>
            <p>Este código expira em <strong>15 minutos</strong>.</p>
            <p>Se você não solicitou esta recuperação de senha, ignore este email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Este é um email automático, por favor não responda.</p>
          </div>
        `,
        text: `
          Recuperação de Senha - CineSystem
          
          Olá,
          
          Você solicitou a recuperação de senha para sua conta no CineSystem.
          
          Seu código de verificação é: ${codigo}
          
          Este código expira em 15 minutos.
          
          Se você não solicitou esta recuperação de senha, ignore este email.
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email enviado com sucesso:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error("Erro ao enviar email:", error);
      throw new Error("Erro ao enviar email de recuperação de senha");
    }
  }
}

