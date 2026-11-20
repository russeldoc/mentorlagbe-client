import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white">
                        <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                            <GraduationCap className="h-4 w-4" />
                        </span>
                        <span>MentorLagbe</span>
                    </Link>
                    <p className="mt-3 text-sm leading-relaxed">
                        Smart tuition finder and mentorship batch platform connecting verified educators with motivated learners.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Quick Links
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
                        <li><Link href="/tuitions" className="hover:text-brand-600">Browse Tuitions</Link></li>
                        <li><Link href="/pricing" className="hover:text-brand-600">Pricing & Pro Plans</Link></li>
                        <li><Link href="/about" className="hover:text-brand-600">How It Works</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Contact
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-600" /> support@mentorlagbe.com</li>
                        <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-600" /> +880 1700-000000</li>
                        <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-600" /> Dhaka, Bangladesh</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Connect With Us
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                        {/* New X Brand Logo */}
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Follow MentorLagbe on X"
                            className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 hover:border-brand-600 hover:text-brand-600 transition"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 py-5 text-center text-xs">
                © {new Date().getFullYear()} MentorLagbe. All rights reserved.
            </div>
        </footer>
    );
}