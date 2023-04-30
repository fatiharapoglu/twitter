/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(280)` to `VarChar(160)`.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "location" VARCHAR(30),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(160);
