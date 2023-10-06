import {
    Button,
    Col,
    Input,
    Modal,
    QRCode,
    Row,
    Switch,
    Typography,
} from "antd";
import React, { useContext, useState } from "react";
import PageTitle from "../Components/PageTitle";
import { router } from '@inertiajs/react';
import { themeToggler } from "../Layouts/ThemeLayer";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useModal from "../Hooks/useModal";

const SettingAction = ({
    actionName,
    title,
    btnText,
    danger,
}: {
    actionName: string;
    title: string;
    btnText: string;
    danger?: boolean;
}) => {
    const [loading, setLoading] = useState(false);
    const action = () => {
        setLoading(true);
        router.get(
            "/settings/" + actionName,
            {},
            {
                onSuccess: () => setLoading(false),
            }
        );
    };
    return (
        <div className="flex gap-4 items-center">
            <Typography.Text>{title}</Typography.Text>
            <Button
                loading={loading}
                type="primary"
                onClick={action}
                danger={danger}
            >
                {btnText}
            </Button>
        </div>
    );
};

const SettingInput = ({
    route,
    title,
    defaultValue,
}: {
    route: string;
    title: string;
    defaultValue: string;
}) => {
    const [loading, setLoading] = useState(false);
    const update = () => {
        setLoading(true);
        router.post(
            "/settings/" + route,
            {
                value,
            },
            {
                onSuccess: () => setLoading(false),
            }
        );
    };
    const [value, setValue] = useState(defaultValue);
    return (
        <div className="flex gap-4 items-center">
            <Typography.Text>{title}</Typography.Text>
            <Input
                value={value}
                className="max-w-[300px]"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <Button loading={loading} onClick={update} type="primary">
                تحديث
            </Button>
        </div>
    );
};

export default function Settings({ dns }: { dns: string }) {
    const theme = useContext(themeToggler);
    const darkTheme = (checked: boolean) => {
        theme?.toggleTheme(checked ? "dark" : "light");
    };
    const qrLinkToPhone = useModal();
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="الاعدادات" />
            <Col span="24" className="isolate">
                <div className="grid gap-8 grid-cols-2">
                    <div className="flex gap-4">
                        <Typography.Text>تفعيل الوضع المظلم</Typography.Text>
                        <Switch
                            defaultChecked={theme?.currentTheme == "dark"}
                            onChange={darkTheme}
                        />
                    </div>
                    <SettingAction
                        actionName="drop-database"
                        title="مسح قاعدة البيانات"
                        btnText="مسح"
                        danger
                    />

                    <SettingInput
                        route="update-dns"
                        title="DNS"
                        defaultValue={dns}
                    />
                    <Modal
                        title="QR Code Scanner"
                        open={qrLinkToPhone.open}
                        onOk={qrLinkToPhone.onOK}
                        onCancel={qrLinkToPhone.closeModal}
                    >
                        <QRCode
                            className="mx-auto my-8"
                            value={dns}
                        />
                    </Modal>
                    <div className="flex gap-4 items-center">
                        <Typography.Text>ربط النظام بالهاتف</Typography.Text>
                        <Button type="primary" onClick={()=>qrLinkToPhone.showModal()}>
                            عرض QR
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
