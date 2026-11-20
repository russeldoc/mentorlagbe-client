// src/app/dashboard/admin/users/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { UserProfile, UserRole } from "@/types";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);

    const loadUsers = useCallback(async () => {
        const res = await api.get("/users");
        setUsers(res.data?.users || []);
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    async function handleRoleChange(id: string, role: UserRole) {
        try {
            await api.patch(`/users/${id}/role`, { role });
            toast.success(`Role updated to ${role}`);
            loadUsers();
        } catch {
            toast.error("Failed to update role.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td className="p-4 font-semibold">{u.name}</td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4 uppercase text-xs font-bold">{u.plan}</td>
                                <td className="p-4">
                                    <select
                                        value={u.role}
                                        onChange={(e) => u._id && handleRoleChange(u._id, e.target.value as UserRole)}
                                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                                    >
                                        <option value="student">student</option>
                                        <option value="tutor">tutor</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}