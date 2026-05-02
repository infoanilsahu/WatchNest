"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"


interface ProviderProp {
    children: ReactNode
}

export default function Provider({children}: ProviderProp) {
    return <SessionProvider>{children}</SessionProvider>;
}