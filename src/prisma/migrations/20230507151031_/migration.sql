-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_repliedToId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_retweetOfId_fkey";

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_retweetOfId_fkey" FOREIGN KEY ("retweetOfId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
