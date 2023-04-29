import ModelContext from "./ModelContext";

export interface ModelColumns {
    title: string;
    dataIndex?: string;
    key: string;
    sorting?: boolean;
    render?: (record: any) => JSX.Element;
    renderWithCtx?: (ctx: ModelContext<any>) => (record: any) => JSX.Element;
}

export default interface ModelConfig {
    modelColumns: ModelColumns[];
    pageTitle: string;
    search: {
        defaultValue: string;
        options: {
            label: string;
            value: string;
        }[];
    };
    addButton: string | null;
    exitSearchMode: (ctx: ModelContext<any>) => void;
    data?: (ctx: ModelContext<any>) => any;
    sorting: string[];
    slug: string;
    pagination: boolean;
    expandedRowRender?: (record: any) => JSX.Element;
}
