/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_userReplyLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_parentId_fkey";

-- DropForeignKey
ALTER TABLE "_userReplyLikes" DROP CONSTRAINT "_userReplyLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_userReplyLikes" DROP CONSTRAINT "_userReplyLikes_B_fkey";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "isReply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "repliedToId" TEXT;

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "_userReplyLikes";

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
