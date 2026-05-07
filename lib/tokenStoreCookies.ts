import { cookies } from "next/headers";

export async function cookiesToken(tokenName: string, token: string) {
    const cookieStorage = await cookies()
    cookieStorage.set(tokenName, token)
}

interface GetCookiesTokenProp {
    hasToken: boolean;
    token: string
}

export async function GetCookiesToken(tokenName: string): Promise<GetCookiesTokenProp> {
    const cookieStorage = await cookies()
    const token = cookieStorage.get(tokenName)

    if( !token ) {
        return {
            hasToken: false,
            token: "No token"
        }
    }
    else {
        return {
            hasToken: true, 
            token: token.value
        }
    }
}