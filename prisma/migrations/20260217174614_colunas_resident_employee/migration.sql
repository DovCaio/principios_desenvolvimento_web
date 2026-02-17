/*
  Warnings:

  - You are about to drop the column `userCpf` on the `LotHistoric` table. All the data in the column will be lost.
  - Added the required column `employeeCpf` to the `LotHistoric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residentCpf` to the `LotHistoric` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LotHistoric" DROP CONSTRAINT "LotHistoric_userCpf_fkey";

-- AlterTable
ALTER TABLE "LotHistoric" DROP COLUMN "userCpf",
ADD COLUMN     "employeeCpf" TEXT NOT NULL,
ADD COLUMN     "residentCpf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LotHistoric" ADD CONSTRAINT "LotHistoric_residentCpf_fkey" FOREIGN KEY ("residentCpf") REFERENCES "Resident"("userCpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotHistoric" ADD CONSTRAINT "LotHistoric_employeeCpf_fkey" FOREIGN KEY ("employeeCpf") REFERENCES "Employee"("userCpf") ON DELETE RESTRICT ON UPDATE CASCADE;
