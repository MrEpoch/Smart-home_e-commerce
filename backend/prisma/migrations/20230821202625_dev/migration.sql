/*
  Warnings:

  - A unique constraint covering the columns `[id,role]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_id_role_key" ON "User"("id", "role");
