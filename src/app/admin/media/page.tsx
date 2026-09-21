"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Copy,
  Trash2,
  ExternalLink,
  Search,
  Check,
  AlertTriangle,
  Loader2,
  Download,
  Info,
} from "lucide-react";
import Image from "next/image";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bucketFilter, setBucketFilter] = useState("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Delete protection modal state
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [usageInfo, setUsageInfo] = useState<{
    count: number;
    items: { id: string; title: string; type: string; slug: string }[];
  } | null>(null);
  const [checkingUsage, setCheckingUsage] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(25);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        setUploadProgress(Math.round(((i + 0.5) / files.length) * 100));

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.media) {
            setMediaList((prev) => [data.media, ...prev]);
          }
        }
      }
      setUploadProgress(100);
    } catch {
      alert("Error during media upload.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    if (!item.public_url) return;
    navigator.clipboard.writeText(item.public_url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const initiateDelete = async (item: MediaItem) => {
    setDeleteTarget(item);
    setCheckingUsage(true);
    try {
      const res = await fetch(`/api/media/${item.id}`);
      if (res.ok) {
        const data = await res.json();
        setUsageInfo(data.usage);
      }
    } catch {
      //
    } finally {
      setCheckingUsage(false);
    }
  };

  const confirmDelete = async (force = false) => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/media/${deleteTarget.id}?force=${force}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        setDeleteTarget(null);
        setUsageInfo(null);
      } else {
        const data = await res.json();
        alert(data.error || "Could not delete media file.");
      }
    } catch {
      alert("Error deleting file.");
    }
  };

  const filteredMedia = mediaList.filter((m) => {
    if (bucketFilter !== "ALL" && m.bucket !== bucketFilter) return false;
    if (searchQuery.trim()) {
      return (
        m.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.alt_text || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Media & Document Library</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store and manage academic posters, conference banners, author photos, and attached PDF papers.
          </p>
        </div>

        <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition">
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`p-6 border-2 border-dashed rounded-xl text-center transition flex flex-col items-center justify-center gap-2 ${
          isDragOver
            ? "border-blue-600 bg-blue-50/50"
            : "border-slate-300 bg-white hover:border-slate-400"
        }`}
      >
        <Upload className="w-8 h-8 text-slate-400" />
        <div>
          <span className="text-xs font-semibold text-slate-700">
            Drop academic images, posters, or PDFs here
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Automatic categorization into Supabase Storage buckets (academiq-images, academiq-pdfs)
          </p>
        </div>

        {uploadProgress !== null && (
          <div className="w-full max-w-sm mt-2">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Uploading files...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search media files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={bucketFilter}
            onChange={(e) => setBucketFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white w-full sm:w-auto"
          >
            <option value="ALL">All Storage Buckets</option>
            <option value="academiq-images">academiq-images (Photos & Posters)</option>
            <option value="academiq-pdfs">academiq-pdfs (Research Papers & CFPs)</option>
            <option value="academiq-documents">academiq-documents</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-xs">Loading media assets...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-20 text-center text-slate-500 bg-white rounded-xl border border-slate-200 p-8">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-700">No media assets found.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Upload images or documents to populate the library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => {
            const isImg = item.mime_type.startsWith("image/");
            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between"
              >
                {/* Visual Preview */}
                <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                  {isImg && item.public_url ? (
                    <Image
                      src={item.public_url}
                      alt={item.alt_text || item.file_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="300px"
                    />
                  ) : (
                    <FileText className="w-10 h-10 text-slate-400" />
                  )}
                  <span className="absolute top-2 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/70 text-white backdrop-blur-xs">
                    {item.bucket}
                  </span>
                </div>

                {/* Metadata */}
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-semibold text-slate-900 truncate" title={item.file_name}>
                    {item.file_name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{(item.file_size / 1024).toFixed(0)} KB</span>
                    <span>{item.mime_type.split("/")[1]?.toUpperCase()}</span>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="px-3 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item)}
                      className="p-1 rounded hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {item.public_url && (
                      <a
                        href={item.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
                        title="Open file in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => initiateDelete(item)}
                    className="p-1 rounded hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition"
                    title="Delete Media File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Protection Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Delete Media Asset
                </h3>
                <p className="text-xs text-slate-500 break-all font-mono">
                  {deleteTarget.file_name}
                </p>
              </div>
            </div>

            {checkingUsage ? (
              <div className="py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking foreign key references across academic catalog...</span>
              </div>
            ) : usageInfo && usageInfo.count > 0 ? (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    Reference Protection Active
                  </p>
                  <p>
                    This file is currently referenced by{" "}
                    <strong>{usageInfo.count} piece{usageInfo.count > 1 ? "s" : ""}</strong> of
                    academic content:
                  </p>
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1 text-xs border border-slate-200 rounded-md p-2 bg-slate-50">
                  {usageInfo.items.map((item) => (
                    <div key={item.id} className="p-1 truncate text-slate-700">
                      • <span className="font-medium">{item.title}</span> ({item.type})
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500">
                  Deleting this file will cause broken images or missing attachments in those items.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setDeleteTarget(null);
                      setUsageInfo(null);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
                  >
                    Force Delete Anyway
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Are you sure you want to permanently delete this file? This action cannot be undone.
                </p>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setDeleteTarget(null);
                      setUsageInfo(null);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(false)}
                    className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
                  >
                    Permanently Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
