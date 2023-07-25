import InvoiceHandler from "../interfaces/InvoiceHandler";
import ColumnTypes from "./ColumnTypes";

type EditableColumns = (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    renderWithHandler?: (
        handler: InvoiceHandler<any>
    ) => (_: any, record: any) => JSX.Element;
})[]

export default EditableColumns;
