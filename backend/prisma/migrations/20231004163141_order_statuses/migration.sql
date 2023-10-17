-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('ACCEPTED', 'IN_DELIVERY', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatuses" NOT NULL DEFAULT 'ACCEPTED';
