describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('HOME')
  })

  it('successfull login', function() {
    cy.contains('Log In').click()
    cy.get("input:first").type("mamacita")
    cy.get("input:last").type("12345678")
    cy.get("#login-button").click()
    cy.contains("HOME")
  })

  it('failed login', function() {
    cy.contains('Log In').click()
    cy.get("input:first").type("mamacita")
    cy.get("input:last").type("21212")
    cy.get("#login-button").click()
    cy.contains("Incorrect credentials")
  })
})
