/*
  Warnings:

  - The values [Windows,MacOS,Android,IOS] on the enum `PLATFORM` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PLATFORM_new" AS ENUM ('Web', 'Design', 'Mobile');
ALTER TABLE "Project" ALTER COLUMN "platform" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "platform" TYPE "PLATFORM_new" USING ("platform"::text::"PLATFORM_new");
ALTER TYPE "PLATFORM" RENAME TO "PLATFORM_old";
ALTER TYPE "PLATFORM_new" RENAME TO "PLATFORM";
DROP TYPE "PLATFORM_old";
ALTER TABLE "Project" ALTER COLUMN "platform" SET DEFAULT 'Web';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "platform" SET DEFAULT 'Web';
