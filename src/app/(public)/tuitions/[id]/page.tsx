"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { TuitionItem } from "@/types";
import { useAuth } from "@/providers/AuthProvider";

export default function TuitionDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const [tuition, setTuition] = useState<TuitionItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [studentPhone, setStudentPhone] = useState("");
    const [preferredSchedule, setPreferredSchedule] = useState("");
    const [studentNote, setStudentNote] = useState("");

    useEffect(() => {
        if (!id) return;
        api
            .get(`/tuitions/${id}`)
            .then((res) => setTuition(res.data?.tuition || null))
            .catch(() => setTuition(null))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleApply(e: React.FormEvent) {
        e.preventDefault();
        if (!user) {
            toast.error("Please sign in as a student to apply.");
            return;
        }
        if (user.role !== "student") {
            toast.error("Only students can apply for tuitions.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("/applications", {
                tuitionId: id,
                studentPhone,
                preferredSchedule,
                studentNote,
            });
            toast.success("Application submitted! Track status in your dashboard.");
            setStudentPhone("");
            setPreferredSchedule("");
            setStudentNote("");
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Failed to submit application.";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div className="max-w-5xl mx-auto px-4 py-16 text-sm text-slate-500">Loading tuition details...</div>;
    }

    if (!tuition) {
        return <div className="max-w-5xl mx-auto px-4 py-16 text-sm text-rose-600">Tuition post not found.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <img
                    src={tuition.bannerImage || "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900&q=80"}
                    alt={tuition.title}
                    className="h-72 w-full object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                />

                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700">{tuition.subject}</span>
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{tuition.classLevel}</span>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">{tuition.mode}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{tuition.title}</h1>
                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{tuition.description}</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-xs text-slate-500">Monthly Fee</p>
                        <p className="font-bold text-lg text-brand-600">${tuition.monthlyFee}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Schedule</p>
                        <p className="font-semibold">{tuition.daysPerWeek} days / week</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Location / Mode</p>
                        <p className="font-semibold">{tuition.location || tuition.mode}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <h2 className="font-bold text-base">About the Tutor</h2>
                    <p className="text-sm font-semibold">{tuition.tutorName}</p>
                    <p className="text-xs text-slate-500">{tuition.tutorEmail}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {tuition.tutorProfile?.bio || "Experienced educator on MentorLagbe."}
                    </p>
                </div>
            </div>

            {/* Role-Restricted Application Form */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-fit space-y-4">
                <h2 className="text-xl font-bold">Apply for Tuition</h2>

                {!user ? (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Please sign in with a <span className="font-semibold">Student</span> account to submit an enrollment application.
                    </p>
                ) : user.role !== "student" ? (
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                        Applications are restricted to <span className="font-bold">Student</span> accounts. Since you are signed in as a <span className="font-bold uppercase">{user.role}</span>, the Apply form is disabled.
                    </div>
                ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1">Phone Number *</label>
                            <input
                                type="text"
                                required
                                value={studentPhone}
                                onChange={(e) => setStudentPhone(e.target.value)}
                                placeholder="+88017..."
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1">Preferred Schedule *</label>
                            <input
                                type="text"
                                required
                                value={preferredSchedule}
                                onChange={(e) => setPreferredSchedule(e.target.value)}
                                placeholder="e.g., Sat/Mon/Wed 5:00 PM"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1">Learning Note</label>
                            <textarea
                                rows={3}
                                value={studentNote}
                                onChange={(e) => setStudentNote(e.target.value)}
                                placeholder="Share your goals or current class background..."
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"
                        >
                            {submitting ? "Submitting..." : "Apply Now"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}