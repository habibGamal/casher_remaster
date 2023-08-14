import React from "react";
import ThemeLayer from "./ThemeLayer";
import { Col, Row } from "antd";
import Navbar from "../Components/Navbar";

export default function AuthorizedLayout(props: { children: JSX.Element }) {
    return (
        <ThemeLayer>
            <Row wrap={false}>
                <Col>
                    <Navbar />
                </Col>
                <Col flex="auto">{props.children}</Col>
            </Row>
        </ThemeLayer>
    );
}
