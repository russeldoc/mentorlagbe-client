// src/app/dashboard/tutor/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";

export default function TutorDashboardPage() {
    const [stats, setStats] = useState({
        totalTuitionsPosted: 0,
        activeApprovedTuitions: 0,
        totalApplicantsReceived: 0,
        plan: "free",
    });

    useEffect(() => {
        api.get("/stats/tutor").then((res) => {
            if (res.data?.stats) setStats(res.data.stats);
        });
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Tutor Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Tuitions Posted" value={stats.totalTuitionsPosted} />
                <StatCard label="Active & Approved" value={stats.activeApprovedTuitions} />
                <StatCard label="Total Applicants" value={stats.totalApplicantsReceived} />
                <StatCard label="Current Plan" value={stats.plan.toUpperCase()} />
            </div>
        </div>
    );
}