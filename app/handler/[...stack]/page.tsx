"use client";

import { SignIn, SignUp } from "@stackframe/stack";
import { useParams } from "next/navigation";

export default function AuthPage() {
  const params = useParams();
  const authType = params.stack?.[0];

  const isSignIn = authType === "sign-in";

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">CV</span>
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">
              {isSignIn ? "Velkommen tilbage" : "Opret konto"}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isSignIn ? "Log ind for at fortsætte" : "Kom i gang med CV Platform"}
            </p>
          </div>
          
          <div className="stack-auth-container">
            {isSignIn ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}
