import Link from "next/link";

export default function AboutHowItWorksPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                How MentorLagbe Works
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                MentorLagbe brings students, tutors, and platform administrators into one structured workflow for discovering and managing academic tuition and mentorship batches.
            </p>
            <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <h2 className="font-bold text-base">For Students</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Sign up as a student, browse admin-approved tuitions by subject or mode, apply with your schedule, and track acceptance in real time.
                    </p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <h2 className="font-bold text-base">For Tutors</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Create tuition listings (up to 2 on the Free plan or unlimited on Pro), manage active/closed status, and accept or reject student applicants.
                    </p>
                </div>
            </div>
            <Link href="/tuitions" className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700">
                Explore Approved Tuitions
            </Link>
        </div>
    );
}