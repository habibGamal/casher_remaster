import React from "react";
import { Col, Row } from "antd";
import Navbar from "./views/components/Navbar";


function Layout(props: { children: JSX.Element }) {

    return (
        <Row wrap={false}>
            <Col>
                <Navbar  />
            </Col>
            <Col flex="auto">{props.children}</Col>
        </Row>
    );
}

export default Layout;
