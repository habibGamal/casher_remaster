import React from "react";
import SectionTitle from "../SectionTitle";
import { Descriptions, Empty, Tag } from "antd";
import ProductData from "../../Interfaces/ProductData";
import moment from "moment";
import Section from "../Section";

type Props = {
    productData?: ProductData;
};

export default function ProductInfo({ productData }: Props) {
    return (
        <Section className="w-full" title="بيانات المنتج">
            <div className="flex justify-center items-center">
                {productData ? (
                    <Descriptions className="w-full" bordered>
                        {extractProductInfo(productData!).map(
                            ({ label, value }) => (
                                <Descriptions.Item key={label} label={label}>
                                    {value}
                                </Descriptions.Item>
                            )
                        )}
                    </Descriptions>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>
        </Section>
    );
}

const extractProductInfo = (productData: ProductData) => [
    { label: "الاسم", value: productData.name },
    { label: "الكود", value: productData.barcode },
    { label: "الحد الادنى", value: productData.minimum_stock },
    {
        label: "اخر سعر شراء",
        value: (
            <Tag className="text-lg" color="volcano">
                {productData.last_buying_price}
            </Tag>
        ),
    },
    {
        label: "سعر البيع",
        value: (
            <Tag className="text-lg" color="green">
                {productData.selling_price}
            </Tag>
        ),
    },
    { label: "تاريخ الصلاحية", value: productData.has_expire_date },
    { label: "الوحدة", value: productData.unit },
    { label: "المجموعة", value: productData.product_group.name },
    {
        label: "تاريخ الانشاء",
        value: moment(productData.created_at).format("DD / MM / YYYY"),
    },
    {
        label: "تاريخ التعديل",
        value: moment(productData.updated_at).format("DD / MM / YYYY"),
    },
];
