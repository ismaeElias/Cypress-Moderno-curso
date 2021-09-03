/// <reference types="cypress"/>



describe('Desafio', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');        
    });

    beforeEach(() => {
        cy.reload();
    });

    it('usin jquery selector', () => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onClick*="Francisco"]')
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input').type('preenche ae');
    });

    it.only('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,\'Francisco\')]/..//input[@type="text"]')
        
    });
});