"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { data: session ,status } = useSession();
  const router = useRouter();

    console.log("hasAccount : ",session?.hasAccount);
    console.log("token : ", session?.myJwt)

  useEffect(() => {
    if (status === "authenticated" && session.hasAccount == false ) {
      router.push("/auth/account");
    }
    else if( status === "authenticated" && session.hasAccount == true ) {
        router.push("/dashboard")
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/auth/account" })}
            className="w-full flex items-center gap-2"
            variant="default"
          >
            {/* Google SVG */}
            

            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}