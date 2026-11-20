"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    BookMarked,
    Users,
    CheckSquare,
    CreditCard,
    UserCog,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
    Home,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    // Only redirect after auth state finishes loading
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/sign-in");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
                Loading workspace...
            </div>
        );
    }

    if (!user) return null;

    const navItems =
        user.role === "admin"
            ? [
                { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
                { href: "/dashboard/admin/users", label: "Users", icon: Users },
                { href: "/dashboard/admin/tuitions", label: "Moderate Tuitions", icon: CheckSquare },
                { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard },
            ]
            : user.role === "tutor"
                ? [
                    { href: "/dashboard/tutor", label: "Overview", icon: LayoutDashboard },
                    { href: "/dashboard/tutor/post-tuition", label: "Post Tuition", icon: PlusCircle },
                    { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: BookMarked },
                    { href: "/dashboard/tutor/applicants", label: "Applicants", icon: Users },
                ]
                : [
                    { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
                    { href: "/dashboard/student/my-applications", label: "My Applications", icon: FileText },
                    { href: "/dashboard/student/saved", label: "Saved Tuitions", icon: BookMarked },
                ];

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside
                className={`${collapsed ? "w-20" : "w-64"
                    } shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transition-all`}
            >
                <div>
                    <div className="h-16 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        {!collapsed && (
                            <Link href="/" className="font-extrabold text-base text-brand-600">
                                MentorLagbe
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={() => setCollapsed((c) => !c)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                        </button>
                    </div>

                    <nav className="p-3 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active
                                            ? "bg-brand-600 text-white"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            );
                        })}

                        <Link
                            href="/dashboard/profile"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${pathname === "/dashboard/profile"
                                    ? "bg-brand-600 text-white"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            <UserCog className="h-4 w-4 shrink-0" />
                            {!collapsed && <span>Update Profile</span>}
                        </Link>
                    </nav>
                </div>

                <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <Home className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>Public Site</span>}
                    </Link>
                    <button
                        type="button"
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                    >
                        <LogOut className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                            {user.role}
                        </span>
                        <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                            {user.plan} plan
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <img
                            src={user.image || "https://i.ibb.co/placeholder-avatar.png"}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-semibold hidden sm:inline">{user.name}</span>
                    </div>
                </header>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}