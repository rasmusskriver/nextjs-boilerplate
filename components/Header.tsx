'use client';

import { User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CV</span>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              CV Platform
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-700 dark:text-zinc-300 font-medium"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
