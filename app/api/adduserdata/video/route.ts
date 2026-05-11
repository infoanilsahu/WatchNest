import { db } from "@/db/db";
import { videosTable } from "@/db/schema";
import { TokenData } from "@/lib/tokenData";
import { addVideo } from "@/validation/addUserData";
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
        const parseJson = addVideo.safeParse(json)
        if( !parseJson.success ) {
            return NextResponse.json({
                message: parseJson.error.message
            }, { status: 400 })
        }

        const {title, description, link} = parseJson.data

        const video = await db.insert(videosTable).values({
            title,
            description,
            link,
            accountId
        }).returning().then((res) => res[0])


        return NextResponse.json({
            message: "video uploaded successfully",
        }, {status: 200})
        

        
    } catch (err: unknown) {
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, { status: 500 })

    }
}
