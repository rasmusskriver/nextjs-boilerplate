import Header from "@/components/Header";
import CVUploadForm from "@/components/CVUploadForm";
import CVGallery from "@/components/CVGallery";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";
import { Upload, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
                Dashboard
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Velkommen tilbage, {user.displayName || user.primaryEmail}!
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Upload nyt CV
            </h2>
          </div>
          <CVUploadForm />
        </div>

        {/* All CVs Section */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Alle uploadede CV'er
          </h2>
          <CVGallery />
        </div>
      </main>
    </div>
  );
}
