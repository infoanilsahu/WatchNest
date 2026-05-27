
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { accountTable, playlistsTable, usersTable, videosTable } from "@/db/schema";
import { and, eq, isNull, count } from "drizzle-orm";
import { TokenData } from "@/lib/tokenData";

if( !process.env.JWT_SECRET ) {
    throw new Error("jwt secret not found ")
}

export async function GET(req: NextRequest) {
    
    try {

        let tokenData;
        
        try {

            tokenData = await TokenData("myJwt")

        } catch (err: unknown) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }

        const { accountId, userId, email} = tokenData
        

        const userData = await db.select().from(usersTable).where(
            eq(usersTable.id, userId) 
        ).then((res) => res[0])
        if( !userData || userData.id !== userId ) {
            return NextResponse.json({ message: "unauthorized." }, { status: 401 });
        }

        const account = await db.select().from(accountTable).where(
            and(
                eq(accountTable.id, accountId),
                eq(accountTable.userId, userId)
            )
        ).then(res => res[0])



        return NextResponse.json({
            user: {
                email: userData.email,
                username: account.username,
                name: account.name
            },
        }, {status: 200})


        
    } catch (err: unknown) {

        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, {status: 500})

    }
}
