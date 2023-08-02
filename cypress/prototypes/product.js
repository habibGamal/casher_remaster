import { faker } from "@faker-js/faker";

export const product = (productGroup) => {
    const lastBuyingPrice = parseFloat(faker.commerce.price());
    return {
        name: faker.commerce.productName(),
        barcode: faker.random.numeric(6, { allowLeadingZeros: true }),
        lastBuyingPrice: parseInt(faker.commerce.price()),
        sellingPrice: lastBuyingPrice + 100,
        minimumStock: faker.random.numeric(2),
        unitOrWeight: faker.datatype.boolean(),
        productGroup: productGroup.name,
        unit: "علبة",
        hasExpireDate: faker.datatype.boolean(),
    };
};
