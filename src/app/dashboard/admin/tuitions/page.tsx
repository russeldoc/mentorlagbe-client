// src/app/dashboard/admin/tuitions/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";

export default function AdminTuitionsPage() {
    const [list, setList] = useState<TuitionItem[]>([]);

    const loadAll = useCallback(async () => {
        const res = await api.get("/tuitions/admin/all");
        setList(res.data?.tuitions || []);
    }, []);

    useEffect(() => {
        loadAll();
    }, [loadAll]);

    async function moderate(id: string, approvalStatus: "approved" | "rejected") {
        try {
            await api.patch(`/tuitions/${id}/moderate`, { approvalStatus });
            toast.success(`Tuition ${approvalStatus}`);
            loadAll();
        } catch {
            toast.error("Moderation failed.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Tuition Approval Queue</h1>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Tutor</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Moderation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {list.map((item) => (
                            <tr key={item._id}>
                                <td className="p-4 font-semibold">{item.title}</td>
                                <td className="p-4">{item.tutorName}</td>
                                <td className="p-4 capitalize font-semibold">{item.approvalStatus}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => moderate(item._id, "approved")}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => moderate(item._id, "rejected")}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}