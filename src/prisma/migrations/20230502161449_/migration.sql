-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "retweetOfId" TEXT;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_retweetOfId_fkey" FOREIGN KEY ("retweetOfId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
