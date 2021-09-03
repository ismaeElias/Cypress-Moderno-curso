import loc from './locatos';

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
});

Cypress.Commands.add('inserirConta', (conta) => {
    cy.get(loc.CONTA.NOME).type(conta); 
    cy.get(loc.CONTA.BTN_SALVAR).click();
});