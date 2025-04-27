Cypress.Commands.add('createTask', (task = '')=> {
    cy.visit('http://localhost:3000') 

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if(task !== ''){
    cy.get('@inputTask').type(task)
    } 

    cy.contains('button', 'Create').click()
  })

  Cypress.Commands.add('isRequired', (targetMenssage) =>{
    cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
      expect(
        targetMenssage
        ).to.equal(text)
    })
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

 Cypress.Commands.add('validaTaskMarcada', (task)=>{
  cy.visit('http://localhost:3000')
      cy.contains("p", task.name) // Encontrar o texto dentro do <p> com a classe
      .parent() // Navegar para o elemento pai (o <div>)
      .find('button[class*= "_listItemToggle" ]') // Encontrar o botão dentro do <div> (se houver)
      .click() // Realizar o clique na imagem (ou outro elemento, caso precise)
      cy.contains('p', task.name)
      .should('have.css', 'text-decoration-line', 'line-through')
    });
 })

  