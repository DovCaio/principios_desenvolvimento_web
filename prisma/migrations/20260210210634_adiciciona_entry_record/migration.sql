/*
  Warnings:

  - You are about to drop the column `userCpf` on the `EntryRecord` table. All the data in the column will be lost.
  - Added the required column `visitorId` to the `EntryRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `EntryRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntryRecordType" AS ENUM ('ENTRY', 'EXIT');

-- DropForeignKey
ALTER TABLE "EntryRecord" DROP CONSTRAINT "EntryRecord_userCpf_fkey";

-- AlterTable
ALTER TABLE "EntryRecord" DROP COLUMN "userCpf",
ADD COLUMN     "visitorId" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "EntryRecordType" NOT NULL;

-- DropEnum
DROP TYPE "EntryType";

-- AddForeignKey
ALTER TABLE "EntryRecord" ADD CONSTRAINT "EntryRecord_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
