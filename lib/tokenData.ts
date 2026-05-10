import { cookies } from "next/headers";
import { token } from "@/validation/token";
import jwt from "jsonwebtoken"

interface TokenProp {
    userId: number;
    accountId: number;
    email: string;
}

export async function TokenData(str: string): Promise<TokenProp> {
    const cookieStore = await cookies();
    const decodedToken = cookieStore.get(str)
    if( !decodedToken ) {
        throw new Error("Unauthorized")
    }

    if( !process.env.JWT_SECRET ) {
        throw new Error("server error")
    }

    let payload;

    try {
        payload = jwt.verify(decodedToken.value, process.env.JWT_SECRET)
    } catch (err: unknown) {
        throw new Error("Invalid token")
    }

    const ParseToken = token.safeParse(payload)
    if( !ParseToken.success ) {
        throw new Error(ParseToken.error.message)
    }

    return ParseToken.data
    
}