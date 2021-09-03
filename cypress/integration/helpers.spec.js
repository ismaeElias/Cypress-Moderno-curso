/// <reference types="cypress"/>

let obj = {
    nome : 'Ismael',
    idade : 22
}

describe('Helpers ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');        
    });

    beforeEach(() => {
        cy.reload();
    });
    
    it('Wrap', () => {
        
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property','nome');
    });

    it('Its ...', () => {
        cy.wrap(obj).should('have.property','nome','Ismael');
        cy.wrap(obj).its('nome').should('be.equal','Ismael');

        obj ={ ...obj, endereco: { rua : 'rua', num : 10}};

        cy.wrap(obj).its('endereco').should('have.property','rua');
        cy.wrap(obj).its('endereco').its('rua').should('contain','rua');

        cy.title().its('length').should('be.equal',20);
    });

   it.only('Invoke...', () => {
       const getValue = () => 1;
       const soma = (a, b) =>  a + b;

       cy.wrap({fn: getValue}).invoke('fn').should('be.equal',1);
       cy.wrap({fn: soma}).invoke('fn',2,5).should('be.equal',7);
   });

});