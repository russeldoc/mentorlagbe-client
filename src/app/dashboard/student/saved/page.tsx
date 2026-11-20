// src/app/dashboard/student/saved/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";
import TuitionCard from "@/components/shared/TuitionCard";

export default function SavedTuitionsPage() {
    const [saved, setSaved] = useState<TuitionItem[]>([]);

    useEffect(() => {
        api.get("/applications/bookmarks/my").then((res) => setSaved(res.data?.tuitions || []));
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Saved Tuitions</h1>
            {saved.length === 0 ? (
                <p className="text-sm text-slate-500">No bookmarked tuitions yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saved.map((item) => (
                        <TuitionCard key={item._id} tuition={item} />
                    ))}
                </div>
            )}
        </div>
    );
}