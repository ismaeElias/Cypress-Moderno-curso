/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Going back to the past', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        const dt = new Date();


        cy.clock(dt.getTime());

        
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '02/09/2021');
    });

    it.only('Goes to he future', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gt', 1630601327542)
        })

        cy.clock();
        
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 0)
        })
        cy.wait(1000)
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 1000)
        })

        cy.tick(5000);

        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 1000)
        })
    });
})