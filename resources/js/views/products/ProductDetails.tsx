import { Empty, Input, Row, Select } from "antd";
import React from "react";
import PageTitle from "../../Components/PageTitle";
import useSearch from "../../Hooks/useSearch";
import { Inertia, PageProps } from "@inertiajs/inertia";
import { hasErr } from "../../Helpers/errorHandlers";
import { Area } from "@ant-design/charts";
import ProductInfo from "../../Components/ProductDetails/ProductInfo";
import Section from "../../Components/Section";
import ProductData from "../../Interfaces/ProductData";
import QuantitiesInStocks from "../../Components/ProductDetails/QuantitiesInStocks";
import moment from "moment";
import SellInvoices from "../../Components/ProductDetails/SellInvoices";
import ReturnSellInvoices from "../../Components/ProductDetails/ReturnSellInvoices";
import { usePage } from "@inertiajs/inertia-react";
import BuyInvoices from "../../Components/ProductDetails/BuyInvoices";
import ReturnBuyInvoices from "../../Components/ProductDetails/ReturnBuyInvoices";

export default function ProductDetails() {
    const search = useSearch();
    const { productData: initProductData } = usePage().props as PageProps;
    const [productData, setProductData] = React.useState<ProductData>(
        initProductData as ProductData
    );
    const onSearch = () => {
        Inertia.reload({
            data: {
                ...search.data,
            },
            only: ["productData"],
            preserveState: true,
            onSuccess: (page) => {
                let productData = page.props.productData as ProductData;
                if (hasErr(productData)) return;
                console.log(productData);
                setProductData(productData);
            },
        });
    };
    const data = productData?.buyingInvoicesItems.map((item) => ({
        day: moment(item.created_at).format("DD / MM / YYYY"),
        quantity: item.quantity,
    }));

    const config = {
        data: data ?? [],
        xField: "day",
        yField: "quantity",
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
    };
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="عرض تفاصيل المنتج" />
            <div className="isolate-2 border border-indigo-400 w-full">
                <Input
                    id="search_product"
                    allowClear
                    addonBefore={
                        <Select
                            defaultValue={search.data.attribute}
                            onChange={search.changeSearchAttribute}
                            options={[
                                {
                                    label: "الاسم",
                                    value: "name",
                                },
                                {
                                    label: "الكود",
                                    value: "barcode",
                                },
                            ]}
                        />
                    }
                    placeholder="المنتج"
                    className="placeholder:font-tajawal"
                    value={search.data.value}
                    onChange={(e) => {
                        search.changeSearchValue(e.target.value);
                    }}
                    onPressEnter={onSearch}
                />
            </div>
            <ProductInfo productData={productData} />
            <div className="flex items-start w-full gap-8">
                <QuantitiesInStocks productData={productData} />
                <Section className="w-1/2" title="معدل المبيعات">
                    {productData ? (
                        <>
                            <div className="m-24"></div>
                            <Area {...config} />
                        </>
                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </Section>
            </div>
            <div className="flex items-start w-full gap-8">
                <SellInvoices productData={productData} />
                <ReturnSellInvoices productData={productData} />
            </div>
            <div className="flex items-start w-full gap-8">
                <BuyInvoices productData={productData} />
                <ReturnBuyInvoices productData={productData} />
            </div>
        </Row>
    );
}
