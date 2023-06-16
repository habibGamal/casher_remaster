import { Col, Row, Switch, Typography } from "antd";
import React, { useContext } from "react";
import PageTitle from "../components/PageTitle";
import { themeToggler } from "../Layout";

export default function Settings() {
    const theme = useContext(themeToggler);
    const darkTheme = (checked: boolean) => {
        theme?.toggleTheme(checked ? "dark" : "light");
    };
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="الاعدادات" />
            <Col span="24" className="isolate">
                <div className="flex gap-4">
                    <Typography.Text>تفعيل الوضع المظلم</Typography.Text>
                    <Switch
                        defaultChecked={theme?.currentTheme == "dark"}
                        onChange={darkTheme}
                    />
                </div>
            </Col>
        </Row>
    );
}
