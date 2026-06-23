import { cookies } from "next/headers";
import type { Metadata } from "next";

import { getSupabaseAdmin } from "@/lib/supabase";
import { ADMIN_COOKIE, adminConfigured, sessionValid } from "@/lib/admin";

export const metadata: Metadata = {
    title: "Waitlist admin",
    robots: { index: false, follow: false },
};

// Always render fresh — never cache signup data.
export const dynamic = "force-dynamic";

type Signup = {
    id: string;
    email: string;
    phone: string | null;
    children_ages: string[] | null;
    referral_source: string | null;
    created_at: string;
};

function LoginScreen({ error }: { error?: boolean }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FBF7F2] px-6">
            <form
                action="/admin/auth"
                method="post"
                className="w-full max-w-sm rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
                <h1 className="font-heading text-2xl tracking-tight text-neutral-900">
                    Waitlist admin
                </h1>
                <p className="mt-1.5 text-sm text-neutral-500">
                    Enter the admin password to view signups.
                </p>
                <input type="hidden" name="action" value="login" />
                <input
                    type="password"
                    name="password"
                    autoFocus
                    required
                    placeholder="Password"
                    className="mt-5 w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                />
                {error && (
                    <p className="mt-2 pl-1 text-sm text-red-600">Incorrect password.</p>
                )}
                <button
                    type="submit"
                    className="mt-5 w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Sign in
                </button>
            </form>
        </main>
    );
}

function Notice({ title, body }: { title: string; body: string }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FBF7F2] px-6">
            <div className="max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <h1 className="font-heading text-2xl tracking-tight text-neutral-900">{title}</h1>
                <p className="mt-3 leading-relaxed text-neutral-600">{body}</p>
            </div>
        </main>
    );
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    if (!adminConfigured()) {
        return (
            <Notice
                title="Admin not configured"
                body="Set the ADMIN_PASSWORD environment variable (locally in .env.local and in Vercel) to enable this page."
            />
        );
    }

    const { error } = await searchParams;
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    if (!sessionValid(token)) {
        return <LoginScreen error={error === "1"} />;
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return (
            <Notice
                title="Database not connected"
                body="SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set, so there's nothing to show yet."
            />
        );
    }

    const { data, error: queryError } = await supabase
        .from("sav_waitlist")
        .select("id, email, phone, children_ages, referral_source, created_at")
        .order("created_at", { ascending: false })
        .limit(1000);

    if (queryError) {
        return (
            <Notice
                title="Couldn't load signups"
                body={queryError.message}
            />
        );
    }

    const signups = (data ?? []) as Signup[];

    return (
        <main className="min-h-screen bg-[#FBF7F2] px-6 py-10 md:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-3xl tracking-tight text-neutral-900">
                            Waitlist signups
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500">
                            {signups.length} {signups.length === 1 ? "person" : "people"} so far
                            {signups.length >= 1000 ? " (showing latest 1,000)" : ""}.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/admin/export"
                            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900"
                        >
                            Export CSV
                        </a>
                        <form action="/admin/auth" method="post">
                            <input type="hidden" name="action" value="logout" />
                            <button
                                type="submit"
                                className="rounded-full px-4 py-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>

                {signups.length === 0 ? (
                    <p className="mt-12 text-center text-neutral-500">
                        No signups yet. They&apos;ll appear here as people join.
                    </p>
                ) : (
                    <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Email</th>
                                    <th className="px-5 py-3 font-medium">Phone</th>
                                    <th className="px-5 py-3 font-medium">Children&apos;s ages</th>
                                    <th className="px-5 py-3 font-medium">Heard via</th>
                                    <th className="px-5 py-3 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {signups.map((s) => (
                                    <tr
                                        key={s.id}
                                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50"
                                    >
                                        <td className="px-5 py-3 font-medium text-neutral-900">
                                            <a
                                                href={`mailto:${s.email}`}
                                                className="underline-offset-4 hover:underline"
                                            >
                                                {s.email}
                                            </a>
                                        </td>
                                        <td className="px-5 py-3 text-neutral-700">
                                            {s.phone ?? "—"}
                                        </td>
                                        <td className="px-5 py-3 text-neutral-700">
                                            {s.children_ages && s.children_ages.length > 0
                                                ? s.children_ages.join(", ")
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3 text-neutral-700">
                                            {s.referral_source ?? "—"}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3 text-neutral-500">
                                            {formatDate(s.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}
