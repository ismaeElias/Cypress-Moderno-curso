/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit and asset title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.title().should('be.equal', 'Campo de Treinamento');
        cy.title().should('contain', 'Campo');

        cy.title().then((title) => {
            cy.log(title);
        })

        cy.title().should('be.equal', 'Campo de Treinamento').and('contain', 'Campo');
    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple').click().should('have.value', 'Obrigado!');
    });
})