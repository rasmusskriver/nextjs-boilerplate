"use client";

import { useUser } from "@stackframe/stack";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";

export default function Header() {
  const user = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              CV Platform
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link
                  href="/cvs"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Se CV'er
                </Link>
                <Link
                  href="/dashboard"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:block text-zinc-700 dark:text-zinc-300 font-medium">
                  Hej, {user.displayName}!
                </span>
                <UserButton />
              </>
            ) : (
              <>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Log venligst ind
                </span>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
