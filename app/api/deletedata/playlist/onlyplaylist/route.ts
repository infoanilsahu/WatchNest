import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import { deletePlaylist } from "@/validation/deleteData";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {

        const tokenData = await TokenData("myJwt").catch(() => null)

        if( !tokenData ) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }
    
        const { accountId, email, userId } = tokenData

        const json = await req.json()
        const parseJson = deletePlaylist.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error.message || "Invalid data"
            }, {status: 400})
        }

        const { accountId: reqAccountId, playlistId } = parseJson.data
        if( reqAccountId !== accountId ) {
            return NextResponse.json({
                message: "unauthorized"
            }, {status: 403})
        }

        const playlist = await db.select().from(playlistsTable).where(
            and(
                eq(playlistsTable.id, playlistId),
                eq(playlistsTable.accountId, accountId)
            )
        ).then(res => res[0])
        if( !playlist ) {
            return NextResponse.json({
                message: "playlist not found"
            }, {status: 404})
        }


        const playlistDelete = await db.transaction( async (tx) => {
            await tx.update(videosTable).set({
                playlistId: null
            })
            .where(
                and(
                    eq(videosTable.playlistId, playlistId),
                    eq(videosTable.accountId, accountId)
                )
            );

            await tx.delete(playlistsTable).where(
                and(
                    eq(playlistsTable.id, playlistId),
                    eq(playlistsTable.accountId, accountId)
                )
            );
        })

        return NextResponse.json({
            message: "playlist deleted successfully",
            playlist
        }, {status: 200})

        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
