export default function GlobalLoading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
            <div className="h-11 w-11 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Loading MentorLagbe...
            </p>
        </div>
    );
}