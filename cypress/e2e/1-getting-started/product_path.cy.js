/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import { product } from "../../prototypes/product";
const productGroup = {
    name: faker.commerce.productAdjective(),
};

const product1 = product(productGroup);
const stock1 = { name: "مخزن 1" };
const stock2 = { name: "مخزن 2" };

describe("product path", () => {
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

    it("add product", () => {
        cy.get("button").contains("أضافة صنف").click();
        cy.fillProductForm(product1);
        cy.submitAndWait();
    });

    it("add stocks", () => {
        cy.addStock(stock1);
        cy.addStock(stock2);
    });

    it("add buying invoice 1", () => {
        cy.navigateToBuyingInvoices();
        cy.chooseStock(stock1);
        cy.addProductToInvoice(product1, "50", 30);
        // check total
        cy.checkInvoiceTotal(50 * 30);
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });

    it("add buying invoice 2", () => {
        cy.navigateToBuyingInvoices();
        cy.chooseStock(stock1);
        cy.addProductToInvoice(product1, "60", 40);
        // check total
        cy.checkInvoiceTotal(60 * 40);
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });

    it("validate the invoice 2", () => {
        cy.get(".ant-menu-title-content").contains("الفواتير").click();
        cy.get(".ant-menu-title-content").contains("عرض الفواتير").click();
        cy.wait(500);
        cy.get(".ant-btn").contains("عرض الفاتورة").first().click();
        cy.wait(500);
        cy.get(".ant-table-row:nth-child(1) > :nth-child(1)").should(
            "contain",
            product1.name
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(2)").should(
            "contain",
            product1.barcode
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(3)").should(
            "contain",
            product1.lastBuyingPrice
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(4)").should(
            "contain",
            60
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(5)").should(
            "contain",
            60 * product1.lastBuyingPrice
        );

        cy.get(".ant-descriptions-row > :nth-child(4)").should(
            "contain",
            60 * product1.lastBuyingPrice
        );
    });

    it("move product from stock1 to stock2", () => {
        // navigate to stock transfer
        cy.contains("ادارة المخازن").click();
        cy.contains("التحويل بين المخازن").click();
        cy.wait(500);
        // select from stock
        cy.get("#from_stock_id").type("مخزن 1", { force: true });
        cy.get(".ant-select-item-option-content")
            .contains("مخزن 1")
            .click({ force: true });
        // select to stock
        cy.get("#to_stock_id").type("مخزن 2", { force: true });
        cy.get(".ant-select-item-option-content")
            .contains("مخزن 2")
            .click({ force: true });
        // select product
        cy.get("#search_product").clear();
        cy.get("#search_product").type(`${product1.barcode}{enter}`, {
            force: true,
        });
        cy.wait(500);
        // expand icon
        cy.get(".ant-table-row-expand-icon").click();
        // edit quantity
        cy.get(".editable-cell-value-wrap").eq(1).click();
        cy.realType("20");
        cy.realPress("Enter");
        // edit quantity
        cy.get(".editable-cell-value-wrap").eq(2).click();
        cy.realType("60");
        cy.realPress("Enter");
        // submit
        cy.contains("نقل").click();
    });
});
