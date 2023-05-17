/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
const productGroup = {
    name: faker.commerce.productAdjective(),
};

const product = () => ({
    name: faker.commerce.productName(),
    barcode: faker.random.numeric(6, { allowLeadingZeros: true }),
    lastBuyingPrice: parseInt(faker.commerce.price()),
    sellingPrice: parseInt(faker.commerce.price()),
    minimumStock: faker.random.numeric(2),
    unitOrWeight: faker.datatype.boolean(),
    productGroup: productGroup.name,
    unit: "علبة",
    hasExpireDate: faker.datatype.boolean(),
});
const [product1, product2, product3] = [product(), product(), product()];
const stock = {
    name: faker.commerce.department(),
};
describe("buying invoice", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/products");
        cy.viewport(1920, 1080);
    });

    it("add product group", () => {
        cy.get(".ant-menu-title-content").contains("مجموعات الاصناف").click();
        cy.wait(500);
        cy.get("button").contains("اضافة مجموعة").click();
        // fill the form util it find unique name
        const recursive1 = () => {
            cy.cleanProductGroupForm();
            cy.fillProductGroupForm(productGroup);
            // submit button
            cy.submitAndWait();
            cy.get("#product_group_form").then(($el) => {
                if ($el.find(".ant-form-item-explain-error").length > 0) {
                    productGroup.name = faker.commerce.productAdjective();
                    product1.productGroup = productGroup.name;
                    recursive1();
                }
            });
        };
        recursive1();
    });

    it("add 3 product", () => {
        cy.get("button").contains("أضافة صنف").click();
        cy.fillProductForm(product1);
        cy.submitAndWait();
        cy.fillProductForm(product2);
        cy.submitAndWait();
        cy.fillProductForm(product3);
        cy.submitAndWait();
    });

    it("add stock", () => {
        cy.navigateToCreateStock();
        cy.get("button").contains("أضافة مخزن").click();
        cy.get("#stock_form_name").type(stock.name);
        cy.submitAndWait();
        cy.closeModal();
        cy.get(".ant-input[placeholder='بحث']").type(stock.name);
        cy.wait(500);
        cy.get(".ant-table-row > :nth-child(1)").should("contain", stock.name);
    });

    it("add buying invoice", () => {
        cy.navigateToBuyingInvoices();
        cy.get("#stock_id").type(stock.name, { force: true });
        cy.wait(1000);
        cy.get(".ant-select-item-option-content")
            .contains(stock.name)
            .click({ force: true });
        cy.get("#search_product").clear();
        cy.get("#search_product").type(`${product1.barcode}{enter}`, {
            force: true,
        });
        cy.wait(500);
        cy.realPress("NumpadMultiply");
        cy.realType("3");
        cy.realPress("Enter");
        cy.get("#search_product").clear();
        cy.get("#search_product").type(`${product2.barcode}{enter}`, {
            force: true,
        });
        cy.wait(500);
        cy.realPress("NumpadMultiply");
        cy.realType("7");
        cy.realPress("Enter");
        cy.get(".editable-price").first().click();
        cy.get("#price").clear();
        cy.get("#price").type("800");
        product2.lastBuyingPrice = 800;
        cy.realPress("Enter");
        cy.get("#search_product").clear();
        cy.get("#search_product").type(`${product3.barcode}{enter}`, {
            force: true,
        });
        cy.get('.ant-descriptions-row > :nth-child(4)').should(
            "contain",
            product1.lastBuyingPrice * 3 + 7 * 800 + product3.lastBuyingPrice
        );
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });
    it('validate the invoice', () => {
        cy.get(".ant-menu-title-content").contains("الفواتير").click();
        cy.get('.ant-menu-title-content').contains('عرض الفواتير').click()
        cy.wait(500)
        cy.get('.ant-btn').contains('عرض الفاتورة').first().click()
        cy.wait(500)
        cy.get('.ant-table-row:nth-child(1) > :nth-child(1)').should('contain', product3.name);
        cy.get('.ant-table-row:nth-child(2) > :nth-child(1)').should('contain', product2.name);
        cy.get('.ant-table-row:nth-child(3) > :nth-child(1)').should('contain', product1.name);

        cy.get('.ant-table-row:nth-child(1) > :nth-child(2)').should('contain', product3.barcode);
        cy.get('.ant-table-row:nth-child(2) > :nth-child(2)').should('contain', product2.barcode);
        cy.get('.ant-table-row:nth-child(3) > :nth-child(2)').should('contain', product1.barcode);

        cy.get('.ant-table-row:nth-child(1) > :nth-child(3)').should('contain', product3.lastBuyingPrice);
        cy.get('.ant-table-row:nth-child(2) > :nth-child(3)').should('contain', product2.lastBuyingPrice);
        cy.get('.ant-table-row:nth-child(3) > :nth-child(3)').should('contain', product1.lastBuyingPrice);

        cy.get('.ant-table-row:nth-child(1) > :nth-child(4)').should('contain', 1);
        cy.get('.ant-table-row:nth-child(2) > :nth-child(4)').should('contain', 7);
        cy.get('.ant-table-row:nth-child(3) > :nth-child(4)').should('contain', 3);

        cy.get('.ant-table-row:nth-child(1) > :nth-child(5)').should('contain', product3.lastBuyingPrice);
        cy.get('.ant-table-row:nth-child(2) > :nth-child(5)').should('contain', product2.lastBuyingPrice * 7);
        cy.get('.ant-table-row:nth-child(3) > :nth-child(5)').should('contain', product1.lastBuyingPrice * 3);

        cy.get('.ant-descriptions-row > :nth-child(4)').should('contain', product1.lastBuyingPrice * 3 + 7 * product2.lastBuyingPrice + product3.lastBuyingPrice);
    });
});
