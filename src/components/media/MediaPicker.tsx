"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import { Upload, Image as ImageIcon, FileText, Check, X, Search, Loader2 } from "lucide-react";
import Image from "next/image";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
  filterType?: "image" | "document" | "all";
  title?: string;
}

export function MediaPicker({
  isOpen,
  onClose,
  onSelect,
  filterType = "all",
  title = "Select from Media Library",
}: MediaPickerProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(20);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(60);
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      setUploadProgress(95);

      if (res.ok) {
        const data = await res.json();
        if (data.media) {
          setMediaList((prev) => [data.media, ...prev]);
          setSelectedItem(data.media);
          setActiveTab("library");
        }
      }
    } catch {
      alert("Upload failed. Please check file type and size limit.");
    } finally {
      setUploadProgress(null);
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((m) => {
    if (filterType === "image" && !m.mime_type.startsWith("image/")) return false;
    if (filterType === "document" && !m.mime_type.includes("pdf") && !m.mime_type.includes("doc")) {
      return false;
    }
    if (searchQuery.trim()) {
      return (
        m.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.alt_text || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <h3 className="text-base font-bold text-slate-900 font-serif">{title}</h3>
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab("library")}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === "library"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Media Library
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === "upload"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Upload New
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "upload" ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 p-6 text-center">
              <Upload className="w-10 h-10 text-slate-400 mb-3" />
              <h4 className="text-sm font-semibold text-slate-800">
                Drag and drop files, or browse
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Supported formats: JPG, PNG, WebP (up to 5MB) or PDF, DOCX (up to 15MB).
              </p>

              <label className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs transition">
                <span>Select File from Computer</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept={
                    filterType === "image"
                      ? "image/jpeg,image/png,image/webp"
                      : filterType === "document"
                      ? "application/pdf,.doc,.docx"
                      : "image/*,application/pdf"
                  }
                />
              </label>

              {uploadProgress !== null && (
                <div className="w-full max-w-xs mt-4">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Uploading to Supabase Storage...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search media files by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {loading ? (
                <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-xs">Loading media assets...</span>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-500">
                  No media assets found matching the criteria.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredMedia.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    const isImg = item.mime_type.startsWith("image/");
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative rounded-lg border overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? "border-blue-600 ring-2 ring-blue-600/30 shadow-xs"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                          {isImg && item.public_url ? (
                            <Image
                              src={item.public_url}
                              alt={item.alt_text || item.file_name}
                              fill
                              className="object-cover"
                              sizes="180px"
                            />
                          ) : (
                            <FileText className="w-8 h-8 text-slate-400" />
                          )}

                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5 shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div className="p-2 bg-white">
                          <p className="text-[11px] font-medium text-slate-800 truncate" title={item.file_name}>
                            {item.file_name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {(item.file_size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedItem ? (
              <span className="truncate max-w-xs inline-block">
                Selected: <strong className="text-slate-800">{selectedItem.file_name}</strong>
              </span>
            ) : (
              <span>Click on a file to select</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              disabled={!selectedItem}
              onClick={() => {
                if (selectedItem) {
                  onSelect(selectedItem);
                  onClose();
                }
              }}
              className="px-4 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-lg transition shadow-xs"
            >
              Use Selected Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
