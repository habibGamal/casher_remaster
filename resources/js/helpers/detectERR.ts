import { message } from "antd";

const detectERR = (value: any) => {
    if (typeof value !== "string") return false;
    if (value.includes("ERR:")) {
        message.error(value.replace("ERR:", ""));
        return true;
    }
    return false;
};

export default detectERR;
