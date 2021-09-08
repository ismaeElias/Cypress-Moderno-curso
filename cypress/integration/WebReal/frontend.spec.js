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

    it('Deve testar a resposividade', () => {
        cy.get('[data-test=menu-home] > .fas').should('exist').and('be.visible')

        cy.viewport('iphone-5')

        cy.get('[data-test=menu-home] > .fas').should('exist').and('be.not.visible')

        cy.viewport('ipad-2')

        cy.get('[data-test=menu-home] > .fas').should('exist').and('be.visible')
    });
    
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
        cy.intercept('POST', '/contas', {
            body : {
                "error" : "Já existe uma conta com esse nome!"
            },
            statusCode : 400
        }).as('SalvaContaMesmoNome')

        cy.acessarMenuConta();

        cy.get(loc.CONTA.NOME).type('Conta mesmo nome');
        cy.get(loc.CONTA.BTN_SALVAR).click();

        cy.get(loc.MESSAGE_TOAST).should('contain', 'code 400');
    });

    it('Inserir movimentação', () => {

        cy.intercept('POST','/transacoes', {
            body : {"tipo":"REC","data_transacao":"08/09/2021","data_pagamento":"08/09/2021","descricao":"Desc","valor":"123","envolvido":"Inter","conta_id":"2","status":true}
        })

        cy.intercept('GET', `/extrato/**`, {
            fixture: 'movimentacaoSalva' 
        })
        
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123');
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('Inter');
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco');
        cy.get(loc.MOVIMENTACAO.STATUS).click();

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

        cy.get(loc.TOAST).should('contain', 'sucesso');

       

        cy.get(loc.EXTRATO.LISTA_LINHA).should('have.length', 7);
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMNETO('Desc', '123')).should('exist')
    });

    it('Deve pegar o saldo', () => {
        cy.intercept('GET', '/transacoes/**', {
            body : {"id":732733,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.intercept('PUT', '/transacoes/**', {
            body : {
                "conta": "Conta para movimentacaoo",
                "id": 732733,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-09-06T03:00:00.000Z",
                "data_pagamento": "2021-09-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 789795,
                "usuario_id": 24757,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })
     
        cy.get(loc.MENU.HOME).click();

        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '30.000,00');

        cy.get(loc.MENU.EXTRATO).click();

        

        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo');

        cy.get(loc.MOVIMENTACAO.STATUS).click();

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

        cy.get(loc.TOAST).should('contain', 'sucesso');
        cy.intercept('GET', '/saldo', {
            body: [
                {
                    conta_id: 33311,
                    conta: 'Carteira',
                    saldo: 4034
                },
                {
                    conta_id: 3331123,
                    conta: 'Banco',
                    saldo: 90000000
                },
            ]
        })

        // cy.xpath(loc.EXTRATO.FN_XP_ITEM_LISTA('Movimentacao 1, calculo saldo')).should('exist');

        cy.get(loc.MENU.HOME).click();


        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00');
    });

    it('Deve remover uma movimentação', () => {

        cy.intercept('DELETE', '/transacoes/**',{
            statusCode: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click();

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click();


        cy.get(loc.TOAST).should('contain', 'sucesso');
    });
    it('Deve criar os dados para inserir uma conta', () => {
     

        cy.intercept('POST', '/contas', {
            body : {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id : 1
            },
            
        }).as('SaveConta')
    
        
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
    
        cy.inserirConta('{CONTROL}');

        // cy.wait('@SaveConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.TOAST).should('contain', 'Conta inserida com sucesso');
    });

    it('Deve testar as cores', () => {
        cy.intercept('GET', `/extrato/**`, {
            body :[
                {"conta":"Conta com movimentacao","id":732732,"descricao":"Receita paga","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":789794,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para movimentacaoo","id":732733,"descricao":"Receita pendente","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Movimentacao para exclusao","id":732734,"descricao":"Despesa paga","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":732735,"descricao":"Despesa pendente","envolvido":"EEE","observacao":null,"tipo":"DESP","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"1534.00","status":false,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class','receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class','receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class','despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class','despesaPendente')
        
    });

    
});


