/// <reference types="cypress"/>

import dayjs from 'dayjs';

import '../../support/commandsContas';
describe('Deve testar a nivel funcional', () => {
    let token

    before(() => {
        cy.getToken('ismael@gmail.com', '123').then(tk => {
            token = tk
        })
    });

    beforeEach(() => {
        cy.resetApi();
    })
    it('Deve inserir uma conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: {
            //     Authorization: `JWT ${token}`
            // },
            body: {
                nome: 'conta qualquer 3'
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('nome', 'conta qualquer 3')
        })

    });


    it('Deve alterar a conta', () => {

        cy.getAccountByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    body: {
                        "nome": 'conta alterada atravez da api'
                    }
                }).as('response');

            })
        cy.get('@response').its('status').should('be.equal', 200)
    });

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!');
        })

    });

    it('Inserir movimentação', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(conta_id => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    body: {
                        "tipo": "REC",
                        "data_transacao": dayjs().format('DD/MM/YYYY'),
                        "data_pagamento": dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        "descricao": "ismael",
                        "valor": "12",
                        "envolvido": "eu",
                        "conta_id": conta_id,
                        "status": true
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    });

    it('Deve pegar o saldo', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta
            res.body.forEach(conta => {
                if (conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo
                }
            })

            expect(saldoConta).to.be.equal('534.00');
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            let dataPagamento = dayjs(res.body[0].data_pagamento).locale('pt-br').format('DD/MM/YYYY')
            let dataTransacao = dayjs(res.body[0].data_transacao).locale('pt-br').format('DD/MM/YYYY')

            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true, 
                    data_pagamento: dataPagamento,
                    data_transacao: dataTransacao,
                    descricao : res.body[0].descricao,
                    envolvido : res.body[0].envolvido,
                    valor : res.body[0].valor,
                    conta_id : res.body[0].conta_id

                },
            }).its('status').should('be.equal', 200)

        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta
            res.body.forEach(conta => {
                if (conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo
                }
            })

            expect(saldoConta).to.be.equal('4034.00');
        })
    });

    it('Deve remover uma movimentação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                method : 'DELETE',
                url : `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal',204)
        });
    });
});