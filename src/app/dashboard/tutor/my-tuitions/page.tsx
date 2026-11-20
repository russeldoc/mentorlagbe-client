"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Pencil, X } from "lucide-react";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { TuitionItem } from "@/types";

export default function TutorMyTuitionsPage() {
    const [list, setList] = useState<TuitionItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit modal state
    const [editingItem, setEditingItem] = useState<TuitionItem | null>(null);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [mode, setMode] = useState<"Online" | "Offline">("Online");
    const [location, setLocation] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [description, setDescription] = useState("");
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);

    const loadList = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/tuitions/tutor/my");
            setList(res.data?.tuitions || []);
        } catch {
            toast.error("Failed to load your tuitions.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadList();
    }, [loadList]);

    function openEditModal(item: TuitionItem) {
        setEditingItem(item);
        setTitle(item.title);
        setSubject(item.subject);
        setClassLevel(item.classLevel);
        setMode(item.mode);
        setLocation(item.location || "");
        setMonthlyFee(String(item.monthlyFee));
        setDaysPerWeek(String(item.daysPerWeek));
        setBannerImage(item.bannerImage || "");
        setDescription(item.description);
    }

    function closeEditModal() {
        setEditingItem(null);
    }

    async function handleBannerFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingBanner(true);
        try {
            const url = await uploadToImgBB(file);
            setBannerImage(url);
            toast.success("New banner uploaded!");
        } catch (err: unknown) {
            toast.error((err as Error).message || "Banner upload failed.");
        } finally {
            setUploadingBanner(false);
        }
    }

    async function handleSaveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editingItem) return;

        setSavingEdit(true);
        try {
            await api.patch(`/tuitions/${editingItem._id}`, {
                title,
                subject,
                classLevel,
                mode,
                location: mode === "Offline" ? location : "Online Session",
                monthlyFee: Number(monthlyFee),
                daysPerWeek: Number(daysPerWeek),
                bannerImage,
                description,
            });
            toast.success("Tuition updated successfully!");
            closeEditModal();
            loadList();
        } catch (err: unknown) {
            toast.error(
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Failed to update tuition."
            );
        } finally {
            setSavingEdit(false);
        }
    }

    async function toggleActive(item: TuitionItem) {
        try {
            await api.patch(`/tuitions/${item._id}`, { isActive: !item.isActive });
            toast.success(`Tuition marked ${!item.isActive ? "Active" : "Closed"}.`);
            loadList();
        } catch {
            toast.error("Failed to update status.");
        }
    }

    async function handleDelete(id: string) {
        if (!window.confirm("Are you sure you want to delete this tuition post?")) return;
        try {
            await api.delete(`/tuitions/${id}`);
            toast.success("Tuition deleted.");
            loadList();
        } catch {
            toast.error("Failed to delete tuition.");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Created Tuitions</h1>
                <p className="text-xs text-slate-500 mt-1">
                    Edit tuition details, toggle Active/Closed availability, or remove posts[cite: 1].
                </p>
            </div>

            {loading ? (
                <p className="text-sm text-slate-500">Loading your tuitions...</p>
            ) : list.length === 0 ? (
                <p className="text-sm text-slate-500">You have not created any tuitions yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Subject / Level</th>
                                <th className="p-4">Approval</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Fee</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {list.map((item) => (
                                <tr key={item._id}>
                                    <td className="p-4 font-semibold">{item.title}</td>
                                    <td className="p-4 text-xs">
                                        {item.subject} • {item.classLevel} ({item.mode})
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${item.approvalStatus === "approved"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : item.approvalStatus === "rejected"
                                                        ? "bg-rose-100 text-rose-700"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {item.approvalStatus}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`text-xs font-semibold ${item.isActive ? "text-emerald-600" : "text-slate-400"
                                                }`}
                                        >
                                            {item.isActive ? "Active" : "Closed"}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold">${item.monthlyFee}/mo</td>
                                    <td className="p-4 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(item)}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition"
                                        >
                                            <Pencil className="h-3 w-3" /> Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => toggleActive(item)}
                                            className="px-3 py-1 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        >
                                            {item.isActive ? "Close" : "Activate"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item._id)}
                                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Tuition Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl my-8">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <h2 className="text-lg font-bold">Edit Tuition Post</h2>
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Tuition Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                        placeholder="Area or Online Session"
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
                                <label className="block text-xs font-semibold mb-1">Update Banner Image (ImgBB Upload)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerFileChange}
                                    className="text-xs"
                                />
                                {uploadingBanner && <p className="text-xs text-brand-600 mt-1">Uploading new banner...</p>}
                                {bannerImage && (
                                    <img
                                        src={bannerImage}
                                        alt="Banner preview"
                                        className="mt-2 h-24 w-44 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-1">Description *</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingEdit || uploadingBanner}
                                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
                                >
                                    {savingEdit ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}