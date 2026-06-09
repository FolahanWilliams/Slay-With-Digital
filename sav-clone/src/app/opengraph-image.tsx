import { ImageResponse } from "next/og";

export const alt = "Sav — A non-judgemental third parent, in your pocket";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 96px",
                    background: "#FBF7F2",
                    fontFamily: "serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div style={{ fontSize: 48, color: "#1C1917", letterSpacing: -1 }}>
                        Sav
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontSize: 22,
                            color: "#78716C",
                            fontFamily: "sans-serif",
                        }}
                    >
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 999,
                                background: "#F59E0B",
                            }}
                        />
                        Early waitlist now open
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    <div
                        style={{
                            fontSize: 100,
                            lineHeight: 1.02,
                            color: "#1C1917",
                            letterSpacing: -2,
                        }}
                    >
                        A third parent.
                    </div>
                    <div
                        style={{
                            fontSize: 100,
                            lineHeight: 1.02,
                            fontStyle: "italic",
                            color: "#B45309",
                            letterSpacing: -2,
                        }}
                    >
                        In your pocket.
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        fontSize: 24,
                        color: "#57534E",
                        fontFamily: "sans-serif",
                    }}
                >
                    <div>A parenting coach for the AI era.</div>
                    <div>by Yetty Williams · LagosMums</div>
                </div>
            </div>
        ),
        size,
    );
}
