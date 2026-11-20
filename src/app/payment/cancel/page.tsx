// src/app/payment/cancel/page.tsx
import Link from "next/link";

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
            <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 space-y-4">
                <h1 className="text-2xl font-extrabold text-rose-600">Payment Cancelled</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your Stripe checkout was cancelled. No charges were made.
                </p>
                <Link
                    href="/pricing"
                    className="inline-block mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700"
                >
                    Back to Pricing
                </Link>
            </div>
        </div>
    );
}