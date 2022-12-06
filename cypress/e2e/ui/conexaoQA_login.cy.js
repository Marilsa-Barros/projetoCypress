describe('página de login', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it('fazer login', () => {

        cy.intercept('GET', '/api/profile/me')  // mapeamento para monitorar a api
            .as('apiLogin')     // apelido para api

        //  preenche email
        cy.getElement('login-email')
            .type(Cypress.env('email'), { log: false, delay: 50})        

        // preenche a senha  
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        // clicar no login
        cy.getElement('login-submit')
            .click()
            .wait('@apiLogin')      // tempo de espera, até que tenha a resposta da api
            .then(({ response }) => {
                expect(response.body.errors[0].msg).to.eq('Não há perfil para este usuário')
            })
                    
        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Teste Iterasys')
        
    })
    
})