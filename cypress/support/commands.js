/// <reference types="cypress" />
import "cypress-real-events";

/** general */

Cypress.Commands.add("submitAndWait", () => {
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
});

Cypress.Commands.add("closeModal", () => {
    cy.get(".ant-modal-close-x").click();
});

/** product commands */
Cypress.Commands.add("fillProductForm", (product) => {
    cy.get("#products_form_name").type(product.name);
    cy.get("#products_form_barcode").type(product.barcode);
    cy.get("#products_form_last_buying_price").type(product.lastBuyingPrice);
    cy.get("#products_form_selling_price").type(product.sellingPrice);
    cy.get("#products_form_minimum_stock").type(product.minimumStock);
    cy.get("#product_group_id").type(product.productGroup, { force: true });
    cy.wait(1000);
    cy.get(".ant-select-item-option-content")
        .contains(product.productGroup)
        .click({ force: true });
    if (product.unitOrWeight) {
        // if unit
        cy.get("#products_form_unit_or_weight").children().first().click();
        cy.get("#products_form_unit").click({ force: true });
        cy.get(".ant-select-item-option")
            .contains(product.unit)
            .click({ force: true });
    } else cy.get("#products_form_unit_or_weight").children().last().click();
    if (product.hasExpireDate) cy.get("#products_form_has_expire_date").check();
    else cy.get("#products_form_has_expire_date").uncheck();
});

Cypress.Commands.add("cleanProductForm", () => {
    cy.get("#products_form_name").clear();
    cy.get("#products_form_barcode").clear();
    cy.get("#products_form_last_buying_price").clear();
    cy.get("#products_form_selling_price").clear();
    cy.get("#products_form_minimum_stock").clear();
});

Cypress.Commands.add("checkProductResult", (product) => {
    cy.get(".ant-table-row > :nth-child(2)").should("contain", product.name);
    cy.get(".ant-table-row > :nth-child(3)").should("contain", product.barcode);
    cy.get(".ant-table-row > :nth-child(4)").should(
        "contain",
        product.lastBuyingPrice
    );
    cy.get(".ant-table-row > :nth-child(5)").should(
        "contain",
        product.sellingPrice
    );
    cy.get(".ant-table-row > :nth-child(6)").should(
        "contain",
        product.productGroup
    );
    // expand ther row
    cy.get(".ant-table-row-expand-icon").click();
    cy.get(".ant-descriptions-row > :nth-child(2)").should(
        "contain",
        product.minimumStock
    );
    cy.get(".ant-descriptions-row > :nth-child(4)").should(
        "contain",
        product.hasExpireDate ? "نعم" : "لا"
    );
    if (product.unitOrWeight)
        cy.get(".ant-descriptions-row > :nth-child(6)").should(
            "contain",
            product.unit
        );
    // results count is 1
    cy.get(".ant-table-footer").should("contain", "1");
});

Cypress.Commands.add("findProductWithBarcode", (barcode) => {
    cy.get(".ant-input").clear();
    cy.wait(1000);
    cy.get(".ant-input-group-addon .ant-select-selector").click();
    cy.get(".ant-select-item-option-content").contains("كود الصنف").click();
    // enter barcode
    cy.get(".ant-input").type(barcode);
    cy.wait(2000);
});

Cypress.Commands.add("productEditFormInitiated", (product) => {
    cy.get("#products_form_name").should("have.value", product.name);
    cy.get("#products_form_barcode").should("have.value", product.barcode);
    cy.get("#products_form_last_buying_price").should(
        "have.value",
        product.lastBuyingPrice
    );
    cy.get("#products_form_selling_price").should(
        "have.value",
        product.sellingPrice
    );
    cy.get("#products_form_minimum_stock").should(
        "have.value",
        product.minimumStock
    );

    if (product.unitOrWeight)
        cy.get(`.ant-select-selection-item[title='${product.unit}']`).should(
            "contain",
            product.unit
        );
});

/** product group commands */

Cypress.Commands.add("fillProductGroupForm", (productGroup) => {
    cy.get("#product_group_form_name").type(productGroup.name);
});

Cypress.Commands.add("cleanProductGroupForm", () => {
    cy.get("#product_group_form_name").clear();
});
Cypress.Commands.add("findProductGroup", (productGroup) => {
    cy.get(".ant-input").clear();
    cy.wait(2000);
    // enter barcode
    cy.get(".ant-input").type(productGroup.name);
    cy.wait(2000);
});

Cypress.Commands.add("checkProductGroupResult", (productGroup) => {
    cy.get(".ant-table-row > :nth-child(1)").should(
        "contain",
        productGroup.name
    );
    cy.get(".ant-table-row > :nth-child(2)").should("contain", 0);
    cy.get(".ant-table-footer").should("contain", "1");
});

Cypress.Commands.add("productGroupEditFormInitiated", (productGroup) => {
    cy.get("#product_group_form_name").should("have.value", productGroup.name);
});
// stock commands

Cypress.Commands.add("navigateToCreateStock", () => {
    cy.get(".ant-menu-title-content").contains("ادارة المخازن").click();
    cy.get(".ant-menu-title-content").contains("اضافة مخزن").click();
    cy.wait(500);
});

Cypress.Commands.add("addStock", (stock) => {
    cy.navigateToCreateStock();
    cy.get("button").contains("أضافة مخزن").click();
    cy.get("#stock_form_name").type(stock.name);
    cy.submitAndWait();
    cy.closeModal();
    cy.get(".ant-input[placeholder='بحث']").type(stock.name);
    cy.wait(500);
    cy.get(".ant-table-row > :nth-child(1)").should("contain", stock.name);
});

// invoices commands

Cypress.Commands.add("navigateToBuyingInvoices", () => {
    cy.get(".ant-menu-title-content").contains("الفواتير").click();
    cy.get(".ant-menu-title-content").contains("فاتورة شراء").click();
    cy.wait(500);
});

Cypress.Commands.add("chooseStock", (stock) => {
    cy.get("#stock_id").type(stock.name, { force: true });
    cy.wait(1000);
    cy.get(".ant-select-item-option-content")
        .contains(stock.name)
        .click({ force: true });
});

Cypress.Commands.add(
    "addProductToInvoice",
    (product, quantity, lastBuyingPrice) => {
        cy.get("#search_product").clear();
        cy.get("#search_product").type(`${product.barcode}{enter}`, {
            force: true,
        });
        cy.wait(500);
        if (quantity) {
            cy.realPress("NumpadMultiply");
            cy.realType(quantity);
            cy.realPress("Enter");
        }
        if (lastBuyingPrice) {
            cy.get(".editable-price").first().click();
            cy.get("#price").clear();
            cy.get("#price").type(lastBuyingPrice);
            product.lastBuyingPrice = lastBuyingPrice;
        }
        cy.realPress("Enter");
    }
);

Cypress.Commands.add("checkInvoiceTotal", (total) => {
    cy.get(".ant-descriptions-row > :nth-child(4)").should("contain", total);
});
