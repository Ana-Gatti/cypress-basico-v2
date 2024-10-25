/* solicitando referências do Cypress, para questões de autocomplete*/
/// <reference types="Cypress" />


/*O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.*/
describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys 
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
      publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

      cy.get('#firstName').type('Ana Paula')
      cy.get('#lastName').type('Gatti')
      cy.get('#email').type('teste@teste.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible') //faz a verificação de resultado esperado
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Ana Paula')
      cy.get('#lastName').type('Gatti')
      cy.get('#email').type('teste@teste.cm')
      cy.get('#open-text-area').type('Teste!')
      cy.get('button[type="submit"]').click()
      
      cy.get('.error').invoke('css', 'display', 'block')
      cy.get('.error').should('be.visible')
    })

    it.only('campo telefone não exibe valor não-numérico', function() {
      cy.get('#phone').
        type('ashdkhksadh')
        .should('have.value', '')
    })
    
})

/*
beforeEach é utilizado para dizer ao cypress que antes de executar cada teste da suíte de testes,
o cypress deve executar o comando cy.visit.

cy.visit é um comando do Cypress que carrega uma página web. 
Neste caso, ele está carregando o arquivo index.html localizado no diretório src.

cy.title utilizado para buscar o título da página index.

O método should é usado para fazer uma verificação. 
Neste caso, ele verifica se o título da página é exatamente igual a “Central de Atendimento ao Cliente TAT”.

O método only é utilizado quando quisermos executar apenas um caso de teste.

cy.get utilizado para buscar elementos.

cy.type é utilizado para inserir informações no elemento mencionado.

{delay} objeto que permite configurar o comportamento do comando type. O delay Define um atraso (em milissegundos) 
entre cada caractere digitado. O padrão é de 10 milissegundos, no código foi alterado para 0.

have.value é uma Assertions (assim como be.visible) que utilizamos dentro do método .should
*/
  