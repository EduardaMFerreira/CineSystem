-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" SERIAL NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
