import { db } from "@/db/db";
import { playlistsTable, videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import { addPlaylist } from "@/validation/addUserData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        let tokenData;
        
        try {

            tokenData = await TokenData("myJwt")

        } catch (err: unknown) {
            return NextResponse.json({
                message: err instanceof Error ? err.message : "Server Error"
            }, { status: 401 });
        }
    
        const { accountId, email, userId } = tokenData

        const json = await req.json()
        const parseJson = addPlaylist.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error.message
            }, {status: 400})
        }

        const { title, description, visible } = parseJson.data

        const playlist = await db.insert(playlistsTable).values({
            title,
            description,
            visible,
            accountId
        }).returning().then((res) => res[0])

        return NextResponse.json({
            message: "playlist added successfully"
        }, {status: 200})
        

        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
