-- DropForeignKey
ALTER TABLE "Lot" DROP CONSTRAINT "Lot_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Lot" ALTER COLUMN "responsibleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lot" ADD CONSTRAINT "Lot_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;
