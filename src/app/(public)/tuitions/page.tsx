"use client";

import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";
import TuitionCard from "@/components/shared/TuitionCard";
import { useAuth } from "@/providers/AuthProvider";

export default function BrowseTuitionsPage() {
    const { user } = useAuth();
    const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("all");
    const [classLevel, setClassLevel] = useState("all");
    const [mode, setMode] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTuitions = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/tuitions", {
                params: {
                    search,
                    subject,
                    classLevel,
                    mode,
                    page,
                    limit: 9,
                },
            });
            setTuitions(res.data?.tuitions || []);
            setTotalPages(res.data?.pagination?.totalPages || 1);
        } catch {
            toast.error("Failed to load tuitions.");
        } finally {
            setLoading(false);
        }
    }, [search, subject, classLevel, mode, page]);

    useEffect(() => {
        const timer = setTimeout(fetchTuitions, 250);
        return () => clearTimeout(timer);
    }, [fetchTuitions]);

    useEffect(() => {
        if (user?.role === "student") {
            api
                .get("/applications/bookmarks/my")
                .then((res) => {
                    const ids = (res.data?.tuitions || []).map((t: TuitionItem) => t._id);
                    setBookmarks(ids);
                })
                .catch(() => { });
        }
    }, [user]);

    async function handleBookmark(tuitionId: string) {
        if (!user || user.role !== "student") {
            toast.error("Sign in as a student to save tuitions.");
            return;
        }
        try {
            const res = await api.post("/applications/bookmarks/toggle", { tuitionId });
            setBookmarks((prev) =>
                res.data.bookmarked ? [...prev, tuitionId] : prev.filter((id) => id !== tuitionId)
            );
            toast.success(res.data.message);
        } catch {
            toast.error("Could not update bookmark.");
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Browse Tuitions</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Search and filter approved tuition batches by subject, level, and delivery mode.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="relative md:col-span-2">
                    <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        placeholder="Search by title or subject..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-brand-600"
                    />
                </div>

                <select
                    value={subject}
                    onChange={(e) => {
                        setPage(1);
                        setSubject(e.target.value);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                >
                    <option value="all">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Programming">Programming</option>
                    <option value="IELTS">IELTS</option>
                    <option value="English">English</option>
                </select>

                <div className="flex gap-2">
                    <select
                        value={classLevel}
                        onChange={(e) => {
                            setPage(1);
                            setClassLevel(e.target.value);
                        }}
                        className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                    >
                        <option value="all">All Levels</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9-10">Class 9-10</option>
                        <option value="HSC">HSC</option>
                        <option value="O-Level">O-Level</option>
                        <option value="A-Level">A-Level</option>
                        <option value="University">University</option>
                    </select>

                    <select
                        value={mode}
                        onChange={(e) => {
                            setPage(1);
                            setMode(e.target.value);
                        }}
                        className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                    >
                        <option value="all">All Modes</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="h-80 rounded-2xl bg-slate-200/70 dark:bg-slate-800 animate-pulse" />
                    ))}
                </div>
            ) : tuitions.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        No matching tuitions found. Try adjusting your search or filters.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {tuitions.map((item) => (
                        <TuitionCard
                            key={item._id}
                            tuition={item}
                            onBookmark={user?.role === "student" ? handleBookmark : undefined}
                            isBookmarked={bookmarks.includes(item._id)}
                        />
                    ))}
                </div>
            )}

            {/* Server-Side Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium disabled:opacity-40"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`px-3.5 py-2 rounded-lg text-sm font-semibold ${page === num
                                    ? "bg-brand-600 text-white"
                                    : "border border-slate-300 dark:border-slate-700"
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}