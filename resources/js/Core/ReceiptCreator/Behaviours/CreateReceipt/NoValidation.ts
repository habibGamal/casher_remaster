export default class NoValidation
    implements CreateReceiptValidation
{
    validation(receiptItem: ReceiptItem): boolean {
        return true;
    }
}
