describe('Gerenciamento de tarefas', () => {

  let testData;

  before(()=>{
    cy.fixture('tasks').then(massa =>{
      testData = massa
    })
  })

  

  context('Cadastro', ()=>{
    it('Deve excluir e cadastrar uma tarefa com sucesso', () => {
      const task = testData.cadastrarTarefa
      cy.removeTaskByName(task.name)
      cy.createTask(task.name)
      cy.contains(task.name).should('be.visible')
    })
  
    it('Não deve permitir cadastro de tarefas duplicadas', () => {
      const task = testData.duplicadaVerifica
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
      const task = testData.validaTaskMarcada
      cy.removeTaskByName(task.name)
      cy.postTask(task)
      cy.validaTaskMarcada(task)
    })
  })

  context('Exclusão', ()=>{
    it('Deve remover uma tarefa', () => {
      const task = testData.removerTarefa
      cy.removeTaskByName(task.name)
      cy.postTask(task)
      cy.removerTarefa(task)
    });
  })
})