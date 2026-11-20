// src/app/dashboard/tutor/applicants/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionApplication } from "@/types";

export default function TutorApplicantsPage() {
    const [applicants, setApplicants] = useState<TuitionApplication[]>([]);

    const loadApplicants = useCallback(async () => {
        const res = await api.get("/applications/tutor/applicants");
        setApplicants(res.data?.applicants || []);
    }, []);

    useEffect(() => {
        loadApplicants();
    }, [loadApplicants]);

    async function updateStatus(id: string, status: "accepted" | "rejected") {
        try {
            await api.patch(`/applications/${id}/status`, { status });
            toast.success(`Application ${status}.`);
            loadApplicants();
        } catch {
            toast.error("Failed to update applicant status.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Applicants</h1>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4">Student</th>
                            <th className="p-4">Tuition</th>
                            <th className="p-4">Schedule</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Decision</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {applicants.map((app) => (
                            <tr key={app._id}>
                                <td className="p-4">
                                    <p className="font-semibold">{app.studentName}</p>
                                    <p className="text-xs text-slate-500">{app.studentEmail} • {app.studentPhone}</p>
                                </td>
                                <td className="p-4">{app.tuitionTitle}</td>
                                <td className="p-4 text-xs">{app.preferredSchedule}</td>
                                <td className="p-4 capitalize font-semibold">{app.status}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => updateStatus(app._id, "accepted")}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(app._id, "rejected")}
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