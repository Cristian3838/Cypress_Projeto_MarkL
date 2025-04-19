describe('tarefas', () => {
  it('Metodo recursivo para excluir e cadastrar uma tafefa', () => {

    const taskNameCenario1 = 'Ler um livro bom de node.js'

    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'delete',
      body: {name: taskNameCenario1}
    }).then(response =>{
      expect(response.status).to.equal(204)

    })

    cy.createTask(taskNameCenario1)

    cy.contains(taskNameCenario1)
    .should('be.visible')
  });

  it('Não deve cadastrar tarefas duplicadas', () => {

    const taskNameCenario2 = {
      name: 'Estudar JavaScript',
      is_done: 'false'
    }

    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'delete',
      body: {name: taskNameCenario2.name}
    }).then(response => {
      expect(response.status).to.equal(204)
    })

    //Dado que eu cadastro uma tarefa
    cy.request({
      url: 'http://localhost:3333/tasks',
      method: 'post',
      body: taskNameCenario2
    }).then(response => {
      expect(response.status).to.equal(201)
    })

    // Quando eu faço o cadastro da mesma tarefa já existente
   cy.createTask(taskNameCenario2.name)

    //Então eu valido se essa tarefa já exite pela label de alerta  
    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!')
  });

//Função customizada
  Cypress.Commands.add('createTask', (taskName)=> {
    cy.visit('http://localhost:3000')
    cy.get('input[placeholder="Add a new Task"]')
      .type(taskName)
    cy.contains('button', 'Create')
      .click()

  })


});

