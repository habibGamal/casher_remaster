/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const productGroup = {
    name: faker.commerce.productAdjective(),
};
const productGroupEdit = {
    name: faker.commerce.productAdjective(),
};

const product = {
    name: faker.commerce.productName(),
    barcode: faker.random.numeric(6, { allowLeadingZeros: true }),
    lastBuyingPrice: parseInt(faker.commerce.price()),
    sellingPrice: parseInt(faker.commerce.price()),
    minimumStock: faker.random.numeric(2),
    unitOrWeight: faker.datatype.boolean(),
    productGroup: productGroup.name,
    unit: "علبة",
    hasExpireDate: faker.datatype.boolean(),
};
const productEdit = {
    name: faker.commerce.productName(),
    barcode: faker.random.numeric(6, { allowLeadingZeros: true }),
    lastBuyingPrice: parseInt(faker.commerce.price()),
    sellingPrice: parseInt(faker.commerce.price()),
    minimumStock: faker.random.numeric(2),
    unitOrWeight: faker.datatype.boolean(),
    productGroup: productGroupEdit.name,
    unit: "قطعة",
    hasExpireDate: faker.datatype.boolean(),
};
describe("product", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/products");
        cy.viewport(1920, 1080);
    });

    it("adding new product => validate required fields popup errors", () => {
        /* ==== submit empty form to get the error messages ==== */
        // add product button
        cy.get("button").contains("أضافة صنف").click();
        // submit button
        cy.get("button").contains("حفظ").click();
        // wait for second
        cy.wait(3000);
        cy.get(".ant-form-item-explain-error").should(($el) => {
            expect($el).to.have.length(4);
            expect($el.eq(0)).to.contain("الحقل الاسم مطلوب.");
            expect($el.eq(1)).to.contain("الحقل كود الصنف مطلوب.");
            expect($el.eq(2)).to.contain("الحقل last buying price مطلوب.");
            expect($el.eq(3)).to.contain("الحقل سعر البيع مطلوب.");
        });
    });

    it("add 2 product groups for create,edit", () => {
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
                    productGroup.name = faker.commerce.productMaterial();
                    recursive1();
                }
            });
        };
        const recursive2 = () => {
            cy.cleanProductGroupForm();
            cy.fillProductGroupForm(productGroupEdit);
            // submit button
            cy.submitAndWait();
            cy.get("#product_group_form").then(($el) => {
                if ($el.find(".ant-form-item-explain-error").length > 0) {
                    productGroupEdit.name = faker.commerce.productMaterial();
                    recursive2();
                }
            });
        };
        recursive1();
        recursive2();
    });

    it("adding new product", () => {
        // add product button
        cy.get("button").contains("أضافة صنف").click();
        /* ==== fill the form ==== */
        cy.fillProductForm(product);
        // submit button
        cy.submitAndWait();
        // close the modal
        cy.closeModal();
    });

    it("search for product", () => {
        cy.findProductWithBarcode(product.barcode);
        // check the result
        cy.checkProductResult(product);
    });

    it("edit product", () => {
        // select search by barcode
        cy.findProductWithBarcode(product.barcode);
        // click edit button
        cy.get(".ant-btn-default:has(.anticon-edit)").click();
        cy.productEditFormInitiated(product);
        /* ==== fill the edit form  ==== */
        // we should clean the form first
        cy.cleanProductForm();
        cy.fillProductForm(productEdit);
        cy.submitAndWait();
        cy.findProductWithBarcode(productEdit.barcode);
        cy.checkProductResult(productEdit);
        // submit button
    });

    it("delete product", () => {
        // select search by barcode
        cy.findProductWithBarcode(productEdit.barcode);
        // click delete button
        cy.get(".ant-btn-dangerous:has(.anticon-delete)").click();
    });
});
