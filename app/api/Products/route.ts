import ProductCreationRequestSchema from "@/types/dto/ProductCreationRequest";
import { getUser, isPrivileged } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {



}

 export async function POST(request: NextRequest){

  const hasPrivilege = await isPrivileged(request, "products:add")

  if(hasPrivilege){

    try{

    const body = await request.json()

    const parsedBody = ProductCreationRequestSchema.parse(body)

    }catch(error){

      if(error instanceof z.ZodError){
  return NextResponse.json(
    {
      message: error.issues[0]?.message ?? "Invalid input",
    },
    {
      status: 400
    }
  )
}//.....................................................................
}
    }

  }else{
    return NextResponse.json(
      {
        message: "You do not have the required privilege to add a product"
      },
      {
        status: 403
      }
    )
  }
}