export default class IncreaseQuantityCost
    implements CreateReceiptIncreaseQuantity
{
    increaseQuantity(item: ReceiptItem, quantity: number): ReceiptItem {
        const newQuantity = item.quantity + quantity;
        return {
            ...item,
            quantity: newQuantity,
            total: item.cost * newQuantity,
        };
    }
}
