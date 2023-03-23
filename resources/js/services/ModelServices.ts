import TableGlobalSettings from "../interfaces/TableGlobalSettings";

import FormGlobalSettings from "../interfaces/FormGlobalSettings";
import { ErrorBag, Errors, Inertia } from "@inertiajs/inertia";
import { message } from "antd";

export default class ModelServices<T> {
    private tableGlobalSettings?: TableGlobalSettings;

    static setTableGlobalSettings<T>(tableGlobalSettings: TableGlobalSettings) {
        const instance = new this<T>();
        instance.tableGlobalSettings = tableGlobalSettings;
        return instance;
    }

    private extractDataFromTableGlobalSettings() {
        const settings = this.tableGlobalSettings!;
        if (settings.sortInfo) {
            const {
                stateLoading,
                sortInfo: { order, columnKey },
                ...remaining
            } = settings;
            return { columnKey, order, ...remaining };
        } else {
            const { stateLoading, ...remaining } = settings;
            return remaining;
        }
    }

    private preNamingData(slug: string, data: { [key: string]: any }) {
        const dataWithSlug: { [key: string]: any } = {};
        for (const key in data) {
            dataWithSlug[slug + "_" + key] = data[key];
        }
        return dataWithSlug;
    }

    private getTableDataSettings(slug: string) {
        return this.preNamingData(
            slug,
            this.extractDataFromTableGlobalSettings()
        );
    }

    public updateTableData(slug: string) {
        if (!this.tableGlobalSettings) return;
        Inertia.reload({
            only: [slug],
            data: {
                ...this.getTableDataSettings(slug),
            },
            ...this.tableGlobalSettings.stateLoading,
            preserveState: true,
        });
    }

    private formGlobalSettings?: FormGlobalSettings;

    static setFormGlobalSettings<T>(tableGlobalSettings: FormGlobalSettings) {
        const instance = new this<T>();
        instance.formGlobalSettings = tableGlobalSettings;
        return instance;
    }

    public update(baseRoute: string) {
        if (this.formGlobalSettings === undefined) return;
        if (!this.formGlobalSettings.modelId) return;
        Inertia.post(
            `${baseRoute}/update/${this.formGlobalSettings.modelId}`,
            this.formGlobalSettings.formValues,
            {
                ...this.formGlobalSettings.stateLoading,
                onSuccess: () => {
                    message.success("تم التعديل بنجاح");
                    this.formGlobalSettings!.closeFormModal();
                },
                onError: (errors: any) => {
                    this.formGlobalSettings!.setErrors(
                        errors as Errors & ErrorBag
                    );
                },
            }
        );
    }

    public create(baseRoute: string) {
        if (this.formGlobalSettings === undefined) return;
        Inertia.post(`${baseRoute}/store`, this.formGlobalSettings.formValues, {
            ...this.formGlobalSettings.stateLoading,
            onSuccess: () => {
                message.success("تمت الاضافة بنجاح");
                this.formGlobalSettings!.form.resetFields();
            },
            onError: (errors: any) => {
                this.formGlobalSettings!.setErrors(errors as Errors & ErrorBag);
            },
        });
    }

    static delete(id: number,baseRoute: string) {
        Inertia.delete(`${baseRoute}/${id}`, {
            onSuccess: () => {
                message.success("تم الحذف بنجاح");
            },
            onError: () => {
                message.error("حدث خطأ ما");
            },
            preserveState: true,
        });
    }
}
