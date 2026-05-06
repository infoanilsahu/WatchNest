import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    myJwt?: string;
    hasAccount?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    myJwt?: string;
    hasAccount?: boolean;
  }
}