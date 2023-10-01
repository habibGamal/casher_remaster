import React, { useEffect } from "react";
import { router } from '@inertiajs/react';
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
    useEffect(() => {
        router.get("/products");
    }, []);
    return (
        <div className="w-full min-h-screen grid place-items-center">
            <Spin
                indicator={
                    <LoadingOutlined style={{ fontSize: "10rem" }} spin />
                }
            />
        </div>
    );
}
