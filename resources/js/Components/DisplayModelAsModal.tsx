import React, { useMemo } from "react";
import { ModelDisplayBase } from "./Bases/ModelDisplayBase";
import { Col, Row } from "antd";
import ModelConfig from "../Interfaces/ModelConfig";

export default function DisplayModelAsModal({config}:{config:ModelConfig}) {
    // why using memo here ?
    // this `new ModelDisplayBase(config)` is not that expensive to rerun but!
    // it initate all states and components and when this component
    // rerun for any reason this will cause the class recreated again
    // and recreate all states so we lose where we are
    // so saving it in memo will prevent its recreation
    const model = useMemo(() => new ModelDisplayBase(config), []);
    return (
        <Row gutter={[0, 25]} className="m-8">
            <model.Ctx>
                <Col span="24" className="isolate">
                    <model.TableController />
                    <model.ModelTable />
                </Col>
            </model.Ctx>
        </Row>
    );
}
