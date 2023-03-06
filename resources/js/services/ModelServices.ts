import TableGlobalSettings from "../interfaces/TableGlobalSettings";

import FormGlobalSettings from "../interfaces/FormGlobalSettings";
import { Inertia } from "@inertiajs/inertia";

export default class ModelServices<T> {
    private tableGlobalSettings?: TableGlobalSettings;

    static setTableGlobalSettings<T>(tableGlobalSettings: TableGlobalSettings) {
        const instance = new this<T>();
        instance.tableGlobalSettings = tableGlobalSettings;
        return instance;
    }

    private extractDataFromTableGlobalSettings() {
        const {
            stateLoading,
            sortInfo: { order, columnKey },
            ...remaining
        } = this.tableGlobalSettings!;

        return { columnKey, order, ...remaining };
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

    private formGlobalSettings?: FormGlobalSettings<T>;

    static setFormGlobalSettings<T>(
        tableGlobalSettings: FormGlobalSettings<T>
    ) {
        const instance = new this<T>();
        instance.formGlobalSettings = tableGlobalSettings;
        return instance;
    }
}
