// Lightweight, fire-and-forget funnel analytics. Events are stored in the
// Supabase `sav_events` table via /api/track. Never blocks or disrupts the UI.

const sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

export type TrackEvent =
    | "page_view"
    | "modal_opened"
    | "step_completed"
    | "signup_completed";

export function track(event: TrackEvent, meta?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;
    try {
        void fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event, sessionId, ...meta }),
            keepalive: true,
        });
    } catch {
        // analytics is best-effort
    }
}
