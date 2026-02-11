/*
  Warnings:

  - You are about to drop the column `targetLotId` on the `ServiceRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_targetLotId_fkey";

-- AlterTable
ALTER TABLE "EntryRecord" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "targetLotId" INTEGER;

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "targetLotId",
ADD COLUMN     "lotId" INTEGER;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryRecord" ADD CONSTRAINT "EntryRecord_targetLotId_fkey" FOREIGN KEY ("targetLotId") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
