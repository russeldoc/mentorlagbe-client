import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 text-center">
            <p className="text-6xl font-extrabold text-brand-600">404</p>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Page Not Found
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
                The tuition listing or route you are looking for does not exist or may have moved.
            </p>
            <Link
                href="/"
                className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
}