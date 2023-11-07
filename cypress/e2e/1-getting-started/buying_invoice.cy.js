/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import { product } from "../../prototypes/product";
const productGroup = {
    name: faker.commerce.productAdjective(),
};

const [product1, product2, product3] = [
    product(productGroup),
    product(productGroup),
    product(productGroup),
];

const stock = { name: "مخزن" };

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

    it("add stocks", () => {
        cy.addStock(stock);
    });

    it("add buying invoice", () => {
        cy.navigateToBuyingInvoices();
        cy.chooseStock(stock);
        cy.addProductToInvoice(product1, "3", 300);
        cy.addProductToInvoice(product2, "7");
        cy.addProductToInvoice(product3);
        // check total
        cy.checkInvoiceTotal(
            3 * 300 + 7 * product2.lastBuyingPrice + product3.lastBuyingPrice
        );
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });

    it("validate the invoice", () => {
        cy.get(".ant-menu-title-content").contains("الفواتير").click();
        cy.get(".ant-menu-title-content").contains("عرض الفواتير").click();
        cy.wait(500);
        cy.get(".ant-btn").contains("عرض الفاتورة").first().click();
        cy.wait(500);
        cy.get(".ant-table-row:nth-child(1) > :nth-child(1)").should(
            "contain",
            product3.name
        );
        cy.get(".ant-table-row:nth-child(2) > :nth-child(1)").should(
            "contain",
            product2.name
        );
        cy.get(".ant-table-row:nth-child(3) > :nth-child(1)").should(
            "contain",
            product1.name
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(2)").should(
            "contain",
            product3.barcode
        );
        cy.get(".ant-table-row:nth-child(2) > :nth-child(2)").should(
            "contain",
            product2.barcode
        );
        cy.get(".ant-table-row:nth-child(3) > :nth-child(2)").should(
            "contain",
            product1.barcode
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(3)").should(
            "contain",
            product3.lastBuyingPrice
        );
        cy.get(".ant-table-row:nth-child(2) > :nth-child(3)").should(
            "contain",
            product2.lastBuyingPrice
        );
        cy.get(".ant-table-row:nth-child(3) > :nth-child(3)").should(
            "contain",
            product1.lastBuyingPrice
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(4)").should(
            "contain",
            1
        );
        cy.get(".ant-table-row:nth-child(2) > :nth-child(4)").should(
            "contain",
            7
        );
        cy.get(".ant-table-row:nth-child(3) > :nth-child(4)").should(
            "contain",
            3
        );

        cy.get(".ant-table-row:nth-child(1) > :nth-child(5)").should(
            "contain",
            product3.lastBuyingPrice
        );
        cy.get(".ant-table-row:nth-child(2) > :nth-child(5)").should(
            "contain",
            product2.lastBuyingPrice * 7
        );
        cy.get(".ant-table-row:nth-child(3) > :nth-child(5)").should(
            "contain",
            product1.lastBuyingPrice * 3
        );

        cy.get(".ant-descriptions-row > :nth-child(4)").should(
            "contain",
            3 * 300 + 7 * product2.lastBuyingPrice + product3.lastBuyingPrice
        );
    });
});
