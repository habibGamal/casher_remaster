import React from "react";
import { Divider } from "antd";
import { Typography } from "antd";
export default function PageTitle({ name }: { name: string }) {
    return (
        <Typography.Title level={4} className="mt-0">{name}</Typography.Title>
    );
}
