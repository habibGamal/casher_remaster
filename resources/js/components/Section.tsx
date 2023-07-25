import React from "react";
import SectionTitle from "./SectionTitle";

export default function Section({
    className = "",
    title,
    children,
}: {
    className?: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`isolate-2 p-8 gap-8 ${className}`}>
            <SectionTitle name={title} />
            {children}
        </div>
    );
}
