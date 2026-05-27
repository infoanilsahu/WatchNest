import { cookies } from "next/headers";
import { token } from "@/validation/token";
import jwt from "jsonwebtoken"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface TokenProp {
    userId: number;
    accountId: number;
    email: string;
}

export async function TokenData(str: string): Promise<TokenProp> {
    
    const session = await getServerSession(authOptions)

    if( !session ) throw new Error("Unauthorized")
    const decodedToken = session.myJwt

    if( !decodedToken ) {
        throw new Error("Unauthorized")
    }

    if( !process.env.JWT_SECRET ) {
        throw new Error("server error")
    }

    let payload;

    try {
        payload = jwt.verify(decodedToken, process.env.JWT_SECRET)
    } catch (err: unknown) {
        throw new Error("Invalid token")
    }

    const ParseToken = token.safeParse(payload)
    if( !ParseToken.success ) {
        throw new Error(ParseToken.error.message)
    }

    return ParseToken.data
    
}