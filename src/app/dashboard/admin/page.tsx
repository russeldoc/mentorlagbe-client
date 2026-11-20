// src/app/dashboard/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTutors: 0,
        pendingTuitions: 0,
        approvedTuitions: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        api.get("/stats/admin").then((res) => {
            if (res.data?.stats) setStats(res.data.stats);
        });
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard label="Total Users" value={stats.totalUsers} />
                <StatCard label="Total Tutors" value={stats.totalTutors} />
                <StatCard label="Pending Tuitions" value={stats.pendingTuitions} />
                <StatCard label="Approved Tuitions" value={stats.approvedTuitions} />
                <StatCard label="Stripe Revenue" value={`$${stats.totalRevenue}`} />
            </div>
        </div>
    );
}