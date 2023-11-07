/// <reference types="cypress" />

describe("testing", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/products");
        cy.viewport(1920, 1080);
    });

});
