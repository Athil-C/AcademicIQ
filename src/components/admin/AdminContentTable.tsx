"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FullContentItem,
  ContentType,
  ContentStatus,
  Category,
} from "@/types";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  FileEdit,
  Trash2,
  Eye,
  CheckCircle,
  Archive,
  Star,
  StarOff,
  Globe,
  Loader2,
} from "lucide-react";
import { ContentTypeBadge } from "@/components/content/ContentTypeBadge";
import { formatAcademicDate } from "@/lib/utils/deadline";
import { getContentPath } from "@/lib/utils/routes";

interface AdminContentTableProps {
  initialTypeFilter?: ContentType;
}

export function AdminContentTable({ initialTypeFilter }: AdminContentTableProps) {
  const router = useRouter();
  const [items, setItems] = useState<FullContentItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ContentType | "ALL">(initialTypeFilter || "ALL");
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [categories, setCategories] = useState<Category[]>([]);

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedType !== "ALL") params.append("type", selectedType);
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      if (selectedCategory !== "ALL") params.append("category", selectedCategory);
      if (searchQuery.trim()) params.append("q", searchQuery.trim());

      const res = await fetch(`/api/content?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadItems();
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedType, selectedStatus, selectedCategory, searchQuery]);

  // Bulk Selection Handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Bulk Action Execution
  const executeBulkAction = async (action: "publish" | "unpublish" | "archive" | "delete") => {
    if (selectedIds.size === 0) return;
    if (action === "delete" && !confirm(`Permanently delete ${selectedIds.size} selected items?`)) {
      return;
    }

    setActionLoading(true);
    try {
      for (const id of Array.from(selectedIds)) {
        if (action === "delete") {
          await fetch(`/api/content/${id}`, { method: "DELETE" });
        } else {
          const statusMap: Record<string, ContentStatus> = {
            publish: "PUBLISHED",
            unpublish: "DRAFT",
            archive: "ARCHIVED",
          };
          await fetch(`/api/content/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: statusMap[action] }),
          });
        }
      }
      setSelectedIds(new Set());
      await loadItems();
    } finally {
      setActionLoading(false);
    }
  };

  // Single Item Actions
  const handleToggleStatus = async (item: FullContentItem, newStatus: ContentStatus) => {
    try {
      await fetch(`/api/content/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadItems();
    } catch {
      alert("Failed to update status");
    }
  };

  const handleToggleFeatured = async (item: FullContentItem) => {
    try {
      await fetch(`/api/content/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });
      loadItems();
    } catch {
      alert("Failed to toggle featured state");
    }
  };

  const handleDeleteItem = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await fetch(`/api/content/${id}`, { method: "DELETE" });
      loadItems();
    } catch {
      alert("Failed to delete content");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, description, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Content Type Filter */}
            {!initialTypeFilter && (
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ContentType | "ALL")}
                className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="ALL">All Content Types</option>
                <option value="RESEARCH_PAPER">Research Papers</option>
                <option value="CFP">Calls for Papers</option>
                <option value="CONFERENCE">Conferences</option>
                <option value="OPPORTUNITY">Opportunities</option>
                <option value="FUNDING">Funding</option>
                <option value="FELLOWSHIP">Fellowships</option>
                <option value="WORKSHOP">Workshops</option>
                <option value="WEBINAR">Webinars</option>
                <option value="ARTICLE">Articles</option>
                <option value="RESOURCE">Resources</option>
              </select>
            )}

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ContentStatus | "ALL")}
              className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="REVIEW">In Review</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="ALL">All Disciplines</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Actions Bar if items selected */}
        {selectedIds.size > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg animate-in fade-in duration-100">
            <span className="text-xs font-semibold text-blue-900">
              {selectedIds.size} item{selectedIds.size > 1 ? "s" : ""} selected
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={actionLoading}
                onClick={() => executeBulkAction("publish")}
                className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-xs"
              >
                Publish Selected
              </button>
              <button
                disabled={actionLoading}
                onClick={() => executeBulkAction("unpublish")}
                className="px-2.5 py-1 text-xs font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded"
              >
                Set to Draft
              </button>
              <button
                disabled={actionLoading}
                onClick={() => executeBulkAction("archive")}
                className="px-2.5 py-1 text-xs font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded"
              >
                Archive
              </button>
              <button
                disabled={actionLoading}
                onClick={() => executeBulkAction("delete")}
                className="px-2.5 py-1 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-xs">Loading academic catalog...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">
            No matching academic records found. Try modifying filters or search query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === items.length && items.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Discipline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Published</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {items.map((item) => {
                  const isSelected = selectedIds.has(item.id);
                  const publicUrl = getContentPath(item);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition ${
                        isSelected ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectItem(item.id)}
                          className="rounded border-slate-300"
                        />
                      </td>

                      <td className="py-3 px-4 min-w-[260px] max-w-sm">
                        <Link
                          href={`/admin/content/${item.id}/edit`}
                          className="font-bold text-slate-900 hover:text-blue-700 block truncate"
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-mono block truncate">
                          /{item.slug}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <ContentTypeBadge type={item.content_type} showIcon={false} />
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                        {item.category?.name || "General"}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            item.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : item.status === "REVIEW"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : item.status === "ARCHIVED"
                              ? "bg-slate-100 text-slate-600 border-slate-200"
                              : "bg-slate-50 text-slate-700 border-slate-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(item)}
                          className="text-slate-400 hover:text-amber-500 transition"
                          title={item.featured ? "Remove featured" : "Mark as featured"}
                        >
                          {item.featured ? (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <Star className="w-4 h-4 opacity-30" />
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        {formatAcademicDate(item.published_at || item.created_at)}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                        <Link
                          href={publicUrl}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-blue-700 inline-block rounded hover:bg-slate-100"
                          title="View on Public Platform"
                        >
                          <Globe className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/content/${item.id}/edit`}
                          className="p-1 text-slate-400 hover:text-slate-900 inline-block rounded hover:bg-slate-100"
                          title="Edit"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id, item.title)}
                          className="p-1 text-slate-400 hover:text-rose-600 inline-block rounded hover:bg-slate-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {items.length} of {total} academic items</span>
          <span>AcademIQ Editorial Dispatch</span>
        </div>
      </div>
    </div>
  );
}
