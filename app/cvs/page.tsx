"use client";

import Header from "@/components/Header";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  User,
  Mail,
  Search,
  Filter,
  Grid3x3,
  LayoutList,
  ArrowUpDown,
} from "lucide-react";
import type { CV } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

export default function CVsPage() {
  const user = useUser();
  const router = useRouter();
  const [cvs, setCVs] = useState<CV[]>([]);
  const [filteredCVs, setFilteredCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  useEffect(() => {
    if (user === null) {
      router.push("/handler/sign-in");
    }
  }, [user, router]);

  const fetchCVs = async () => {
    try {
      const response = await fetch("/api/cvs");
      const data = await response.json();
      setCVs(data);
      setFilteredCVs(data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCVs();
    }
  }, [user]);

  useEffect(() => {
    let filtered = cvs.filter(
      (cv) =>
        cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cv.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false),
    );

    // Sort
    if (sortBy === "date") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      );
    } else {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredCVs(filtered);
  }, [searchTerm, cvs, sortBy]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (user === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            Alle{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CV'er
            </span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Udforsk professionelle CV'er fra talentfulde personer på platformen
          </p>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            {filteredCVs.length} {filteredCVs.length === 1 ? "CV" : "CV'er"}{" "}
            fundet
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Søg efter titel, navn eller beskrivelse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy(sortBy === "date" ? "title" : "date")}
                className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition font-medium"
              >
                <ArrowUpDown className="w-4 h-4" />
                {sortBy === "date" ? "Dato" : "Titel"}
              </button>

              {/* View Toggle */}
              <div className="flex bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CVs Display */}
        {filteredCVs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {searchTerm ? "Ingen CV'er fundet" : "Ingen CV'er endnu"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {searchTerm
                ? "Prøv en anden søgning"
                : "Vær den første til at uploade et CV!"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {filteredCVs.map((cv, index) => (
              <div
                key={cv.id}
                className="group bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom flex flex-col"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card Header with Gradient */}
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100"></div>
                  <div className="relative">
                    <FileText className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        PDF
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cv.title}
                    </h3>
                    {cv.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {cv.description}
                      </p>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-2 text-sm pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium truncate">
                        {cv.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="truncate text-xs">
                        {cv.userEmail || "Ikke angivet"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      </div>
                      <span className="text-xs">
                        {formatDate(cv.uploadedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-auto">
                    <a
                      href={cv.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 group-hover:scale-105"
                    >
                      <Download className="w-5 h-5" />
                      Åbn CV
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500">
            {filteredCVs.map((cv, index) => (
              <div
                key={cv.id}
                className="group bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-in slide-in-from-left"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Icon Section */}
                  <div className="md:w-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cv.title}
                        </h3>
                        {cv.description && (
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                            {cv.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{cv.userName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(cv.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <a
                          href={cv.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 whitespace-nowrap"
                        >
                          <Download className="w-5 h-5" />
                          Åbn CV
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
