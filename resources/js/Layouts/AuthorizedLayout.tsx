import React from "react";
import ThemeLayer from "./ThemeLayer";
import { Col, FloatButton, Modal, QRCode, Row } from "antd";
import Navbar from "../Components/Navbar";
import useModal from "../Hooks/useModal";
import logo from "../../assets/images/logo.png";

export default function AuthorizedLayout(props: { children: JSX.Element }) {
    const qrNewScannerModal = useModal();
    const [qrScannerCode, setQrScannerCode] = React.useState<string | null>(
        null
    );
    const requestScannerCode = async () => {
        qrNewScannerModal.showModal();
        const response = await fetch("/get-scanner-code", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(JSON.stringify(data));
        setQrScannerCode(JSON.stringify(data));
    };
    return (
        <ThemeLayer>
            <Row wrap={false}>
                <Modal
                    title="QR Code Scanner"
                    open={qrNewScannerModal.open}
                    onOk={qrNewScannerModal.handleOk}
                    onCancel={qrNewScannerModal.closeModal}
                >
                    <QRCode
                        className="mx-auto my-8"
                        value={qrScannerCode || ""}
                        status={qrScannerCode ? "active" : "loading"}
                    />
                </Modal>
                <Col>
                    <Navbar />
                </Col>
                <Col flex="auto">{props.children}</Col>
                <FloatButton onClick={() => requestScannerCode()} />
            </Row>
        </ThemeLayer>
    );
}
