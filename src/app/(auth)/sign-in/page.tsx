// src/app/(auth)/sign-in/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

export default function SignInPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim() || password.length < 6) {
            toast.error("Please enter a valid email and password (min 6 characters).");
            return;
        }

        setSubmitting(true);
        try {
            const syncedUser = await login(email.trim(), password);
            toast.success(`Welcome back, ${syncedUser.name}!`);
            if (syncedUser.role === "admin") router.push("/dashboard/admin");
            else if (syncedUser.role === "tutor") router.push("/dashboard/tutor");
            else router.push("/dashboard/student");
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Sign in failed.";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 space-y-5 shadow-sm">
                <div>
                    <h1 className="text-2xl font-extrabold">Sign In to MentorLagbe</h1>
                    <p className="text-xs text-slate-500 mt-1">Access your Student, Tutor, or Admin workspace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    Don’t have an account?{" "}
                    <Link href="/sign-up" className="font-semibold text-brand-600 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}