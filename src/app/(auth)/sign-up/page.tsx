// src/app/(auth)/sign-up/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

export default function SignUpPage() {
    const { loginWithBackendSync } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"student" | "tutor">("student");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email.trim() || password.length < 6) {
            toast.error("Provide your name, valid email, and a password of at least 6 characters.");
            return;
        }

        setSubmitting(true);
        try {
            const created = await loginWithBackendSync({
                name: name.trim(),
                email: email.trim(),
                role,
            });
            toast.success(`Account created as ${created.role} (Free plan)!`);
            router.push(created.role === "tutor" ? "/dashboard/tutor" : "/dashboard/student");
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Sign up failed.";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 space-y-5 shadow-sm">
                <div>
                    <h1 className="text-2xl font-extrabold">Create Your Account</h1>
                    <p className="text-xs text-slate-500 mt-1">Start on the Free plan and upgrade anytime.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Full Name *</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Email Address *</label>
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
                        <label className="block text-xs font-semibold mb-1">Password (min 6 chars) *</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold mb-1">Select Role *</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as "student" | "tutor")}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"
                    >
                        {submitting ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    Already registered?{" "}
                    <Link href="/sign-in" className="font-semibold text-brand-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}