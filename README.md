# Anotações

* Sempre que você criar um componente que será uma page, você precisa usar export default NomeDoComponente(){}

* Caso você tenha criado um projeto next com JS apenas:
    * npm install typescript @types/react @types/node -D

* .tsx = para componentes

* npm install sass = biblioteca de css

## Estrutura do nextjs

* Instale extensões css modules e sass

* O index.tsx tem o <App />. É o primeiro arquivo a arenderizar
e você deve colocar o global.scss ali para que a app fique toda
afetada pela config. scss

* O arquivo _document.tsx é renderizado apenas uma vez, ele contem:
    * Head da aplicação
    * Body com o Main e o snextcript que renderiza a aplicação

# Contextos

* Utilize o contexto rodeando o _app, pois ele é o arquivo principal da aplicação em nextjs

# Mais anotações

* npm install axios nookies jwt-decode => api, trabalhar com cookies e jwt

## Requisitos

[ ] Dashboard contendo cada registro, um usuário-colaborador.
    [ ] Botões: upload de arquivo, enviar e editar;
[ ] Automação para que, no botão de upload de arquivo, carregue os dados do holerite;
    [ ] Campo ID de holerite (visual)
[ ] Macro-automação: carregar um unico doc PDF que vai gerar todos os usuários com holerites para envio;

