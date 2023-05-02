/*
  Warnings:

  - You are about to drop the column `parentId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `Retweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_retweetedById_fkey";

-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_tweetOriginId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_parentId_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "parentId",
ADD COLUMN     "isRetweet" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Retweet";

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(280) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "photoUrl" TEXT,
    "parentId" TEXT,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userRetweets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_userReplyLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userRetweets_AB_unique" ON "_userRetweets"("A", "B");

-- CreateIndex
CREATE INDEX "_userRetweets_B_index" ON "_userRetweets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_userReplyLikes_AB_unique" ON "_userReplyLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_userReplyLikes_B_index" ON "_userReplyLikes"("B");

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userRetweets" ADD CONSTRAINT "_userRetweets_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userRetweets" ADD CONSTRAINT "_userRetweets_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userReplyLikes" ADD CONSTRAINT "_userReplyLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userReplyLikes" ADD CONSTRAINT "_userReplyLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
