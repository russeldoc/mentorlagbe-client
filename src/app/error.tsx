"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Route Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Something went wrong
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
                {error.message || "An unexpected error occurred while loading this page."}
            </p>
            <div className="mt-6 flex items-center gap-3">
                <button
                    onClick={() => reset()}
                    className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}