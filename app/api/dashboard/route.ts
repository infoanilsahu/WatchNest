import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { db } from "@/db/db";
import { accountTable, playlistsTable, videosTable } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

if( !process.env.JWT_SECRET ) {
    throw new Error("jwt secret not found ")
}

interface MyTokenPayload extends JwtPayload {
    userId: number;
    email: string;
    accountId: number;
}

interface playlistNameProp {
    id: number;
    playlistName: string;
}

export async function GET(req: NextRequest) {
    
    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("myJwt")
        if( !token ) {
            return NextResponse.json({
                message: "unauthorized."
            }, {status: 401})
        }

        const userToken = jwt.verify(token.value, process.env.JWT_SECRET!) as MyTokenPayload

        const { accountId, userId, email} = userToken

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

        const playlists = await db.select().from(playlistsTable).where(
            eq(playlistsTable.accountId, accountId)
        )

        const playlistName: playlistNameProp[] = playlists.map((playlist) => {
            return {
                id: playlist.id,
                playlistName: playlist.title
            }
        })


        return NextResponse.json({
            user: userData,
            playlist: playlistName,
            videos: videos
        }, {status: 200})


        
    } catch (err: unknown) {

        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, {status: 500})

    }
}
