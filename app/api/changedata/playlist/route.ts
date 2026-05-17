import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import { changePlaylistData } from "@/validation/changeData";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const tokenData = await TokenData("myJwt").catch(() => null)

        if( !tokenData ) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }
    
        const { accountId, email, userId } = tokenData

        const json = await req.json()
        const parseJson = changePlaylistData.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error
            }, {status: 400})
        }
        
        const { accountId: reqAccountId, description, title, playlistId } = parseJson.data
        if( reqAccountId !== accountId ) {
            return NextResponse.json({
                message: "unauthorized"
            }, {status: 403})
        }

        const [video] = await db.update(playlistsTable).set({
            title, 
            description
        }).where(
            and(
                eq(playlistsTable.id, playlistId),
                eq(playlistsTable.accountId, accountId)
            )
        ).returning({
            id: playlistsTable.id,
            title: playlistsTable.title,
            description: playlistsTable.description
        })

        if( !video ) {
            return NextResponse.json({
                message: "playlist not found"
            }, {status: 404})
        }
        

        return NextResponse.json({
            message: "playlist title and description successfully change",
            video
        }, {status: 200})
        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
