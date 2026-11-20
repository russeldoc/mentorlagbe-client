// src/app/dashboard/admin/transactions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PaymentTransaction } from "@/types";

export default function AdminTransactionsPage() {
    const [txns, setTxns] = useState<PaymentTransaction[]>([]);

    useEffect(() => {
        api.get("/payments/admin/all").then((res) => setTxns(res.data?.transactions || []));
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Stripe Transactions</h1>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {txns.map((t) => (
                            <tr key={t._id}>
                                <td className="p-4 font-semibold">{t.userName} ({t.userEmail})</td>
                                <td className="p-4 capitalize">{t.userRole}</td>
                                <td className="p-4">{t.planName}</td>
                                <td className="p-4 font-bold text-emerald-600">${t.amount}</td>
                                <td className="p-4 text-xs font-mono">{t.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}