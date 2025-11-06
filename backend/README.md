# CineSystem 🎥🎟️

## Sobre o Projeto  
O **CineSystem** é uma API REST desenvolvida em **Node.js + Express + TypeScript + Prisma**, com o objetivo de gerenciar filmes, salas e sessões de cinema.  
O projeto faz parte de um estudo prático de desenvolvimento backend, com foco em boas práticas, validações e integração com banco de dados PostgreSQL.

---

## Tecnologias Utilizadas  
- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Zod (validação de dados)  
- Swagger (documentação das rotas)  

---

## Como Rodar o Projeto  

#### 1️. Clone o repositório
```bash
git clone https://github.com/SEU_USUARIO/cinesystem.git
cd cinesystem
```

#### 2️. Instale as dependências
```bash
npm install
```

#### 3. Configure o banco de dados
Crie um arquivo .env na raiz do projeto com o conteúdo:
```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cinesystem"
```
- Substitua usuario e senha pelos dados do seu PostgreSQL.

#### 4. Gere o Prisma Client
```bash
npx prisma generate
```

#### 5. Execute as migrações
```bash
npx prisma migrate dev
```

#### 6. Rode o servidor
```bash
npm run dev
```

##

- O servidor iniciará em:
http://localhost:8000

- Se a documentação Swagger estiver configurada, acesse:
http://localhost:8000/api-docs
