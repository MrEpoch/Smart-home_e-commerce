/*
  Warnings:

  - You are about to drop the column `belongsToProductId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_belongsToProductId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "belongsToProductId";

-- CreateTable
CREATE TABLE "_OrderItemToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderItemToProduct_AB_unique" ON "_OrderItemToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderItemToProduct_B_index" ON "_OrderItemToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrderItemToProduct" ADD CONSTRAINT "_OrderItemToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItemToProduct" ADD CONSTRAINT "_OrderItemToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
