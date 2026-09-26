import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { use } from "react";

export async function POST(request: NextRequest){

  const body = await request.json();

  console.log(body);

  if(body.email == null){
    return NextResponse.json({
    message : "Email ekak naha"
    },
    {status : 402}
    )
    }
  if(body.password == null){
    return NextResponse.json({
    message : "PW ekak naha"
    },
    {status : 402}
    )
    }

  const user = await prisma.user.findFirst(
    {
      where: {
        email: body.email
      }
    }
  )

  console.log(user);

    if(user == null){
    return NextResponse.json({
    message : "Mehema User kenek naha"
    }
    )
    }

if(user.Status !== "ACTIVE"){

    return NextResponse.json(
        {
            message: "Your account is disabled. Please contact the administrator."
        },
    {status : 403}
    )
}


    const isPasswordValid = await compare(body.password, user.Password);

    if(isPasswordValid){

      await prisma.user.update(
{
where :{

  User_id : user.User_id
},
data : {

Last_login : new Date()
}

}


      )

const secretText = process.env.JOSE_SECRET; // Athana dala tiyenne metanin

const secret = new TextEncoder().encode(secretText);

const token = await new jose.SignJWT({
  User_id: user.User_id,
  email: user.email,
  firstName: user.First_name,
  lastName: user.Last_Name,
  role: user.Role,
  privileges: user.Privilages,
  Last_login : user.Last_login
}).setProtectedHeader({ alg: "HS256" }).sign(secret);

const response = NextResponse.json(
  {
    message: "Login successful",
    role: user.Role,
    Last_login : user.Last_login
  }
);

response.cookies.set({
  name: "login-token",
  value: token,
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
});

return response;
  
}else{

  return NextResponse.json(
    {
      message: "Invalid password"
    },
    {status : 401}
  )

}
}
