import { ImageResponse } from "next/og";
import { config } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${config.brand.name} — ${config.brand.tagline}`;

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#0b0b0c",
                    padding: 80,
                    color: "white",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: 56,
                            borderRadius: 14,
                            background: "#e11d2e",
                            fontSize: 34,
                            fontWeight: 800,
                        }}
                    >
                        S
                    </div>
                    <div style={{ display: "flex", gap: 9, fontSize: 30, fontWeight: 700 }}>
                        <span>Slay with</span>
                        <span style={{ color: "#e11d2e" }}>Digital</span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: 72,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: -2,
                        }}
                    >
                        <span>Use digital media to</span>
                        <span style={{ color: "#e11d2e" }}>grow your business.</span>
                    </div>
                    <div
                        style={{
                            marginTop: 28,
                            fontSize: 30,
                            color: "rgba(255,255,255,0.7)",
                        }}
                    >
                        Digital media marketing consultancy
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
