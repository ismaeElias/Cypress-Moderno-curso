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
                nome: "Carteira",
                visivel : true,
                usuario_id : 1
            }, 
        
            { 
                id: 2,
                nome: "Banco", 
                visivel : true,
                usuario_id : 1
            }
        ]
    }).as('contas');

    cy.intercept('GET', `/extrato/**`, {
        body :[
            {"conta":"Conta com movimentacao","id":732732,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":789794,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para movimentacaoo","id":732733,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Movimentacao para exclusao","id":732734,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":732735,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":732735,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":789795,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para extrato","id":732736,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-09-06T03:00:00.000Z","data_pagamento":"2021-09-06T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":789796,"usuario_id":24757,"transferencia_id":null,"parcelamento_id":null}]
    })

    cy.intercept('GET', `/extrato/**`, {
        fixture: 'movimentacaoSalva' 
    })
}

export default buildEnv