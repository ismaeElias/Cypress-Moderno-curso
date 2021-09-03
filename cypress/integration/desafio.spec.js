/// <reference types="cypress"/>


describe('Desafio', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');        
    });

    beforeEach(() => {
        cy.reload();
    });

    it('Cadastrar ', () => {
        const stub = cy.stub();

        cy.on('window:alert', stub);

        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio');
            });
        
        cy.get('#formNome')
            .type('Ismael')
            .should('have.value', 'Ismael');    
        
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio');
            });            

        cy.get('[data-cy=dataSobrenome]')
            .type('Elias')
            .should('have.value', 'Elias');
        
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio');
            });
        
        cy.get('#formSexoMasc')
            .click().should('be.checked');
        
        cy.get('#formCadastrar')
            .click();

        cy.get('#resultado')
            .should('contain', 'Cadastrado!');
    });
});