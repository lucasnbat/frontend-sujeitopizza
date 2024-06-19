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

