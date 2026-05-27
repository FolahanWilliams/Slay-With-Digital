import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
                    fontSize: 22,
                    borderRadius: 8,
                }}
            >
                S
            </div>
        ),
        size,
    );
}
