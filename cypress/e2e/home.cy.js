
describe('tarefas', () => {
  it('Metodo recrsivo para excluir e cadastrar uma tafefa', () => {
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'delete',
      body: {name: 'Ler um livro bom de node.js'}
    }).then(response =>{
      expect(response.status).to.equal(204)

    })




    cy.visit('http://localhost:3000')
    cy.get('input[placeholder="Add a new Task"]')
      .type("Ler um livro bom de node.js")
    cy.contains('button', 'Create')
      .click()
    cy.contains('Ler um livro bom de node.js')
    .should('be.visible')
  });
});

