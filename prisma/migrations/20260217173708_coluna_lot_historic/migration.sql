-- CreateTable
CREATE TABLE "LotHistoric" (
    "id" SERIAL NOT NULL,
    "lotId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LotHistoric_pkey" PRIMARY KEY ("id")
);
