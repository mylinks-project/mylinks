-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_linkId_fkey";

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
