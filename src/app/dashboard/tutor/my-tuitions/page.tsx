// src/app/dashboard/tutor/my-tuitions/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";

export default function TutorMyTuitionsPage() {
    const [list, setList] = useState<TuitionItem[]>([]);

    const loadList = useCallback(async () => {
        const res = await api.get("/tuitions/tutor/my");
        setList(res.data?.tuitions || []);
    }, []);

    useEffect(() => {
        loadList();
    }, [loadList]);

    async function toggleActive(item: TuitionItem) {
        try {
            await api.patch(`/tuitions/${item._id}`, { isActive: !item.isActive });
            toast.success(`Tuition marked ${!item.isActive ? "Active" : "Closed"}.`);
            loadList();
        } catch {
            toast.error("Failed to update status.");
        }
    }

    async function handleDelete(id: string) {
        try {
            await api.delete(`/tuitions/${id}`);
            toast.success("Tuition deleted.");
            loadList();
        } catch {
            toast.error("Failed to delete tuition.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Created Tuitions</h1>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Approval</th>
                            <th className="p-4">Active</th>
                            <th className="p-4">Fee</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {list.map((item) => (
                            <tr key={item._id}>
                                <td className="p-4 font-semibold">{item.title}</td>
                                <td className="p-4 capitalize">{item.approvalStatus}</td>
                                <td className="p-4">{item.isActive ? "Active" : "Closed"}</td>
                                <td className="p-4">${item.monthlyFee}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => toggleActive(item)}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700"
                                    >
                                        {item.isActive ? "Close" : "Activate"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white"
                                    >
                                        Delete
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