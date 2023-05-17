import React from "react";
import { Divider } from "antd";
import { Typography } from "antd";
export default function PageTitle({ name }: { name: string }) {
    return (
        // <Divider
        //     orientation="left"
        //     className="font-bold before:bg-yellow-300 after:bg-yellow-300 dark:before:bg-dark-50 dark:after:bg-dark-50">
        //     {name}
        // </Divider>
        <Typography.Title level={4} className="mt-0">{name}</Typography.Title>
    );
}
