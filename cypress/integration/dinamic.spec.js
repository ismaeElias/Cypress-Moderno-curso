///  <reference types="cypress"/>

describe('Desafio', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.reload();
    });

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];
    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Usuario');
            cy.get('#formSobrenome').type('Qualquer');
            cy.get(`[name=formSexo][value=M]`).click();
            cy.get(`[name=formComidaFavorita][value=${food.toLowerCase()}]`).click();
            cy.get('#formEscolaridade').select('Mestrado');
            cy.get('#formEsportes').select('Corrida');
            cy.get('#formCadastrar').click();
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
        });
    });

    it.only('', () => {
        cy.get('#formNome').type('Usuario');
            cy.get('#formSobrenome').type('Qualquer');
            cy.get(`[name=formSexo][value=M]`).click();
            cy.get(`[name=formComidaFavorita]`).each( $el => {
                if( $el.val() !== 'vegetariano') {
                    cy.wrap($el).click();
                }
            });
            cy.get('#formEscolaridade').select('Mestrado');
            cy.get('#formEsportes').select('Corrida');
            // cy.get('#formCadastrar').click();
            // cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');

            cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?');
    });
});