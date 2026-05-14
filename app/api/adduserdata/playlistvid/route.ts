import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import {  addPlaylistVideo } from "@/validation/addUserData";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        let tokenData;
        
        try {

            tokenData = await TokenData("myJwt")

        } catch (err: unknown) {
            console.log("auth err: ", err)
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }
    
        const { accountId, email, userId } = tokenData

        const json = await req.json()
        const parseJson = addPlaylistVideo.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error
            }, {status: 400})
        }

        const { link, title, description, playlistId } = parseJson.data

        const playlist = await db.select().from(playlistsTable).where(
            eq(playlistsTable.id, playlistId)
        ).then(res => res[0])

        if( !playlist ) {
            return NextResponse.json({
                message: "wrong playlist id"
            }, {status: 400})
        }

        const video = await db.insert(videosTable).values({
            title,
            description,
            link,
            playlistId: playlist.id,
            accountId
        }).returning().then(res => res[0])

        
        return NextResponse.json({
            message: "video added in playlist successfully",
        }, {status: 200})        

        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
