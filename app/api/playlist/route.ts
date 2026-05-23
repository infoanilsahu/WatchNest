import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import { userPaylistData } from "@/validation/userData";
import { and, eq } from "drizzle-orm";
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
        const parseJson = userPaylistData.safeParse(json)
        if (!parseJson.success) {
            return NextResponse.json({
                message: parseJson.error.message
            }, { status: 400 })
        }

        const { accountId: reqAccountId, playlistId } = parseJson.data
        if (reqAccountId !== accountId ) {
            return NextResponse.json({
                message: "unauthorized"
            }, { status: 403 })
        }

        const playlist = await db.select().from(playlistsTable).where(
            and(
                eq(playlistsTable.id, playlistId),
                eq(playlistsTable.accountId, accountId)
            )
        ).then((res) => res[0])
        if (!playlist) {
            return NextResponse.json({
                message: "playlist not found"
            }, { status: 400 })
        }

        const videos = await db.select().from(videosTable).where(
            and(
                eq(videosTable.playlistId, playlistId),
                eq(videosTable.accountId, accountId)
            )
        )

        return NextResponse.json({
            playlist,
            videos
        }, { status: 200 })



    } catch (err: unknown) {

        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}