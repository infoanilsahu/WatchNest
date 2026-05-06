import { db } from "@/db/db";
import { accountTable, usersTable } from "@/db/schema";
import { account } from "@/validation/account";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const json = await req.json()
        const parseData = account.safeParse(json)
        if( !parseData.success ) {
            return NextResponse.json({
                message: parseData.error.message
            }, {status: 403})
        }
    
        const { email, name, username } = parseData.data
    
        const [ loginUser ] = await db.select().from(usersTable).where(
            eq(usersTable.email, email)
        )
        if( !loginUser ) {
            return NextResponse.json({
                message: "unauthorized access"
            }, {status: 401})
        }
    
        const existUser = await db.select().from(accountTable).where(
            or(
                eq(accountTable.username, username),
                eq(accountTable.userId, loginUser.id)
            )
        )
        if( existUser.length > 0 ) {
            return NextResponse.json({
                message: "Username already exists or user already has an account"
            }, {status: 400})
        }

        const newAccount = await db.insert(accountTable).values({
            username: username,
            name: name, 
            userId: loginUser.id,
        }).returning()

        return NextResponse.json({
            message: "User Account create successfully", 
            account: newAccount
        }, {status: 200})
    
    
        
    } catch (err: any) {
         
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, {status: 500})


    }
}