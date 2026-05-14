import { db } from "@/db/db";
import { accountTable, playlistsTable, videosTable } from "@/db/schema";
import { publicPlaylistData } from "@/validation/public";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
        const json = await req.json()
        const parseJson = publicPlaylistData.safeParse(json)
        if ( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error
            }, {status: 400})
        }

        const { accountId, playlistId } = parseJson.data

        const account = await db.select().from(accountTable).where(
            eq(accountTable.id, accountId)
        ).then(res => res[0])
        if( !account ) {
            return NextResponse.json({
                message: "account not found"
            }, {status: 400})
        }

        const playlist = await db.select().from(playlistsTable).where(
            and(
                eq(playlistsTable.id, playlistId),
                eq(playlistsTable.visible, "public")
            )
        ).then(res => res[0])
        if( !playlist ) {
            return NextResponse.json({
                message: "playlist not found"
            }, {status: 400})
        }

        const video = await db.select().from(videosTable).where(
            and(
                eq(videosTable.accountId, accountId),
                eq(videosTable.playlistId, playlist.id)
            )
        )

        return NextResponse.json({
            account,
            playlist, 
            video
        }, {status: 200})

    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })
        
    }
}


