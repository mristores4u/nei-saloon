import prisma from "@/lib/prisma"; 
import { getUser, isPrivileged } from "@/utils/authentication"; 
import bcrypt from "bcryptjs"; 
import { NextRequest, NextResponse } from "next/server"; 
 
export async function GET(request: NextRequest) { 
  try { 
    const havePrivilege = await isPrivileged(request, "users:read"); 
 
    if (!havePrivilege) { 
      return NextResponse.json( 
        { 
          message: "You do not have the privilege to view users", 
        }, 
        { 
          status: 403, 
        } 
      ); 
    } 
 
    const pageNumberInString = request.nextUrl.searchParams.get("pageNumber") || "1" 
 
    const pageSizeInString = request.nextUrl.searchParams.get("pageSize") || "10" 
 
    const pageNumber = parseInt(pageNumberInString) 
    const pageSize = parseInt(pageSizeInString) //50 
 
    const userCount = await prisma.user.count() //999 
 
    const totalPages = Math.ceil(userCount / pageSize) 
 
    if(pageNumber > totalPages){ 
    return NextResponse.json( 
        { 
        message: "Page number exceeds total pages", 
        totalPages: totalPages 
        }, 
        { 
        status: 400 
        } 
    ) 
    } 
     
    const users = await prisma.user.findMany({ 
        skip: (pageNumber - 1) * pageSize, 
        take: pageSize, 
        select: { 
                    User_id: true, 
                    email: true, 
                    Phone: true, 
                    First_name: true, 
                    Last_Name: true, 
                    Role: true, 
                    Status: true, 
                    CreateAt: true, 
                    Last_login: true, 
                    Privilages: true, 
        } 
}) 
 
 
    return NextResponse.json({ 
      message: "Users fetched successfully", 
      users: users, 
      pagination: { 
        pageNumber: pageNumber, 
        pageSize: pageSize, 
        totalPages: totalPages, 
        totalCount: userCount 
} 
    }); 
  } catch (error) { 
    console.log("Error fetching users:", error); 
 
    return NextResponse.json( 
      { 
        message: "Internal server error", 
      }, 
      { 
        status: 500, 
      } 
    ); 
  } 
} 
 
export async function POST(request : NextRequest){ 
 
    //email , firstName, lastName, password, phone(optional) 
 
    const body = await request.json() 
 
    if(body.email == null){ 
        return NextResponse.json( 
            { 
                message : "Email is required" 
            }, 
            { 
                status : 422 
            } 
        ) 
    } 
 
    if(body.firstName == null){ 
        return NextResponse.json( 
            { 
                message : "First name is required" 
            }, 
            { 
                status : 422 
            } 
        ) 
    } 
 
    if(body.lastName == null){ 
        return NextResponse.json( 
            { 
                message : "Last name is required" 
            }, 
            { 
                status : 422 
            } 
        ) 
    } 
 
    if(body.password == null){ 
        return NextResponse.json( 
            { 
                message : "Password is required" 
            }, 
            { 
                status : 422 
            } 
        ) 
    } 
 
    const existingUser = await prisma.user.findUnique( 
        { 
            where : { 
                email : body.email 
            } 
        } 
    ) 
 
    if(existingUser != null){ 
        return NextResponse.json( 
            { 
                message : "User with this email already exists" 
            }, 
            { 
                status : 409 
            } 
        ) 
    } 
 
    const passwordHash = await bcrypt.hash(body.password, 12) 
 
    await prisma.user.create({ 
        data :{ 
            email : body.email, 
            First_name : body.firstName, 
            Last_Name : body.lastName, 
            Password : passwordHash, 
            phone : body.phone, 
        } 
    }) 
 
    return NextResponse.json( 
        { 
            message : "User created successfully" 
        }, 
        { 
            status : 201 
        } 
    ) 
 
} 
 
export async function PUT(request : NextRequest){ 
 
    const id = request.nextUrl.searchParams.get("id") 
 
    const requestedUser = await getUser(request) 
 
    const body = await request.json() 
 
    if(requestedUser == null){ 
        return NextResponse.json( 
            { 
                message : "You are not logged in" 
            }, 
            { 
                status : 401 
            } 
        ) 
    } 
 
 
 
    if(requestedUser.User_id == id){ 
        //never allow users to update their own role, status, privileges 
 
        const user = await prisma.user.findUnique({ 
        where: { 
            User_id: id 
        } 
        }) 
 
        if(user === null){ 
        return NextResponse.json( 
            { 
            message: "User not found" 
            }, 
            { 
            status: 404 
            } 
        ) 
        } 
 
        await prisma.user.update({ 
    where: { 
        User_id: id 
    }, 
    data: { 
        email: body.email || user.email, 
        Phone: body.Phone || user.Phone, 
        First_name: body.First_name || user.First_name, 
        Last_Name: body.Last_Name || user.Last_Name, 
        profileImage: body.profileImage || user.profileImage // should be included in the token 
    }
})
    return NextResponse.json( 
    { 
        message: "User updated successfully" 
    } 
    ) 
                     
 
    }else{ 
 
 
        const havePrivilege = await isPrivileged(request, "users:edit") 
 
        if(!havePrivilege){ 
        return NextResponse.json( 
            { 
            message: "You do not have the privilege to edit other users" 
            }, 
            { 
                status : 403 
 
            } 
        ) 
        } 
        const user = await prisma.user.findUnique({ 
        where: { 
            User_id: id || "000" 
        } 
        }) 
 
        if(user === null){ 
        return NextResponse.json( 
            { 
            message: "User not found" 
            }, 
            { 
            status: 404 
            } 
        ) 
        } 
        await prisma.user.update({ 
        where: { 
            User_id: id || "000" 
        }, 
        data: { 
            email: body.email || user.email, 
            First_name: body.First_name || user.First_name, 
            Last_Name: body.Last_Name || user.Last_Name, 
            Phone: body.Phone || user.Phone, 
            profileImage: body.profileImage || user.profileImage, 
            Role: body.Role || user.Role, 
            Status: body.Status || user.Status, 
            Privilages: body.Privilages || user.Privilages 
        } 
        }) 
 
        return NextResponse.json( 
        { 
            message: "User updated successfully" 
        } 
        ) 
 
 
    } 
     
} 
