/*
  Warnings:

  - You are about to drop the `NameProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NameProduct";

-- CreateTable
CREATE TABLE "ProductCount" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ProductCount_pkey" PRIMARY KEY ("name")
);
