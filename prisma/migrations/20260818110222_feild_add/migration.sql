/*
  Warnings:

  - You are about to drop the column `city` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - Added the required column `Address` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Age` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DOB` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `First_name` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_number` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Last_Name` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "city",
DROP COLUMN "name",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Age" TEXT NOT NULL,
ADD COLUMN     "DOB" TEXT NOT NULL,
ADD COLUMN     "First_name" TEXT NOT NULL,
ADD COLUMN     "ID_number" TEXT NOT NULL,
ADD COLUMN     "Last_Name" TEXT NOT NULL;
