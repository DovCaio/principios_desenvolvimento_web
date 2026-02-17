/*
  Warnings:

  - Added the required column `userCpf` to the `LotHistoric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LotHistoric" ADD COLUMN     "userCpf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LotHistoric" ADD CONSTRAINT "LotHistoric_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotHistoric" ADD CONSTRAINT "LotHistoric_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
