import { Empty, Input, Row, Table, Tag } from "antd";
import React from "react";
import PageTitle from "../../Components/PageTitle";
import Section from "../../Components/Section";
import { Area, Pie, measureTextWidth } from "@ant-design/charts";
interface SalesData {
    selling_data: {
        cash: number;
        quantity: number;
        time: string;
    }[];
    return_selling_data: {
        cash: number;
        quantity: number;
        time: string;
    }[];
    net_selling_data: {
        cash: number;
        quantity: number;
        time: string;
    }[];
    products_selling_data: {
        [key: string]: {
            cash: number;
            quantity: number;
            product_id: number;
            product_name: string;
        };
    };
    products_return_selling_data: {
        [key: string]: {
            cash: number;
            quantity: number;
            product_id: number;
            product_name: string;
        };
    };
    products_net_selling_data: {
        [key: string]: {
            cash: number;
            quantity: number;
            product_id: number;
            product_name: string;
        };
    };
    total_quantity_of_selling_products: number;
    total_cash_of_selling_products: number;
    total_quantity_of_return_selling_products: number;
    total_cash_of_return_selling_products: number;
    total_quantity_of_net_selling_products: number;
    total_cash_of_net_selling_products: number;
    total_number_of_selling_invoices: number;
    total_number_of_return_selling_invoices: number;
}

export default function SalesReports({ data }: { data: SalesData }) {
    const green = "#86efac";
    const red = "#991b1b";
    const blue = "#93c5fd";
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="تقارير المبيعات" />
            {/* <div className="isolate-2 border border-indigo-400 w-full">
                input here
            </div> */}
            <div className="grid grid-cols-2 w-full gap-5">
                <RenderGraph
                    title="معدل المبيعات (نقود) "
                    data={data.selling_data}
                    xField="time"
                    yField="cash"
                    color={green}
                />
                <RenderGraph
                    title="معدل المبيعات (كمية)"
                    data={data.selling_data}
                    xField="time"
                    yField="quantity"
                    color={green}
                />
                <RenderGraph
                    title="معدل عمليات الارتجاع (نقود) "
                    data={data.return_selling_data}
                    xField="time"
                    yField="cash"
                    color={red}
                />
                <RenderGraph
                    title="معدل عمليات الارتجاع (كمية)"
                    data={data.return_selling_data}
                    xField="time"
                    yField="quantity"
                    color={red}
                />
                <RenderGraph
                    title="صافي عمليات البيع (نقود) "
                    data={data.net_selling_data}
                    xField="time"
                    yField="cash"
                    color={blue}
                />
                <RenderGraph
                    title="صافي عمليات البيع (كمية)"
                    data={data.net_selling_data}
                    xField="time"
                    yField="quantity"
                    color={blue}
                />
                <RenderTable
                    title="مابيعات المنتجات"
                    data={Object.values(data.products_selling_data).map(
                        (item) => ({
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.cash,
                        })
                    )}
                />
                <RenderPie
                    title="مابيعات المنتجات"
                    data={Object.values(data.products_selling_data).map(
                        (item) => ({
                            type: item.product_name,
                            value: item.quantity,
                        })
                    )}
                />
                <RenderTable
                    title="مرتجع المنتجات"
                    data={Object.values(data.products_return_selling_data).map(
                        (item) => ({
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.cash,
                        })
                    )}
                />
                <RenderPie
                    title="مرتجع المنتجات"
                    data={Object.values(data.products_return_selling_data).map(
                        (item) => ({
                            type: item.product_name,
                            value: item.quantity,
                        })
                    )}
                />
                <RenderTable
                    title="صافي مابيعات المنتجات"
                    data={Object.values(data.products_net_selling_data).map(
                        (item) => ({
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.cash,
                        })
                    )}
                />
                <RenderPie
                    title="صافي مابيعات المنتجات"
                    data={Object.values(data.products_net_selling_data).map(
                        (item) => ({
                            type: item.product_name,
                            value: item.quantity,
                        })
                    )}
                />
            </div>
        </Row>
    );
}

const RenderGraph = ({
    title,
    data,
    xField,
    yField,
    color,
}: {
    title: string;
    data: any[];
    xField: string;
    yField: string;
    color?: string;
}) => {
    const config = (data: any[]) => ({
        data: data ?? [],
        xField: xField,
        yField: yField,
        xAxis: {
            tickCount: 5,
        },
        animation: false,
        slider: {
            start: 0.1,
            end: 0.9,
            trendCfg: {
                isArea: true,
            },
        },
    });
    return (
        <Section title={title}>
            {data ? (
                <>
                    <div className="m-24"></div>
                    <Area className="ltr" {...config(data)} color={color} />
                </>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </Section>
    );
};
const RenderPie = ({ title, data }: { title: string; data: any[] }) => {
    const totalCount = data.reduce((acc, item) => acc + item.value, 0);
    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(
            text,
            style
        );
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(
                Math.sqrt(
                    Math.abs(
                        Math.pow(R, 2) /
                            (Math.pow(textWidth / 2, 2) +
                                Math.pow(textHeight, 2))
                    )
                ),
                1
            );
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div class="font-color" style="${textStyleStr};font-size:${scale}em;line-height:${
            scale < 1 ? 1 : "inherit"
        };">${text}</div>`;
    }
    const config = (data: any[]) => ({
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `${v} قطعة`,
            },
        },

        label: {
            type: "inner",
            offset: "-50%",
            style: {
                textAlign: "center",
                fontSize: 18,
            },
            autoRotate: false,
            content: (item) =>
                ((item.value / totalCount) * 100).toFixed(2) + "%",
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(
                        Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
                    );
                    const text = datum ? datum.type : "الاجمالي";
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: "32px",
                },
                customHtml: (container, view, datum, data) => {
                    console.log(datum, data);
                    const { width } = container.getBoundingClientRect();
                    const text = datum
                        ? `${datum.value} قطعة`
                        : `${data.reduce(
                              (acc, item) => acc + item.value,
                              0
                          )} قطعة`;
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
                },
            },
        },
        legend: {
            position: "right",
            title: {
                text: "المنتجات",
                spacing: 50,
                style: {
                    fontSize: 18,
                    fill: "#fff",
                    textAlign: "left",
                },
            },
            itemName: {
                style: {
                    fontSize: 24,
                    fill: "#fff",
                },
            },
        },
        interactions: [
            {
                type: "element-selected",
            },
            {
                type: "element-active",
            },
            {
                type: "pie-statistic-active",
            },
        ],
    });
    return (
        <Section title={title}>
            {data ? (
                <>
                    <div className="m-24"></div>
                    <Pie className="ltr" {...config(data)} />
                </>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </Section>
    );
};

function RenderTable({ title, data }: { title: string; data: any[] }) {
    const columns = [
        {
            title: "اسم المنتج",
            dataIndex: "product_name",
            key: "product_name",
        },
        {
            title: "الكمية",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number) => (
                <Tag className="text-lg border-none" color="blue">
                    {quantity}
                </Tag>
            ),
        },
        {
            title: "حجم المبيعات",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <Tag className="text-lg" color="default">
                    {price} جنيه
                </Tag>
            ),
        },
    ];

    return (
        <Section title={title}>
            <Table columns={columns} dataSource={data} />
        </Section>
    );
}
