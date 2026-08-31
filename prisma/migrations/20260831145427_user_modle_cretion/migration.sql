-- CreateTable
CREATE TABLE "User" (
    "User_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Phone" TEXT,
    "First_name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "Status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "CreateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "Last_login" TIMESTAMP(3),
    "Privilages" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
