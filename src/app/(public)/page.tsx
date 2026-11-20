"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Users, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";
import TuitionCard from "@/components/shared/TuitionCard";

const POPULAR_SUBJECTS = ["Mathematics", "Physics", "Programming", "IELTS", "English"];

export default function HomePage() {
    const [featured, setFeatured] = useState<TuitionItem[]>([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        api
            .get("/tuitions", { params: { featured: "true" } })
            .then((res) => setFeatured(res.data?.tuitions || []))
            .catch(() => setFeatured([]))
            .finally(() => setLoadingFeatured(false));
    }, []);

    return (
        <div className="space-y-20 pb-20">
            {/* 1. Hero Section */}
            <section className="bg-gradient-to-br from-brand-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                            <Sparkles className="h-3.5 w-3.5" /> Smart Tuition & Mentorship Platform
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Find Your Ideal Tutor or Mentorship Batch Today
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                            Discover vetted subject specialists for online and home tuition across school, college, admission, and skill tracks.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/tuitions"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition"
                            >
                                Browse Tuitions <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                Become a Tutor / Student
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                            alt="Students and mentors collaborating"
                            className="h-72 w-full object-cover rounded-xl"
                        />
                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                                <p className="text-lg font-extrabold text-brand-600">500+</p>
                                <p className="text-xs text-slate-500">Active Batches</p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                                <p className="text-lg font-extrabold text-brand-600">98%</p>
                                <p className="text-xs text-slate-500">Satisfaction</p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                                <p className="text-lg font-extrabold text-brand-600">Online/Local</p>
                                <p className="text-xs text-slate-500">Flexible Modes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Featured Approved Tuitions (6 latest) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Featured Approved Tuitions
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Latest admin-verified tuition batches ready for enrollment.
                        </p>
                    </div>
                    <Link href="/tuitions" className="text-sm font-semibold text-brand-600 hover:underline">
                        View all tuitions →
                    </Link>
                </div>

                {loadingFeatured ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-80 rounded-2xl bg-slate-200/70 dark:bg-slate-800 animate-pulse" />
                        ))}
                    </div>
                ) : featured.length === 0 ? (
                    <p className="text-sm text-slate-500">No featured tuitions available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {featured.map((item) => (
                            <TuitionCard key={item._id} tuition={item} />
                        ))}
                    </div>
                )}
            </section>

            {/* 3. Pricing / Subscription Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        Simple Free & Pro Plans
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Start free or unlock unlimited tuition posts and priority student booking with Stripe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
                        <h3 className="text-lg font-bold">Pro Student Plan</h3>
                        <p className="text-3xl font-extrabold text-brand-600">$10 <span className="text-xs font-normal text-slate-500">one-time / upgrade</span></p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Priority application & booking support</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Unlimited saved tuition bookmarks</li>
                        </ul>
                        <Link href="/pricing" className="block text-center py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition">
                            Subscribe with Stripe
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-brand-500 bg-white dark:bg-slate-900 p-6 space-y-4">
                        <h3 className="text-lg font-bold">Pro Tutor Plan</h3>
                        <p className="text-3xl font-extrabold text-brand-600">$15 <span className="text-xs font-normal text-slate-500">one-time / upgrade</span></p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Unlimited tuition & mentorship listings (vs. 2 on Free)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Pro tutor badge & visibility boost</li>
                        </ul>
                        <Link href="/pricing" className="block text-center py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition">
                            Subscribe with Stripe
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. How MentorLagbe Works */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    How MentorLagbe Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                        <BookOpen className="h-6 w-6 text-brand-600" />
                        <h3 className="font-bold text-base">1. Search & Filter Batches</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Filter approved tuitions by subject, class level, online or offline mode, and monthly fee.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                        <Users className="h-6 w-6 text-brand-600" />
                        <h3 className="font-bold text-base">2. Apply & Connect</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Students submit schedule preferences and track real-time application status in their dashboard.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                        <ShieldCheck className="h-6 w-6 text-brand-600" />
                        <h3 className="font-bold text-base">3. Admin-Moderated Quality</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Listings are moderated by admins to keep tuition offerings structured, clear, and reliable.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. Top Subjects & Testimonials */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        Popular Subjects
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {POPULAR_SUBJECTS.map((subj) => (
                            <Link
                                key={subj}
                                href={`/tuitions?subject=${encodeURIComponent(subj)}`}
                                className="px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-600 hover:text-brand-600 transition"
                            >
                                {subj}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <blockquote className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            “I found an A-Level Math batch within two days and tracked my application status right from my student dashboard.”
                        </p>
                        <footer className="mt-3 text-xs font-bold text-slate-900 dark:text-white">
                            — Arif Mahmud, Student
                        </footer>
                    </blockquote>
                    <blockquote className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            “Managing student applications and upgrading to Pro for unlimited batches made running my coding mentorship effortless.”
                        </p>
                        <footer className="mt-3 text-xs font-bold text-slate-900 dark:text-white">
                            — Tanvir Hasan, Programming Tutor
                        </footer>
                    </blockquote>
                </div>
            </section>
        </div>
    );
}