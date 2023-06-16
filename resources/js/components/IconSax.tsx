import React, { useEffect, useRef } from "react";
interface IconSaxProps {
    icon: string;
    className?: string;
    dir?: string;
}
export default function IconSax({
    icon,
    className = "",
    dir = "linear",
}: IconSaxProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const loadIcon = async () => {
            const svg = await import(
                `../../assets/icons/${dir}/${icon}.svg`
            );
            imgRef.current!.src = svg.default;
        };
        loadIcon();
    });
    return (
        <img
            ref={imgRef}
            className={"aspect-square dark:invert " + className}
        />
    );
}
