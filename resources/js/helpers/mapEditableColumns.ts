import InvoiceHandler from "../interfaces/InvoiceHandler";
import ColumnTypes from "../types/ColumnTypes";
import EditableColumns from "../types/EditableColumns";

export default function mapEditableColumns<T>(
    columns: EditableColumns,
    onSave: (record: T) => void,
    handler: InvoiceHandler
) {
    return columns.map((col) => {
        if (col.renderWithHandler)
            col = { ...col, render: col.renderWithHandler(handler) };
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: T) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: onSave,
            }),
        };
    });
}
