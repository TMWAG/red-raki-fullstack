/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmployeeRoles" AS ENUM ('SUPERVISOR', 'ADMIN');

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserRoles";

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "EmployeeRoles" NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_login_key" ON "Employee"("login");
