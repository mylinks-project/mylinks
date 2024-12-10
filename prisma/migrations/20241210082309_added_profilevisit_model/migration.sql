/*
  Warnings:

  - You are about to drop the column `browser` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `clickAt` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `postalcode` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `Click` table. All the data in the column will be lost.
  - Added the required column `visitId` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "browser",
DROP COLUMN "city",
DROP COLUMN "clickAt",
DROP COLUMN "country",
DROP COLUMN "device",
DROP COLUMN "ipAddress",
DROP COLUMN "postalcode",
DROP COLUMN "referer",
ADD COLUMN     "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "visitId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProfileVisit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "visitorId" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "referer" TEXT,
    "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileVisit" ADD CONSTRAINT "ProfileVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileVisit" ADD CONSTRAINT "ProfileVisit_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "ProfileVisit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
