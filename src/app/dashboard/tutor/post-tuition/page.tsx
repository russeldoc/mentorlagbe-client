// src/app/dashboard/tutor/post-tuition/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";

export default function PostTuitionPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("Mathematics");
    const [classLevel, setClassLevel] = useState("HSC");
    const [mode, setMode] = useState<"Online" | "Offline">("Online");
    const [location, setLocation] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("80");
    const [daysPerWeek, setDaysPerWeek] = useState("3");
    const [bannerImage, setBannerImage] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToImgBB(file);
            setBannerImage(url);
            toast.success("Banner uploaded to ImgBB!");
        } catch (err: unknown) {
            toast.error((err as Error).message || "Banner upload failed.");
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post("/tuitions", {
                title,
                subject,
                classLevel,
                mode,
                location,
                monthlyFee: Number(monthlyFee),
                daysPerWeek: Number(daysPerWeek),
                bannerImage,
                description,
            });
            toast.success("Tuition submitted for Admin approval!");
            router.push("/dashboard/tutor/my-tuitions");
        } catch (err: unknown) {
            toast.error(
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Could not create tuition."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
            <h1 className="text-2xl font-bold">Post a New Tuition</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold mb-1">Tuition Title *</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., HSC Higher Math Batch"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Subject *</label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Class Level *</label>
                        <input
                            type="text"
                            required
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Mode *</label>
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as "Online" | "Offline")}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Area or Online"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Monthly Fee ($ USD) *</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={monthlyFee}
                            onChange={(e) => setMonthlyFee(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Days / Week *</label>
                        <input
                            type="number"
                            required
                            min="1"
                            max="7"
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold mb-1">Banner Image (ImgBB Upload)</label>
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="text-xs" />
                    {uploading && <p className="text-xs text-brand-600 mt-1">Uploading banner...</p>}
                    {bannerImage && <p className="text-xs text-emerald-600 mt-1 truncate">Uploaded: {bannerImage}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold mb-1">Description *</label>
                    <textarea
                        rows={4}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Publish Tuition"}
                </button>
            </form>
        </div>
    );
}