import { cookies } from "next/headers";
import { token } from "@/validation/token";
import { NextResponse } from "next/server";

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

    const ParseToken = token.safeParse(decodedToken?.value)
    if( !ParseToken.success ) {
        throw new Error(ParseToken.error.message)
    }

    return ParseToken.data

}