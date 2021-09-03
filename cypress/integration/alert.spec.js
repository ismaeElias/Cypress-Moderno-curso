/// <reference types="cypress"/>


describe('Work with alerts ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');        
    });

    beforeEach(() => {
        cy.reload();
    });

    it.only('Alert', () => {
        cy.log('executou esse')
        cy.clickAlert('#alert', 'Alert Simples');
    });

    it('Alert', () => {
        const stub = cy.stub().as('alerta');

        cy.on('window:alert',stub);
        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            });
    });

    it('Confirm', () => {
        
        cy.on('window:confirm',message => {
            console.log(message);
            expect(message).to.be.equal('Confirm Simples')
        });

        cy.on('window:alert',message => {
            console.log(message);
            expect(message).to.be.equal('Confirmado')
        });

        cy.get('#confirm').click();
    });

    it('Deny', () => {
        
        cy.on('window:confirm',message => {
            console.log(message);
            expect(message).to.be.equal('Confirm Simples');
            return false
        });

        cy.on('window:alert',message => {
            console.log(message);
            expect(message).to.be.equal('Negado')
        });

        cy.get('#confirm').click();
    });

    it('Prompt', () => {
        cy.window().then( win => {
            cy.stub(win, 'prompt').returns(42);
        });


        cy.on('window:confirm',message => {
            console.log(message);
            expect(message).to.be.equal('Era 42?');
        });

        cy.on('window:alert',message => {
            console.log(message);
            expect(message).to.be.equal(':D')
        });

        cy.get('#prompt').click();
    });
});