import Link from "next/link";
import { Calendar, MapPin, Monitor, Bookmark } from "lucide-react";
import { TuitionItem } from "@/types";

interface TuitionCardProps {
    tuition: TuitionItem;
    onBookmark?: (id: string) => void;
    isBookmarked?: boolean;
}

export default function TuitionCard({ tuition, onBookmark, isBookmarked }: TuitionCardProps) {
    return (
        <article className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition">
            <div>
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800">
                    <img
                        src={tuition.bannerImage || "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80"}
                        alt={tuition.title}
                        className="h-full w-full object-cover"
                    />
                    <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${tuition.mode === "Online"
                                ? "bg-emerald-600 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                    >
                        {tuition.mode}
                    </span>
                    {onBookmark && (
                        <button
                            type="button"
                            onClick={() => onBookmark(tuition._id)}
                            aria-label="Save tuition"
                            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-brand-600 transition"
                        >
                            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-brand-600 text-brand-600" : ""}`} />
                        </button>
                    )}
                </div>

                <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                        <span>{tuition.subject}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {tuition.classLevel}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {tuition.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {tuition.description}
                    </p>

                    <div className="pt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            {tuition.mode === "Online" ? (
                                <Monitor className="h-3.5 w-3.5 text-brand-600" />
                            ) : (
                                <MapPin className="h-3.5 w-3.5 text-brand-600" />
                            )}
                            <span>{tuition.location || tuition.mode}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-brand-600" />
                            <span>{tuition.daysPerWeek} days/week • Tutor: {tuition.tutorName}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">${tuition.monthlyFee}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400"> / month</span>
                </div>
                <Link
                    href={`/tuitions/${tuition._id}`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition"
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}