import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import {  addPlaylistVideo } from "@/validation/addUserData";
import { deleteVideo } from "@/validation/deleteData";
import { eq, and, isNull } from "drizzle-orm";
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
        const parseJson = deleteVideo.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error
            }, {status: 400})
        }
        
        const { videoId, accountId: reqAccountId } = parseJson.data
        if( reqAccountId !== accountId ) {
            return NextResponse.json({
                message: "unauthorized"
            }, {status: 403})
        }

        const video = await db.delete(videosTable).where(
            and(
                eq(videosTable.id, videoId),
                eq(videosTable.accountId, accountId),
                isNull(videosTable.playlistId)
            )
        ).returning().then(res => res[0])
        if( !video ) {
            return NextResponse.json({
                message: "video not exists",
            }, {status: 400})
        }

        return NextResponse.json({
            message: "video deleted successfully",
        }, {status: 200})


        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
