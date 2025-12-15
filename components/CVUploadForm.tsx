'use client';

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Upload, FileText, Loader2 } from "lucide-react";

function CVUploadFormContent() {
  const user = useUser();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !user) return;

    setUploading(true);

    try {
      const uploadResult = await startUpload([file]);
      
      if (!uploadResult || uploadResult.length === 0) {
        throw new Error("Upload failed");
      }

      const fileUrl = uploadResult[0].url;

      const response = await fetch("/api/cvs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          fileUrl,
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        }),
      });

      if (!response.ok) throw new Error("Failed to save CV");

      setTitle("");
      setDescription("");
      setFile(null);
      router.refresh();
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Fejl ved upload af CV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          CV Titel *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="F.eks. Frontend Udvikler - 5 års erfaring"
          required
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Beskrivelse
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tilføj en kort beskrivelse af dit CV..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Upload CV (PDF) *
        </label>
        <div className="relative">
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="hidden"
          />
          <label
            htmlFor="file"
            className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition bg-zinc-50 dark:bg-zinc-800/50"
          >
            {file ? (
              <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
                <FileText className="w-6 h-6 text-blue-500" />
                <span className="font-medium">{file.name}</span>
                <span className="text-sm text-zinc-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-500">
                <Upload className="w-8 h-8" />
                <span className="font-medium">Klik for at vælge PDF</span>
                <span className="text-sm">Maks. 4MB</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={uploading || !file || !title}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-zinc-400 disabled:to-zinc-500 text-white font-semibold py-4 px-6 rounded-lg transition shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploader...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload CV
          </>
        )}
      </button>
    </form>
  );
}

function CVUploadFormFallback() {
  return (
    <div className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function CVUploadForm() {
  return (
    <Suspense fallback={<CVUploadFormFallback />}>
      <CVUploadFormContent />
    </Suspense>
  );
}
