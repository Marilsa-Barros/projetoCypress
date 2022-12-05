describe('página de login', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it('fazer login', () => {

        //  preenche email
        cy.getElement('login-email')
            .type(Cypress.env('email'), { log: false, delay: 50})        

        // preenche a senha  
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        // clicar no login
        cy.getElement('login-submit')
            .click()
        
        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Teste Iterasys')
        
    })
    
})