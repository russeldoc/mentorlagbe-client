// src/app/dashboard/student/my-applications/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionApplication } from "@/types";

export default function StudentMyApplicationsPage() {
    const [apps, setApps] = useState<TuitionApplication[]>([]);
    const [loading, setLoading] = useState(true);

    const loadApps = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/applications/student/my");
            setApps(res.data?.applications || []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadApps();
    }, [loadApps]);

    async function handleCancel(id: string) {
        try {
            await api.delete(`/applications/${id}`);
            toast.success("Pending application cancelled.");
            loadApps();
        } catch (err: unknown) {
            toast.error(
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Cannot cancel application."
            );
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Applications</h1>
            {loading ? (
                <p className="text-sm text-slate-500">Loading...</p>
            ) : apps.length === 0 ? (
                <p className="text-sm text-slate-500">You haven’t applied to any tuitions yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="p-4">Tuition</th>
                                <th className="p-4">Tutor Email</th>
                                <th className="p-4">Fee</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {apps.map((app) => (
                                <tr key={app._id}>
                                    <td className="p-4 font-semibold">{app.tuitionTitle}</td>
                                    <td className="p-4">{app.tutorEmail}</td>
                                    <td className="p-4">${app.monthlyFee}/mo</td>
                                    <td className="p-4 capitalize font-semibold">{app.status}</td>
                                    <td className="p-4">
                                        {app.status === "pending" ? (
                                            <button
                                                onClick={() => handleCancel(app._id)}
                                                className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-400">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}