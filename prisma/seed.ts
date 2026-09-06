import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Roboto_Flex } from "next/font/google";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [

    {
        email : "charuka@gmail.com",
        First_name : "Admin",
        Last_Name : "Charuka",
        Password : "$2a$12$E0aQQTA8fhVAPFsT.YA/2ugghOF99nTx362fR.oCCiqj8jhLzi/zq",
        Role : "Admin",
        Privilages : []

    }
    
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();