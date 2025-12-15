"use client";

import { useUser } from "@stackframe/stack";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105"></div>
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              Drejøs CV Platform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {user && (
              <>
                <Link
                  href="/cvs"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200"
                >
                  Se CV'er
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <span className="hidden lg:block text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  Hej, {user.displayName}!
                </span>
                <div className="scale-90 sm:scale-100">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <span className="hidden sm:block text-sm text-zinc-600 dark:text-zinc-400">
                  Log venligst ind
                </span>
                <div className="scale-90 sm:scale-100">
                  <UserButton />
                </div>
              </>
            )}
            
            {/* Mobile menu button */}
            {user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && user && (
          <nav className="md:hidden py-3 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/cvs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200"
              >
                Se CV'er
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200"
              >
                Dashboard
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
