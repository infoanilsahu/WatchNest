import NextAuth, {type NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "../../../../db/db";
import { usersTable } from "../../../../db/schema";
import { eq, or } from "drizzle-orm";


if( !process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET ) {
  throw new Error("ClientId or ClientSecret is missing.")
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({user, account}) {

      if( !user.email ) return false;

      await db.insert(usersTable).values({
        email: user.email,
        accessToken: account?.access_token,
        refreshToken: account?.refresh_token,
        tokenExpiresAt: account?.expires_at
      }).onConflictDoUpdate({
        target: usersTable.email,
        set: {
          accessToken: account?.access_token,
          refreshToken: account?.refresh_token,
          tokenExpiresAt: account?.expires_at
        }
      })
      

      return true
    }
  }

}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}