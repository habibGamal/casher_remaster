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
describe("product group", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/");
        cy.viewport(1920, 1080);
        cy.wait(500);
        cy.get(".ant-menu-title-content").contains("مجموعات الاصناف").click();
        cy.wait(500);
    });

    it("adding new product group => validate required fields popup errors", () => {
        /* ==== submit empty form to get the error messages ==== */
        // add button
        cy.get("button").contains("اضافة مجموعة").click();
        // submit button
        cy.submitAndWait();
        cy.get(".ant-form-item-explain-error").should(($el) => {
            expect($el).to.have.length(1);
            expect($el.eq(0)).to.contain("الحقل الاسم مطلوب.");
        });
    });

    it("adding new product group", () => {
        // add product button
        cy.get("button").contains("اضافة مجموعة").click();
        // fill the form util it find unique name
        const recursive = ()=>{
            cy.cleanProductGroupForm();
            cy.fillProductGroupForm(productGroup);

            // submit button
            cy.submitAndWait();
            cy.get(".ant-form-item-explain-error").should(($el) => {
                if($el.length > 0){
                    productGroup.name = faker.commerce.productMaterial();
                    recursive();
                }
            });
        }
        recursive();
        // close the modal
        cy.get(".ant-modal-close-x > .aspect-square").click();

    });

    it("add the same values to validate that it is unique", () => {
        // add product button
        cy.get("button").contains("اضافة مجموعة").click();
        /* ==== fill the form ==== */
        cy.fillProductGroupForm(productGroup);
        // submit button
        cy.submitAndWait();
        // close the modal
        cy.get(".ant-form-item-explain-error").should(($el) => {
            expect($el).to.have.length(1);
            expect($el.eq(0)).to.contain("قيمة الحقل الاسم مُستخدمة من قبل");
        });
    });

    it("search for product group", () => {
        cy.findProductGroup(productGroup);
        // check the result
        cy.checkProductGroupResult(productGroup);
    });

    it("edit product group", () => {
        // select search by barcode
        cy.findProductGroup(productGroup);
        // click edit button
        cy.get(".ant-btn-default:has(.anticon-edit)").click();
        cy.productGroupEditFormInitiated(productGroup);
        /* ==== fill the edit form  ==== */
        // we should clean the form first
        cy.cleanProductGroupForm();

        cy.fillProductGroupForm(productGroupEdit);
        cy.submitAndWait();
        cy.findProductGroup(productGroupEdit);
        cy.checkProductGroupResult(productGroupEdit);
        // submit button
    });


});
