import { Page, PageProps } from "@inertiajs/inertia";
import Flash from "../interfaces/Flash";

const flashHasError = (page: Page<PageProps>) => {
    return (page.props.flash as Flash).error !== null;
};

export default flashHasError;
