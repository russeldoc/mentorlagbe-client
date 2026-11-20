// src/app/dashboard/student/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";

export default function StudentDashboardPage() {
    const [stats, setStats] = useState({
        totalApplied: 0,
        acceptedApplications: 0,
        pendingApplications: 0,
        plan: "free",
    });

    useEffect(() => {
        api.get("/stats/student").then((res) => {
            if (res.data?.stats) setStats(res.data.stats);
        });
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Student Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Applied Tuitions" value={stats.totalApplied} />
                <StatCard label="Accepted Applications" value={stats.acceptedApplications} />
                <StatCard label="Pending Applications" value={stats.pendingApplications} />
                <StatCard label="Current Plan" value={stats.plan.toUpperCase()} />
            </div>
        </div>
    );
}