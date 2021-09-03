/// <reference types="cypress"/>

import loc from '../../support/locatos';
import  '../../support/commandsContas';
describe('Deve testar a nivel funcional', () => {
    let token

    before(() => {
        cy.getToken('ismael@gmail.com','123').then( tk => {
            token = tk
        })
    });

    beforeEach(() => {
        cy.resetApi();
    })
    it('Deve inserir uma conta', () => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers : {
                    Authorization : `JWT ${token}`
                },
                body : {
                    nome : 'conta qualquer 3'
                }
            }).as('response');

        cy.get('@response').then( res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('nome', 'conta qualquer 3')
        })

    });


    it('Deve alterar a conta', () => {
        
    });

    it('Não deve criar uma conta com mesmo nome', () => {
       
    });

    it('Inserir movimentação', () => {
        
    });

    it('Deve pegar o saldo', () => {
        
    });

    it('Deve remover uma movimentação', () => {
    });
});