///  <reference types="cypress"/>

describe('Desafio', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.reload();
    });

    it('Preencher campos', () => {
        cy.fixture('userData').as('usuario').then(res => {
            cy.get('#formNome').type(res.nome);
            cy.get('#formSobrenome').type(res.sobrenome);
            cy.get(`[name=formSexo][value=${res.sexo}]`).click();
            cy.get(`[name=formComidaFavorita][value=${res.comida}]`).click();
            cy.get('#formEscolaridade').select(res.escolaridade);
            cy.get('#formEsportes').select(res.esportes);
            cy.get('#formCadastrar').click();
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
        });
    });
});