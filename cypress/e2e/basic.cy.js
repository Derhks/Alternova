describe('sample test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the resources text', () => {
    cy.get('p')
    .contains('Sign in via magic link with your email below');
  })
})
