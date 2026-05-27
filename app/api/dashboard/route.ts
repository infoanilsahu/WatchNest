import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { accountTable, playlistsTable, videosTable } from "@/db/schema";
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
        

        const userData = await db.select().from(accountTable).where(
            eq(accountTable.id, accountId)
        ).then((res) => res[0])
        if( !userData || userData.userId !== userId ) {
            return NextResponse.json({ message: "unauthorized." }, { status: 401 });
        }

        const videos = await db.select().from(videosTable).where(
            and(
                eq(videosTable.accountId, accountId),
                isNull(videosTable.playlistId)
            )
        )

        const playlistsWithCount = await db
        .select({
            id: playlistsTable.id,
            title: playlistsTable.title,
            videoLength: count(videosTable.id).mapWith(Number),
            visible: playlistsTable.visible
        })
        .from(playlistsTable)
        .leftJoin(
            videosTable,
            and(
                eq(videosTable.playlistId, playlistsTable.id),
                eq(videosTable.accountId, accountId)
            )
        )
        .where(eq(playlistsTable.accountId, accountId))
        .groupBy(playlistsTable.id, playlistsTable.title);


        return NextResponse.json({
            user: userData,
            playlist: playlistsWithCount,
            videos: videos
        }, {status: 200})


        
    } catch (err: unknown) {

        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, {status: 500})

    }
}
