/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const productGroup = {
    name: "مجموعة 1",
};

const product1 = {
    name: faker.commerce.productName(),
    barcode: "00123",
    lastBuyingPrice: 40,
    sellingPrice: 50,
    minimumStock: 10,
    unitOrWeight: false,
    productGroup: productGroup.name,
    unit: "علبة",
    hasExpireDate: false,
};
const product2 = {
    name: faker.commerce.productName(),
    barcode: "00124",
    lastBuyingPrice: 50,
    sellingPrice: 60,
    minimumStock: 20,
    unitOrWeight: false,
    productGroup: productGroup.name,
    unit: "علبة",
    hasExpireDate: false,
};

const stock1 = { name: "مخزن 1" };

describe("create one thing of every thing", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/products");
        cy.window().then((win) => {
            win.localStorage.setItem("theme", "dark");
        });
        cy.viewport(1920, 1080);
        cy.loc;
    });

    it("empty DB", () => {
        cy.contains("الاعدادات").click();
        cy.wait(500);
        cy.get("button").contains("مسح").click();
        cy.wait(1000);
    });

    it("add product group", () => {
        cy.get(".ant-menu-title-content").contains("مجموعات الاصناف").click();
        cy.wait(500);
        cy.get("button").contains("اضافة مجموعة").click();
        // fill the form util it find unique name
        cy.cleanProductGroupForm();
        cy.fillProductGroupForm(productGroup);
        // submit button
        cy.submitAndWait();
    });

    it("add product", () => {
        cy.get("button").contains("أضافة صنف").click();
        cy.fillProductForm(product1);
        cy.submitAndWait();
    });

    it("add product 2", () => {
        cy.get("button").contains("أضافة صنف").click();
        cy.fillProductForm(product2);
        cy.submitAndWait();
    });

    it("add stocks", () => {
        cy.addStock(stock1);
    });

    it("add openining stock", () => {
        cy.navigateToOpeningStocks();
        cy.chooseStock(stock1);
        cy.addProductToInvoice(product1, {
            quantity: "50",
            lastBuyingPrice: 45,
        });
        cy.addProductToInvoice(product2, {
            quantity: "60",
            lastBuyingPrice: 55,
        });
        // check total
        cy.get('td[colspan="1"]').contains(50 * 45 + 60 * 55);
        cy.get(".ant-btn").contains("إضافة الرصيد").click();
    });

    it("add buying invoice", () => {
        cy.navigateToBuyingInvoices();
        cy.chooseStock(stock1);
        cy.addProductToInvoice(product1, {
            quantity: "50",
            lastBuyingPrice: 45,
        });
        cy.addProductToInvoice(product2, {
            quantity: "60",
            lastBuyingPrice: 55,
        });
        // check total
        cy.checkInvoiceTotal(50 * 45 + 60 * 55);
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });

    it("add selling invoice", () => {
        cy.navigateToSellingInvoices();
        cy.chooseStock(stock1);
        cy.addProductToInvoice(product1, {
            quantity: "30",
        });
        cy.addProductToInvoice(product2, {
            quantity: "40",
        });
        // check total
        cy.checkInvoiceTotal(
            30 * product1.sellingPrice + 40 * product2.sellingPrice
        );
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });

    it("add return selling invoice", () => {
        cy.navigateToReturnSellingInvoices();
        cy.get("input#invoice_id").type("1{enter}");
        cy.get(`[data-barcode="${product1.barcode}-return_quantity"]`).click();
        cy.get("#return_quantity").clear();
        cy.get("#return_quantity").type(10);
        cy.realPress("Enter");
        cy.get(`[data-barcode="${product2.barcode}-return_quantity"]`).click();
        cy.get("#return_quantity").clear();
        cy.get("#return_quantity").type(20);
        cy.realPress("Enter");
        cy.checkInvoiceTotal(
            10 * product1.sellingPrice + 20 * product2.sellingPrice
        );
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });
    it("add return buying invoice", () => {
        cy.navigateToReturnBuyingInvoices();
        cy.get("input#invoice_id").type("1{enter}");
        cy.wait(200);
        cy.get(".ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed")
            .eq(0)
            .click();
        cy.get(".ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed")
            .eq(0)
            .click();
        cy.get(`[data-key="0-${product1.barcode}-return_quantity"]`).click();
        cy.get("#return_quantity").clear();
        cy.get("#return_quantity").type(20);
        cy.realPress("Enter");
        cy.get(`[data-key="0-${product2.barcode}-return_quantity"]`).click();
        cy.get("#return_quantity").clear();
        cy.get("#return_quantity").type(20);
        cy.realPress("Enter");
        cy.checkInvoiceTotal(20 * 45 + 20 * 55);
        cy.get(".ant-btn").contains("انشاء الفاتورة").click();
    });
});
