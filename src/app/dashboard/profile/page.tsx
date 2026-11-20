"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { useAuth } from "@/providers/AuthProvider";

export default function UpdateProfilePage() {
    const { user, refreshUser } = useAuth();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhone(user.phone || "");
            setBio(user.bio || "");
            setImage(user.image || "");
        }
    }, [user]);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToImgBB(file);
            setImage(url);
            toast.success("Profile photo uploaded to ImgBB.");
        } catch (err: unknown) {
            toast.error((err as Error).message || "Image upload failed.");
        } finally {
            setUploading(false);
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch("/users/profile", { name, phone, bio, image });
            await refreshUser();
            toast.success("Profile updated!");
        } catch {
            toast.error("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
            <h1 className="text-2xl font-bold">Update Profile</h1>

            <div className="flex items-center gap-4">
                <img
                    src={image || "https://i.ibb.co/placeholder-avatar.png"}
                    alt="Avatar preview"
                    className="h-16 w-16 rounded-full object-cover border"
                />
                <div>
                    <label className="block text-xs font-semibold mb-1">Upload Photo via ImgBB</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs" />
                    {uploading && <p className="text-xs text-brand-600 mt-1">Uploading...</p>}
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold mb-1">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold mb-1">Bio</label>
                    <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={saving || uploading}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}