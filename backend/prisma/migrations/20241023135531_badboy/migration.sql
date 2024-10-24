/*
  Warnings:

  - You are about to drop the column `author` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `authorID` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorID_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "author",
DROP COLUMN "authorID",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
