describe('Gerenciamento de tarefas', () => {

  context('Cadastro', ()=>{
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
  
    it('Validar campo em branco', () => {
      cy.createTask()
      cy.isRequired('This is a required field')
    });
  })

  context('Atualização', ()=>{
    it('Deve concluir uma tarefa', () => {
      const task = {
        name: 'Pagar conta de consumo',
        is_done: false
      }
      cy.removeTaskByName(task.name)
      cy.postTask(task)
      cy.validaTaskMarcada(task)
    })
  })

  context('Exclusão', ()=>{
    it('Deve remover uma tarefa', () => {
      const task = {
        name: 'Estudar JavaScript',
        is_done: false
      }
      cy.removeTaskByName(task.name)
      cy.postTask(task)
      cy.removerTarefa(task)
    });
  })
})