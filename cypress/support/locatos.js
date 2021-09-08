const locators = {
    LOGIN : {
        USER : '[data-test=email]',
        PASSWORD : '[data-test=passwd]',
        BTN_LOGIN : '.btn' 
    },
    MENU : {
        HOME : '[data-test=menu-home]',
        SETTINGS : '.dropdown-toggle',
        EXTRATO : '[data-test=menu-extrato]',
        CONTAS : '[href="/contas"]',
        RESET:  '[href="/reset"]',
        MOVIMENTACAO : '[data-test=menu-movimentacao] > .fas'
    },
    CONTA : {
        NOME : '.form-control',
        BTN_SALVAR : '.btn',
        FN_XP_BTN_ALTERAR : (nome) => `//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO : {
        DESCRICAO : '[data-test=descricao]',
        VALOR : '[data-test=valor]',
        ENVOLVIDO : '[data-test=envolvido]',
        CONTA : '[data-test=conta]',
        STATUS : '[data-test=status]',
        BTN_SALVAR : '.btn-primary'
    },
    EXTRATO : {
        LISTA_LINHA : '.list-group > li',
        FN_XP_BUSCA_ELEMNETO : (desc, value) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${value}')]`,
        FN_XP_REMOVER_ELEMENTO : desc => `//span[contains(.,'${desc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO : desc => `//span[contains(.,'${desc}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_ITEM_LISTA : desc => `//li[contains(@class, 'receitaPaga')]//span[contains(.,'${desc}')]`,
        FN_XP_LINHA : desc => `//span[contains(.,'${desc}')]/../../../..`
    },
    SALDO : {
       FN_XP_SALDO_CONTA : (nome) => `//td[contains(.,'${nome}')]/../td[2]`
    },
    MESSAGE_TOAST : '.toast-message',
    TOAST : '.toast'
}

export default locators;