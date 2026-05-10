import { TokenData } from "@/lib/tokenData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        try {

            const {accountId, email, userId} = await TokenData("myJwt")
            
        } catch (err: unknown) {
            return NextResponse.json({
                message: err instanceof Error ? err.message : "Server Error"
            }, { status: 401 });
        }

        
        
    } catch (err: unknown) {
        
        console.error("server error: ", err)

        return NextResponse.json({
            message: "server error"
        }, {status: 500})
        
    }
}