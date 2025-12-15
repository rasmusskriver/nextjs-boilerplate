"use client";

import Header from "@/components/Header";
import CVGallery from "@/components/CVGallery";
import { ArrowRight, FileText, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user === null) {
      router.push("/handler/sign-in");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Del dit{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                professionelle CV
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              En moderne platform hvor du nemt kan dele og opdage CV'er fra
              talentfulde professionelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button
                onClick={handleGetStarted}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Kom i gang
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#cvs"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cvs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 text-zinc-900 dark:text-zinc-100 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                Se CV'er
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Nem upload
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Upload dit CV på få sekunder og gør det tilgængeligt for andre
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Sikker login
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Beskyttet med moderne authentication for din sikkerhed
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Lynhurtig
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Bygget med Next.js 16 for optimal performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CV Preview Section */}
      <section
        id="cvs"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">
            Seneste CV'er
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            Se de nyeste CV'er fra vores community
          </p>
          <Link
            href="/cvs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Se alle CV'er
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <CVGallery limit={6} />
        <div className="text-center mt-12">
          <Link
            href="/cvs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg group transition-colors"
          >
            Udforsk flere CV'er
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
