export default class UpdateTotalCost
    implements CreateReceiptUpdateTotal
{
    updateTotal(receiptItem: ReceiptItem): ReceiptItem {
        return {
            ...receiptItem,
            total: receiptItem.cost * receiptItem.quantity,
        };
    }
}
