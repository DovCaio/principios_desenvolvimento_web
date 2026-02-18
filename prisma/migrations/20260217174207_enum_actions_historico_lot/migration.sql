/*
  Warnings:

  - Changed the type of `action` on the `LotHistoric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LotAction" AS ENUM ('ASSIGNED_RESPONSIBLE', 'UNASSIGNED_RESPONSIBLE', 'ADDED_RESIDENT', 'REMOVED_RESIDENT', 'ADDED_VISITOR', 'REMOVED_VISITOR');

-- AlterTable
ALTER TABLE "LotHistoric" DROP COLUMN "action",
ADD COLUMN     "action" "LotAction" NOT NULL;
