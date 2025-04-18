-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "proposal" ADD COLUMN     "status" "ProposalStatus" NOT NULL DEFAULT 'PENDING';
