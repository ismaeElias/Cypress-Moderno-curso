/// <reference types="cypress"/>

import loc from '../../support/locatos';
import '../../support/commandsContas';
import buildEnv from '../../support/buildEnv'

describe('Deve testar a nivel funcional', () => {
    before(() => {
        // cy.resetApp();
    });

    after(() => {
        cy.clearLocalStorage();
    });

    beforeEach(() => {
        buildEnv();
        
        cy.login('ismael@gmail.com', 1223);
        cy.get(loc.MENU.HOME).click();
    })
    it('Deve inserir uma conta', () => {

       

        cy.intercept('POST', '/contas', {
            body : {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id : 1
            }
        })

        
        cy.acessarMenuConta();
        cy.intercept('GET', '/contas', {
            body: [
                { 
                    id: 1,
                    nome: "Conta com movimentacao",
                    visivel : true,
                    usuario_id : 1
                }, 
            
                { 
                    id: 2,
                    nome: "Conta para saldo", 
                    visivel : true,
                    usuario_id : 1
                },
                { 
                    id: 3,
                    nome: "Conta de teste", 
                    visivel : true,
                    usuario_id : 1
                },
            ]
        }).as('contasSave');

        cy.inserirConta('Conta de teste');
        cy.get(loc.TOAST).should('contain', 'Conta inserida com sucesso');
    });


    it('Deve alterar a conta', () => {

        cy.intercept('PUT','/contas/**', {
            body : {
                id: 1,
                nome : 'Conta alterada',
                visivel : true,
                usuario_id : 1
            }
        })

        cy.acessarMenuConta();

        cy.xpath(loc.CONTA.FN_XP_BTN_ALTERAR('Carteira')).click();
        cy.get(loc.CONTA.NOME).clear().type('Conta alterada');
        cy.get(loc.CONTA.BTN_SALVAR).click();

        cy.get(loc.MESSAGE_TOAST).should('contain', 'Conta atualizada com sucesso!');
    });

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta();

        cy.get(loc.CONTA.NOME).type('Conta mesmo nome');
        cy.get(loc.CONTA.BTN_SALVAR).click();

        cy.get(loc.MESSAGE_TOAST).should('contain', 'code 400');
    });

    it('Inserir movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123');
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('Inter');
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes');
        cy.get(loc.MOVIMENTACAO.STATUS).click();

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

        cy.get(loc.TOAST).should('contain', 'sucesso');

        cy.get(loc.EXTRATO.LISTA_LINHA).should('have.length', 7);
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMNETO('Desc', '123')).should('exist')
    });

    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click();

        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00');

        cy.get(loc.MENU.EXTRATO).click();

        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo');

        cy.get(loc.MOVIMENTACAO.STATUS).click();

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

        cy.get(loc.TOAST).should('contain', 'sucesso');

        cy.xpath(loc.EXTRATO.FN_XP_ITEM_LISTA('Movimentacao 1, calculo saldo')).should('exist');

        cy.get(loc.MENU.HOME).click();


        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00');
    });

    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click();

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click();


        cy.get(loc.TOAST).should('contain', 'sucesso');
    });
});