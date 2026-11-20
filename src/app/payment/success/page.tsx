// src/app/payment/success/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { refreshUser } = useAuth();
    const [statusMessage, setStatusMessage] = useState("Verifying your Stripe payment...");

    useEffect(() => {
        if (!sessionId) {
            setStatusMessage("Payment completed! Your Pro plan status is active.");
            refreshUser().catch(() => { });
            return;
        }

        api
            .post("/payments/verify-session", { sessionId })
            .then(async () => {
                await refreshUser();
                setStatusMessage("Payment verified! Your account has been upgraded to Pro.");
            })
            .catch(() => {
                setStatusMessage("Payment received. Your Pro plan will reflect shortly.");
            });
    }, [sessionId, refreshUser]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
            <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 space-y-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h1 className="text-2xl font-extrabold">Subscription Successful</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">{statusMessage}</p>
                <Link
                    href="/dashboard/profile"
                    className="inline-block mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-sm">Verifying payment...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}