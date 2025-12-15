'use client';

import { useEffect, useState, Suspense } from "react";
import { FileText, Download, Calendar, User, Mail } from "lucide-react";
import type { CV } from "@/lib/db/schema";

interface CVGalleryProps {
  limit?: number;
}

function CVGalleryContent({ limit }: CVGalleryProps) {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCVs = async () => {
    try {
      const response = await fetch("/api/cvs");
      const data = await response.json();
      const displayedData = limit ? data.slice(0, limit) : data;
      setCVs(displayedData);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Ingen CV'er endnu
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Vær den første til at uploade et CV!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cvs.map((cv) => (
        <div
          key={cv.id}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <FileText className="w-10 h-10 text-white" />
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2">
                {cv.title}
              </h3>
              {cv.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {cv.description}
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <User className="w-4 h-4" />
                <span>{cv.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{cv.userEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(cv.uploadedAt)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <a
                href={cv.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition shadow hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Se CV
              </a>
            </div>

            <div className="text-xs text-zinc-500 dark:text-zinc-600 text-center">
              {cv.fileSize}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CVGalleryFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

export default function CVGallery({ limit }: CVGalleryProps = {}) {
  return (
    <Suspense fallback={<CVGalleryFallback />}>
      <CVGalleryContent limit={limit} />
    </Suspense>
  );
}
