// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locatos';

Cypress.Commands.add('clickAlert', (locator, msg) => {
    cy.get(locator).click();
        cy.on('window:alert',message => {
            console.log(message);
            expect(message).to.be.equal(msg);
        });
});

Cypress.Commands.add('login', (user, password) => {
    cy.visit('http://barrigareact.wcaquino.me');
    cy.get(loc.LOGIN.USER).type(user);
    cy.get(loc.LOGIN.PASSWORD).type(password);
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.get(loc.MESSAGE_TOAST).should('contain','Bem vindo');
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.RESET).click();
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method : 'POST',
        url : 'https://barrigarest.wcaquino.me/signin',
        body : {
            "email":user,
            "senha": password,
            "redirecionar":false
        }
    }).its('body.token').should('not.be.empty')
    .then( token => {
        return token
    })
})

Cypress.Commands.add('resetApi', () => {
    cy.getToken('ismael@gmail.com', '123').then( token => {
        cy.request({
            method : 'GET',
            url : 'https://barrigarest.wcaquino.me/reset',
            headers : {
                Authorization : `JWT ${token}`
            }
        })
    })
})