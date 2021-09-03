/// <reference types="cypress" />

describe('Worn with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');        
    });

    beforeEach(() => {
        cy.reload();
    });

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado');
        cy.get('body').should('contain', 'Cuidado onde clica, muitas armadilhas...');
        cy.get('span').should('contain','Cuidado');
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...');
    });

    it('Links', () => {

        cy.get('[href="#"]').click();

        cy.get('#resultado').should('have.text','Voltou!');

        cy.reload();
        cy.get('#resultado').should('not.have.text','Voltou!');
        cy.contains('Voltar').click();

        cy.get('#resultado').should('have.text','Voltou!');
    });

    it('TextFields', () => {
        cy.get('#formNome').type('Ismael');
        cy.get('[data-cy=dataSobrenome]').type('Elias{backspace}').should('have.value','Elia');
        cy.get('#elementosForm\\:sugestoes').type('Text area').should('have.value', 'Text area');

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('tabela');

        cy.get('#elementosForm\\:sugestoes').clear().type('Erro{selectall}acerto',{delay : 100}).should('have.value', 'acerto');
    });

    it('RadioButton', () => {
        cy.get('#formSexoFem').click().should('be.checked');
        cy.get('#formSexoMasc').should('not.be.checked');

        cy.get("[name='formSexo']").should('have.length',2);
    });

    it('Checkbox', () => {
        cy.get('#formComidaPizza').click().should('be.checked');
        cy.get('[name=formComidaFavorita').click({multiple : true}).should('have.length',4);
        cy.get('#formComidaPizza').should('not.be.checked');
        cy.get('#formComidaVegetariana').should('be.checked');
    });

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value','2graucomp');

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value','1graucomp');

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length',8)
        cy.get('[data-test=dataEscolaridade] option').then( $arr => {
            const values= [];

            $arr.each(function(){
                values.push(this.innerHTML)
            });

            expect(values).to.include.members(['Superior','Mestrado']);
        })    
    });

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao','futebol','nada']);

        // cy.get('[data-testid=dataEsportes]').should('have.value',['natacao','futebol','nada'])            
        cy.get('[data-testid=dataEsportes]').then( $el => {
            expect($el.val()).to.be.deep.equal(['natacao','futebol','nada']);
            expect($el.val()).to.have.length(3);
        });
        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql',['natacao','futebol','nada'] );
    });

   
});