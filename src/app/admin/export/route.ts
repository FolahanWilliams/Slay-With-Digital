import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { ADMIN_COOKIE, sessionValid } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
    const s = value == null ? "" : String(value);
    // Guard against CSV injection in spreadsheet apps.
    const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
    return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    if (!sessionValid(token)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return new NextResponse("Database not connected", { status: 503 });
    }

    const { data, error } = await supabase
        .from("sav_waitlist")
        .select("email, phone, children_ages, referral_source, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return new NextResponse(error.message, { status: 500 });
    }

    const header = ["email", "phone", "children_ages", "referral_source", "created_at"];
    const rows = (data ?? []).map((r) =>
        [
            r.email,
            r.phone ?? "",
            Array.isArray(r.children_ages) ? r.children_ages.join("; ") : "",
            r.referral_source ?? "",
            r.created_at,
        ]
            .map(csvCell)
            .join(","),
    );
    const csv = [header.map(csvCell).join(","), ...rows].join("\r\n");

    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="sav-waitlist-${date}.csv"`,
        },
    });
}
