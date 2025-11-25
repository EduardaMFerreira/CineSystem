/*
  Warnings:

  - Made the column `bannerUrl` on table `Filme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Filme" ALTER COLUMN "bannerUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;
