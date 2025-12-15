import { AccountSettings } from '@stackframe/stack';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Tilbage til Dashboard
        </Link>
      </div>
      <AccountSettings fullPage={true} />
    </div>
  );
}
