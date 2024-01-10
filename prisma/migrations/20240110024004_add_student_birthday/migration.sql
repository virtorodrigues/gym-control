-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "birthday" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPassword" DROP NOT NULL;
