import React from "react";
import { Typography } from "antd";
export default function SectionTitle({ name }: { name: string }) {
    return (
        <Typography.Title level={5} className="mt-0 !mb-4">{name}</Typography.Title>
    );
}
