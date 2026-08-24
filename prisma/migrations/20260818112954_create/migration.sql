-- CreateTable
CREATE TABLE "Class" (
    "email" TEXT NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "Age" TEXT NOT NULL,
    "ID_number" TEXT NOT NULL,
    "Address" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Seccion" (
    "email" TEXT NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "Age" TEXT NOT NULL,
    "ID_number" TEXT NOT NULL,
    "Address" TEXT NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("email")
);
