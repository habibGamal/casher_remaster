import { ErrorBag, Errors, Inertia } from "@inertiajs/inertia";
import { FormInstance, message } from "antd";
import { ProductWithProductGroup } from "../interfaces/Product";
import { SetOptions } from "../views/components/SelectSearch";
import StateLoading from "../types/StateLoading";
const BASE_ROUTE = "/product-groups";
export default class ProductGroupServices {
    // routing
    static index() {
        Inertia.get(`${BASE_ROUTE}`);
    }

    static indexPreserveState() {
        Inertia.visit(`${BASE_ROUTE}`, { preserveState: true });
    }

    static search(
        searchValue: string,
        attribute: string,
        stateLoading: StateLoading
    ) {
        Inertia.visit(`${BASE_ROUTE}/search`, {
            data: { search: searchValue, attribute },
            preserveState: true,
            ...stateLoading,
        });
    }

    static create(values: any) {
        Inertia.post(`${BASE_ROUTE}/store`, values);
    }

    static delete(id: number) {
        Inertia.delete(`${BASE_ROUTE}/${id}`, {
            onSuccess: () => {
                message.success("تم الحذف بنجاح");
            },
            onError: () => {
                message.error("حدث خطأ ما");
            },
            preserveState: true,
        });
    }

    // set form settings to handle updates and create
    private formSettings?: ProductGroupFormSettings;

    public setFormSettings(formSettings: ProductGroupFormSettings) {
        this.formSettings = formSettings;
    }

    public update() {
        if (this.formSettings === undefined) return;
        if (!this.formSettings.modelToEdit) return;
        Inertia.post(
            `${BASE_ROUTE}/update/${this.formSettings.modelToEdit.id}`,
            this.formSettings.formValues,
            {
                ...this.formSettings.stateLoading,
                onSuccess: () => {
                    message.success("تم تعديل الصنف بنجاح");
                    this.formSettings!.closeModal();
                },
                onError: (errors: any) => {
                    this.formSettings!.setErrors(errors as Errors & ErrorBag);
                },
            }
        );
    }

    public create() {
        if (this.formSettings === undefined) return;
        Inertia.post(`${BASE_ROUTE}/store`, this.formSettings.formValues, {
            ...this.formSettings.stateLoading,
            onSuccess: () => {
                message.success("تم اضافة الصنف بنجاح");
                this.formSettings!.form.resetFields();
            },
            onError: (errors: any) => {
                this.formSettings!.setErrors(errors as Errors & ErrorBag);
            },
        });
    }

    // set table paginate settings to handle pagination and search-pagination
    private tablePaginateSettings?: ProductGroupTablePaginateSettings;

    public setTablePaginateSettings(
        tablePaginateSettings: ProductGroupTablePaginateSettings
    ) {
        this.tablePaginateSettings = tablePaginateSettings;
    }

    public searchPaginate() {
        if (!this.tablePaginateSettings) return;
        Inertia.visit(`${BASE_ROUTE}/search`, {
            only: ["paginate"],
            data: {
                search: this.tablePaginateSettings.search,
                attribute: this.tablePaginateSettings.attribute,
                page: this.tablePaginateSettings.page,
                pageSize: this.tablePaginateSettings.pageSize,
                ...this.tablePaginateSettings.sortInfo,
            },
            preserveState: true,
            ...this.tablePaginateSettings.stateLoading,
        });
    }

    public paginate() {
        if (!this.tablePaginateSettings) return;
        Inertia.visit(BASE_ROUTE, {
            only: ["paginate"],
            data: {
                page: this.tablePaginateSettings.page,
                pageSize: this.tablePaginateSettings.pageSize,
                ...this.tablePaginateSettings.sortInfo,
            },
            preserveState: true,
            ...this.tablePaginateSettings.stateLoading,
        });
    }

    // fetching custom data with reloads
    static selectSearchProductGroup(
        value: string,
        onSuccess: (page: any) => void
    ) {
        Inertia.reload({
            only: ["productGroups"],
            data: {
                product_group_name: value,
            },
            onSuccess: (page: any) => onSuccess(page),
        });
    }
}

export class ProductGroupFormSettings {
    constructor(
        public modelToEdit: ProductWithProductGroup | undefined,
        public form: FormInstance<any>,
        public formValues: any,
        public stateLoading: StateLoading,
        public closeModal: () => void,
        public setErrors: (errors: Errors & ErrorBag) => void
    ) {}
}

export class ProductGroupTablePaginateSettings {
    constructor(
        public page: number,
        public pageSize: number,
        public sortInfo: {
            order: string | null;
            columnKey: React.Key | null;
        },
        public stateLoading: StateLoading,
        public search: string,
        public attribute: string
    ) {}
}
