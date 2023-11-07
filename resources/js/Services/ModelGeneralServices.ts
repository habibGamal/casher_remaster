import TableGlobalSettings from "../Interfaces/TableGlobalSettings";
import FormGlobalSettings from "../Interfaces/FormGlobalSettings";
import { router } from "@inertiajs/react";
import { message } from "antd";

export default class ModelGeneralServices<T> {
    // this property is used to store many settings for table
    // to work , it holds pagination settings
    // like page number , page size and sort info
    // search info which includes search value and attribute to search in
    // and state loading which is used to show loading state
    private tableGlobalSettings?: TableGlobalSettings;

    // static constructor to set table global settings and get instance of this class
    static setTableGlobalSettings<T>(tableGlobalSettings: TableGlobalSettings) {
        const instance = new this<T>();
        instance.tableGlobalSettings = tableGlobalSettings;
        return instance;
    }

    // this is a simple function to flatten the settings object if required and
    // remove `stateLoading` property
    private flattenTableGlobalSettings() {
        const settings = this.tableGlobalSettings!;
        // flatten sortInfo object if it exists
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

    private addSlug(slug: string, data: { [key: string]: any }) {
        const dataWithSlug: { [key: string]: any } = {};
        for (const key in data) {
            dataWithSlug[slug + "_" + key] = data[key];
        }
        return dataWithSlug;
    }

    private getTableGlobalSettings(slug: string) {
        return this.addSlug(slug, this.flattenTableGlobalSettings());
    }

    // this function update only slice of data in the page
    // without fetching all data in the current route
    // reload function automatically uses the current URL
    public updateTableData(slug: string) {
        if (!this.tableGlobalSettings) return;
        router.reload({
            only: [slug],
            data: {
                ...this.getTableGlobalSettings(slug),
            },
            ...this.tableGlobalSettings.stateLoading,
            preserveState: true,
        });
    }

    // this property is used to store many settings for form
    // to work , it holds form values , model id , state loading
    // and close form modal function
    private formGlobalSettings?: FormGlobalSettings;

    // static constructor to set form global settings and get instance of this class
    static setFormGlobalSettings<T>(tableGlobalSettings: FormGlobalSettings) {
        const instance = new this<T>();
        instance.formGlobalSettings = tableGlobalSettings;
        return instance;
    }

    // update the model using base route and form settings
    // returning loading state and success or error message
    public update(baseRoute: string) {
        if (this.formGlobalSettings === undefined) return;
        if (!this.formGlobalSettings.modelId) return;
        router.post(
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
                        errors as any
                    );
                },
            }
        );
    }

    // create the model using base route and form settings
    // returning loading state and success or error message
    public create(baseRoute: string, absRoute?: string) {
        if (this.formGlobalSettings === undefined) return;
        const route = absRoute ? absRoute : `${baseRoute}/store`;
        router.post(route, this.formGlobalSettings.formValues, {
            ...this.formGlobalSettings.stateLoading,
            onSuccess: () => {
                message.success("تمت الاضافة بنجاح");
                this.formGlobalSettings!.form.resetFields();
            },
            onError: (errors: any) => {
                this.formGlobalSettings!.setErrors(errors as any);
            },
        });
    }

    // delete the model using base route and form settings
    // returning success or error message
    static delete(id: number, baseRoute: string) {
        router.delete(`${baseRoute}/${id}`, {
            onError: (errors) => {
                message.error("حدث خطأ ما");
                if (errors.message) message.error(errors.message);
            },
            preserveState: true,
        });
    }
}
