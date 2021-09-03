/// <reference types="cypress"/>


describe('Work with PopUp ...', () => {
   

    it('Deve testar o popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); 

        cy.window().then( win => {
            cy.stub(win, 'open').as('winOpen');
        });
        cy.get('#buttonPopUp').click();
        cy.get('@winOpen').should('be.called');
    });

    it('Deve testar popup com link', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); 

        cy.contains('Popup2')
            .should('have.prop','href')
            .and('equal','https://wcaquino.me/cypress/frame.html')
    });

    it('Should access popup dinamically', () => {
        cy.contains('Popup2').then( $a => {
            const href = $a.prop('href');

            cy.visit(href);

            cy.get('#tfield').type('Texto funciona')
        })
        
    });

    it('Should force link on same page', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); 
        cy.contains('Popup2').invoke('removeAttr','target').click();
    });
});