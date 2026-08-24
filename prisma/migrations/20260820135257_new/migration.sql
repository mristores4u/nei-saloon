-- CreateTable
CREATE TABLE "Course" (
    "email" TEXT NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "Age" TEXT NOT NULL,
    "ID_number" TEXT NOT NULL,
    "Address" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("email")
);
