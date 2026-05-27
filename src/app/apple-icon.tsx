import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)",
                    color: "white",
                    fontFamily: "serif",
                    fontWeight: 700,
                    fontSize: 120,
                }}
            >
                S
            </div>
        ),
        size,
    );
}
