import { router } from "@inertiajs/react";
import { SetOptions } from "../Components/SelectSearch";
type Options = {
    id: number;
    name: string;
}[];
export default class SelectSearchUtils {
    static reload({
        slug,
        data,
        setOptions,
    }: {
        slug: string;
        data?: any;
        setOptions: SetOptions;
    }) {
        router.reload({
            only: [slug],
            data,
            onSuccess: (page: any) => {
                if (!page.props[slug]) return;
                const options = page.props[slug] as Options;
                setOptions(
                    options.map((option) => ({
                        value: option.id.toString(),
                        label: option.name,
                    }))
                );
            },
        });
    }

    static getProductGroups(value: string, setOptions: SetOptions) {
        SelectSearchUtils.reload({
            slug: "productGroups",
            data: { product_group_name: value },
            setOptions,
        });
    }

    static getProductByBarcode(value: string, setOptions: SetOptions) {
        SelectSearchUtils.reload({
            slug: "products",
            data: { barcode: value },
            setOptions,
        });
    }

    static getStocks(value: string, setOptions: SetOptions) {
        SelectSearchUtils.reload({
            slug: "stocks",
            data: { stock_name: value },
            setOptions,
        });
    }
}
