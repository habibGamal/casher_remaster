import React from "react";
import ThemeLayer from "./ThemeLayer";
import { Col, Row, Typography } from "antd";
import Navbar from "../Components/Navbar";

export default function GuestLayout(props: { children: JSX.Element ,title:string}) {
    return (
        <ThemeLayer>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-header">
                                <Typography.Title level={2} className="text-center">
                                {props.title}
                                </Typography.Title>
                            </div>
                            <div className="card-body">{props.children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeLayer>
    );
}
