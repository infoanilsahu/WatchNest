import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { db } from "../../../../db/db";
import { accountTable, usersTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import jwt, { SignOptions } from "jsonwebtoken";



if( !process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET ) {
  throw new Error("ClientId or ClientSecret is missing.")
}

if( !process.env.JWT_SECRET || !process.env.JWT_EXPIRY ) {
  throw new Error("JWT_SECRET or JWT_EXPIRY is missing.")
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
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {

      if( !user.email ) return false;

      const existUser = await db.select().from(usersTable).where(
        eq(usersTable.email, user.email)
      )

      if( existUser.length === 0 ) {
        const userArr = await db.insert(usersTable).values({
          email: user.email,
        });
      }

      return true
    },

    async jwt({user, token, trigger, session}) {

      if(user) {        

        if( !user.email ) {
          throw new Error("email is missing ");
        }

        const existUser = await db.select().from(usersTable).where(
          eq(usersTable.email, user.email)
        )

        if( existUser.length === 0 ) {
          throw new Error("user not found")
        }

        const existUserData = existUser[0];
        const existUserAccount = await db.select().from(accountTable).where(
          eq(accountTable.userId, existUserData.id)
        )
        if( existUserAccount.length === 0 ) {
          token.hasAccount = false;
          return token;
        }

        const accountData = existUserAccount[0]
        const myJwt = jwt.sign(
          {
            userId: existUserData.id,
            accountId: accountData.id,
            email: existUserData.email,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"],
          }
        );
        
        await db.update(usersTable).set({
          token: myJwt
        }).where(eq(usersTable.id, existUserData.id))

        token.myJwt = myJwt;
        token.hasAccount = true;

        

      }
      else if( trigger === "update" && session?.userId ) {
        
         // find user
        const dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, session.userId))
          .then((res) => res[0]);

        if (!dbUser) return token;

        const account = await db
          .select()
          .from(accountTable)
          .where(eq(accountTable.userId, dbUser.id))
          .then((res) => res[0]);

        if (!account) return token;

        const myJwt = jwt.sign(
          {
            userId: dbUser.id,
            accountId: account.id,
            email: dbUser.email,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"],
          }
        );

        await db.update(usersTable).set({
          token: myJwt
        }).where(eq(usersTable.id, dbUser.id))

        token.myJwt = myJwt;
        token.hasAccount = true;


      }
      
  
      return token;

    },

    async session({ session, token }) {
      session.myJwt = token.myJwt as string;
      session.hasAccount = token.hasAccount as boolean;
      return session;
    },
  }

}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}