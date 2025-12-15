'use client';

import { useEffect, useState } from "react";
import { FileText, Download, Trash2, Calendar, Mail } from "lucide-react";
import type { CV } from "@/lib/db/schema";
import { useUser } from "@stackframe/stack";

export default function MyCVGallery() {
  const user = useUser();
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCVs = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/cvs?userId=${user.id}`);
      const data = await response.json();
      setCVs(data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyCVs();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette CV?")) return;

    try {
      const response = await fetch(`/api/cvs/${id}`, { method: "DELETE" });
      
      if (response.status === 403) {
        alert("Du kan kun slette dine egne CV'er");
        return;
      }
      
      if (response.ok) {
        setCVs(cvs.filter((cv) => cv.id !== id));
      } else {
        alert("Kunne ikke slette CV");
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
      alert("Kunne ikke slette CV");
    }
  };

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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Du har ikke uploadet nogen CV'er endnu
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Upload dit første CV ovenfor for at komme i gang!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cvs.map((cv) => (
        <div
          key={cv.id}
          className="group bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2"
        >
          {/* Card Header with Gradient */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <FileText className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white inline-block">
                  PDF
                </div>
              </div>
              <button
                onClick={() => handleDelete(cv.id)}
                className="p-2.5 bg-red-500/20 hover:bg-red-500 rounded-xl transition-all duration-300 group/delete"
                title="Slet CV"
              >
                <Trash2 className="w-5 h-5 text-white group-hover/delete:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-4">
            <div>
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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="truncate text-xs">{cv.userEmail || "Ikke angivet"}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="text-xs">{formatDate(cv.uploadedAt)}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <a
                href={cv.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 group-hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Åbn CV
              </a>
              <div className="text-xs text-center text-zinc-500 dark:text-zinc-600 mt-2">
                {cv.fileSize}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
