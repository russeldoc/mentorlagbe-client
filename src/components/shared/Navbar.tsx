"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon, GraduationCap, LogOut, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function Navbar() {
    const { user, logout, darkMode, toggleDarkMode } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const dashboardHref =
        user?.role === "admin"
            ? "/dashboard/admin"
            : user?.role === "tutor"
                ? "/dashboard/tutor"
                : "/dashboard/student";

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Consistent Brand Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                    <span className="h-9 w-9 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                        <GraduationCap className="h-5 w-5" />
                    </span>
                    <span>MentorLagbe</span>
                </Link>

                {/* Desktop Public Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                        Home
                    </Link>
                    <Link href="/tuitions" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                        Browse Tuitions
                    </Link>
                    <Link href="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                        Pricing / Pro Plans
                    </Link>
                    <Link href="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                        How It Works
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        aria-label="Toggle theme"
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>

                    {!user ? (
                        <>
                            <Link
                                href="/sign-in"
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <Link
                                href={dashboardHref}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 hover:bg-brand-100 transition"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/profile"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                <User className="h-4 w-4" />
                                Update Profile
                            </Link>
                            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                                <img
                                    src={user.image || "https://i.ibb.co/placeholder-avatar.png"}
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                                />
                                <div className="leading-tight">
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white max-w-[110px] truncate">
                                        {user.name}
                                    </p>
                                    <span className="inline-block text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={logout}
                                title="Sign Out"
                                className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
                    <div className="flex flex-col gap-2 text-sm font-medium">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="py-1.5">Home</Link>
                        <Link href="/tuitions" onClick={() => setMobileOpen(false)} className="py-1.5">Browse Tuitions</Link>
                        <Link href="/pricing" onClick={() => setMobileOpen(false)} className="py-1.5">Pricing / Pro Plans</Link>
                        <Link href="/about" onClick={() => setMobileOpen(false)} className="py-1.5">How It Works</Link>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>

                        {!user ? (
                            <div className="flex gap-2">
                                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700">
                                    Sign In
                                </Link>
                                <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href={dashboardHref} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white">
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setMobileOpen(false); }} className="px-3 py-2 text-xs font-semibold rounded-lg bg-rose-600 text-white">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}