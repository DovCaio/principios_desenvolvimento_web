-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('ENTRY', 'EXIT');

-- CreateTable
CREATE TABLE "EntryRecord" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "userCpf" TEXT NOT NULL,

    CONSTRAINT "EntryRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EntryRecord" ADD CONSTRAINT "EntryRecord_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
