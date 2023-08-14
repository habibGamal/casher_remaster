import { Button, Col, Row, Switch, Typography } from "antd";
import React, { useContext, useState } from "react";
import PageTitle from "../Components/PageTitle";
import { themeToggler } from "../Layout";
import { Inertia } from "@inertiajs/inertia";

export default function Settings() {
    const theme = useContext(themeToggler);
    const darkTheme = (checked: boolean) => {
        theme?.toggleTheme(checked ? "dark" : "light");
    };
    const [loading, setLoading] = useState(false);
    const remigrate = () => {
        setLoading(true);
        Inertia.reload({
            only: ["remigrate"],
            preserveState: true,
            onSuccess: () => setLoading(false),
        });
    };
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="الاعدادات" />
            <Col span="24" className="isolate">
                <div className="grid grid-cols-2">
                    <div className="flex gap-4">
                        <Typography.Text>تفعيل الوضع المظلم</Typography.Text>
                        <Switch
                            defaultChecked={theme?.currentTheme == "dark"}
                            onChange={darkTheme}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Typography.Text>مسح كل البيانات</Typography.Text>
                        <Button
                            loading={loading}
                            type="primary"
                            onClick={remigrate}
                            danger
                        >
                            مسح
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
