export default function StatCard({
    label,
    value,
    subtext,
}: {
    label: string;
    value: string | number;
    subtext?: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {label}
            </p>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {value}
            </p>
            {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
        </div>
    );
}