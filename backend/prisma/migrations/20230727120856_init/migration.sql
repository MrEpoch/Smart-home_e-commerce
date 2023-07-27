/*
  Warnings:

  - You are about to drop the column `countInStock` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "countInStock",
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "numReviews" SET DEFAULT 0;
