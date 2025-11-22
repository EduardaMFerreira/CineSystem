# Configuração de Email para Recuperação de Senha

Para que o sistema envie emails de recuperação de senha, você precisa configurar as variáveis de ambiente no arquivo `.env`.

## Variáveis Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu_email@gmail.com"
SMTP_PASS="sua_app_password_aqui"
SMTP_FROM="seu_email@gmail.com"
```

## Configuração para Gmail

1. **Ative a verificação em duas etapas** na sua conta Google:
   - Acesse: https://myaccount.google.com/security
   - Ative "Verificação em duas etapas"

2. **Crie uma App Password**:
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "App" e "Email"
   - Copie a senha gerada (16 caracteres)
   - Use essa senha no `SMTP_PASS`

3. **Configure no .env**:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="seu_email@gmail.com"
   SMTP_PASS="xxxx xxxx xxxx xxxx"  # App Password gerada
   SMTP_FROM="seu_email@gmail.com"
   ```

## Outros Provedores de Email

### Outlook/Hotmail
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu_email@outlook.com"
SMTP_PASS="sua_senha"
SMTP_FROM="seu_email@outlook.com"
```

### Yahoo
```env
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu_email@yahoo.com"
SMTP_PASS="sua_app_password"
SMTP_FROM="seu_email@yahoo.com"
```

## Testando

Após configurar, teste fazendo uma solicitação de recuperação de senha. O código será enviado por email.

**Nota**: Se houver erro no envio do email, o código ainda será salvo no banco e aparecerá no console do servidor para desenvolvimento.

