const buildEnv = () => {
    cy.intercept('POST', '/signin', {
        body: {
            id: 1000,
            nome: 'Usuario falso',
            token: 'uma string grande'
        }
    }).as('login')

    cy.intercept('GET', '/saldo', {
        body: [
            {
                conta_id: 33311,
                conta: 'Carteira',
                saldo: 30000
            },
            {
                conta_id: 3331123,
                conta: 'Banco',
                saldo: 90000000
            },
        ]
    }).as('saldo'),

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
            }
        ]
    }).as('contas');
}

export default buildEnv