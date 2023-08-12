import { message } from "antd";
import { Page, PageProps } from "@inertiajs/inertia";
import Flash from "../interfaces/Flash";

export const hasErr = (value: any) => {
    if (typeof value !== "string") return false;
    if (value.includes("ERR:")) {
        message.error(value.replace("ERR:", ""));
        return true;
    }
    return false;
};

export const displayValidationErrors = (errors: any) => {
    Object.keys(errors).forEach((key) => {
        message.error(errors[key].message);
    });
};

export const flashHasError = (page: Page<PageProps>) => {
    return (page.props.flash as Flash).error !== null;
};
