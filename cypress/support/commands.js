Cypress.Commands.add('createTask', (task)=> {
    cy.visit('http://localhost:3000')
    cy.get('input[placeholder="Add a new Task"]').type(task)
    cy.contains('button', 'Create').click()
  })

Cypress.Commands.add('removeTaskByName', (task)=>{
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'delete',
        body: {name: task}
      }).then(response => {
        expect(response.status).to.equal(204)
      })

Cypress.Commands.add('postTask', (task)=>{
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'post',
        body: task
      }).then(response => {
        expect(response.status).to.equal(201)
      })
 })
})
  