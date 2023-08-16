/*
  Warnings:

  - Added the required column `belongsToProductId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "belongsToProductId" TEXT NOT NULL;
