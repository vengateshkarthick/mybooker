import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/primsdb';
import bycrpt from 'bcrypt';


export async function POST(request: NextRequest) {
   const reqBody = await request.json();

   const hashedPassword = await bycrpt.hash(reqBody.password, 12);
   const user = await prisma.user.create({
    data: {
        email: reqBody.email,
        hashedPassword,
        name: reqBody.name
    }
   });

   return NextResponse.json(user)

}