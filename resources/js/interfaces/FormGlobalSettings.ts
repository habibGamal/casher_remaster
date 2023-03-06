import { FormInstance } from "antd";
import StateLoading from "../types/StateLoading";
import { ErrorBag, Errors } from "@inertiajs/inertia";

export default interface FormGlobalSettings<T> {
    modelToEdit: T | undefined;
    form: FormInstance<any>;
    formValues: any;
    stateLoading: StateLoading;
    closeFormModal: () => void;
    setErrors: (errors: Errors & ErrorBag) => void;
}
