import React, { useMemo } from "react";
import { ModelDisplayBase } from "./bases/ModelDisplayBase";
import { Col, Row } from "antd";
import PageTitle from "./PageTitle";
import ModelConfig from "../interfaces/ModelConfig";
import ModelForm from "../interfaces/ModelForm";

export default function DisplayModel({
    config,
    ModelForm,
    className,
}: {
    config: ModelConfig;
    ModelForm?: ModelForm;
    className?: string;
}) {
    // why using memo here ?
    // this `new ModelDisplayBase(config)` is not that expensive to rerun but!
    // it initate all states and components and when this component
    // rerun for any reason this will cause the class recreated again
    // and recreate all states so we lose where we are
    // so saving it in memo will prevent its recreation
    const model = useMemo(
        () => new ModelDisplayBase(config, ModelForm),
        []
    );
    return (
        <Row gutter={[0, 25]} className={"m-8 " + className}>
            {config.pageTitle && <PageTitle name={config.pageTitle} />}
            <model.Ctx>
                <model.FreeModal />
                <model.ModalForm />
                <Col span="24" className="isolate">
                    <model.TableController />
                    <model.ModelTable />
                </Col>
            </model.Ctx>
        </Row>
    );
}
