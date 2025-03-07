/// <reference types="cypress" />

describe('Teste de inclusão de contato', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('Deve adicionar um contato e renderizá-lo corretamente', () => {
        cy.get('input[type="text"]').type('Bruce Wayne')
        cy.get('input[type="email"]').type('batman@batmail.com')
        cy.get('input[type="tel"]').type('9999-1234')
        cy.get('.adicionar').click()

        cy.get('.contato').should('contain', 'Bruce Wayne')
        cy.get('.contato').should('contain', 'batman@batmail.com')
        cy.get('.contato').should('contain', '9999-1234')
    })
})

describe('Teste de alteração de contato', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('Deve alterar um contato e renderizá-lo corretamente', () => {
        // Adiciona um contato para garantir que exista algo para alterar
        cy.get('input[type="text"]').type('Jason Todd')
        cy.get('input[type="email"]').type('robin@batmail.com')
        cy.get('input[type="tel"]').type('1111-1111')
        cy.get('.adicionar').click()

        // Edita o contato recém-adicionado
        cy.get('.contato').should('contain', 'Jason Todd')
        cy.get('.contato').first().find('.edit').click()
        cy.get('input[type="text"]').clear().type('Dick Grayson')
        cy.get('input[type="email"]').clear().type('nightwing@batmail.com')
        cy.get('input[type="tel"]').clear().type('9998-1234')
        cy.get('.alterar').click()

        cy.get('.contato').should('contain', 'Dick Grayson')
        cy.get('.contato').should('contain', 'nightwing@batmail.com')
        cy.get('.contato').should('contain', '9998-1234')
    })
})

describe('Teste de remoção de contato', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('Deve remover um contato', () => {
        // Adiciona um novo contato
        cy.get('input[type="text"]').type('Testeson da Silva')
        cy.get('input[type="email"]').type('testeson@teste.com')
        cy.get('input[type="tel"]').type('73573-7357')
        cy.get('.adicionar').click()

        // Verifica se o contato foi adicionado
        cy.get('.contato').should('contain', 'Testeson da Silva')

        // Remove o contato específico
        cy.contains('.contato', 'Testeson da Silva').find('.delete').click()

        // Verifica se o contato foi removido
        cy.get('.contato').should('not.contain', 'Testeson da Silva')
    })
})