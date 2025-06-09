import React, { useEffect, useRef, useState } from "react";

const FPSCounter: React.FC = () => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        let animationFrameId: number;

        const update = () => {
            const now = performance.now();
            frameCount.current += 1;

            if (now - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = now;
            }

            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const textColor = fps < 50 ? "#f00" : "#0f0";

    return (
        <div
            style={{
                position: "fixed",
                bottom: 10,
                right: 10,
                background: "rgba(0, 0, 0, 0.7)",
                color: textColor,
                padding: "6px 10px",
                borderRadius: "6px",
                fontFamily: "monospace",
                fontSize: "14px",
                zIndex: 9999,
                transition: "color 0.2s ease"
            }}
        >
            FPS: {fps}
        </div>
    );
};

export default FPSCounter;
