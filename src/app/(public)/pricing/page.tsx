"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

export default function PricingPage() {
    const { user } = useAuth();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    async function handleSubscribe(planKey: "pro_student" | "pro_tutor") {
        if (!user) {
            toast.error("Please sign in first to upgrade your plan.");
            return;
        }

        setLoadingPlan(planKey);
        try {
            const res = await api.post("/payments/create-checkout-session", { planKey });
            if (res.data?.url) {
                window.location.href = res.data.url;
            }
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Failed to start Stripe checkout.";
            toast.error(msg);
            setLoadingPlan(null);
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                    Upgrade to MentorLagbe Pro
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Seamless Stripe checkout with instant database plan activation upon payment completion.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pro Student ($10) */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-brand-100 text-brand-700">
                            Students
                        </span>
                        <h2 className="text-2xl font-bold">Pro Student</h2>
                        <p className="text-4xl font-extrabold text-brand-600">$10</p>
                        <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Priority booking & application visibility</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Unlimited saved tuition bookmarks</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Pro badge on student profile</li>
                        </ul>
                    </div>
                    <button
                        disabled={loadingPlan === "pro_student" || user?.plan === "pro"}
                        onClick={() => handleSubscribe("pro_student")}
                        className="w-full py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"
                    >
                        {user?.plan === "pro"
                            ? "Active Pro Plan"
                            : loadingPlan === "pro_student"
                                ? "Redirecting to Stripe..."
                                : "Subscribe with Stripe ($10)"}
                    </button>
                </div>

                {/* Pro Tutor ($15) */}
                <div className="rounded-2xl border-2 border-brand-600 bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-brand-600 text-white">
                            Tutors
                        </span>
                        <h2 className="text-2xl font-bold">Pro Tutor</h2>
                        <p className="text-4xl font-extrabold text-brand-600">$15</p>
                        <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Unlimited tuition posts (Free plan caps at 2)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Pro tutor badge</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Streamlined applicant management</li>
                        </ul>
                    </div>
                    <button
                        disabled={loadingPlan === "pro_tutor" || user?.plan === "pro"}
                        onClick={() => handleSubscribe("pro_tutor")}
                        className="w-full py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"
                    >
                        {user?.plan === "pro"
                            ? "Active Pro Plan"
                            : loadingPlan === "pro_tutor"
                                ? "Redirecting to Stripe..."
                                : "Subscribe with Stripe ($15)"}
                    </button>
                </div>
            </div>
        </div>
    );
}