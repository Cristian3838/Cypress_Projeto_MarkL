describe('Gerenciamento de tarefas', () => {

  it('Deve excluir e cadastrar uma tarefa com sucesso', () => {
    const task = 'Ler um livro bom de node.js'
    cy.removeTaskByName(task)
    cy.createTask(task)
    cy.contains(task).should('be.visible')
  })

  it('Não deve permitir cadastro de tarefas duplicadas', () => {
    const task = {
      name: 'Estudar JavaScript',
      is_done: false
    }

    cy.removeTaskByName(task.name)
    cy.postTask(task)
    cy.createTask(task.name)
    cy.contains('Task already exists!').should('be.visible')
  })

})
