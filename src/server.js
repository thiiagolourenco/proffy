const { pageLanding, pageStudy, pageGiveClasses, pageGiveClassesSave } = require('./utils/page.js');

//servidor
const express = require('express');
const server = express();

/*Configuração do nunjucks configure(pastaDosArquivosHMTL, enviar um objeto{express:,noCache: true //guardar em memória})*/
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

//inicialização do servidor
server.use(express.urlencoded({ extended: true }))/*Receber o req.body*/
  .use(express.static('public'))/*Configuração de arquivos estáticos(css, imagens, scripts)*/
  .get('/', pageLanding)/*get(pedido, function(requisição com dados, reposta))*/
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .post('/save-classes', pageGiveClassesSave)//rq POST para enviar dados de maneira mais segura/"escondidos"
  .listen(5500);


/*O RENDER É DO NUNJUCKS, MAS SE VC QUISESSE N USAR ELE FAZ ASSIM:
function pageGiveClasses(req, res) {
  return res.sendFile(__dirname + '/views/give-classes.html');
} */



















/* - Require pega a dependência do node.
   - Get faz o pedido e retorna oq o front quer. É a rota da página.
   - listen é a porta onde a server/aplicação está rodando.
   - A dependência express serve para inicializar o servidor com algumas config.
   - A dependência nodemon é para desenvolvimento do servidor ela reinicia o server
     sempre q tem alguma alteração (-D pra ser apenas para desenvolvedor).
   - A dependência nunjucks é uma templeta engine q serve para receber e mandar os dados no HTML.
   - Packjson são as configs do projeto e controle de dependências.
   - Packjson-lock server p/ mapear as dependências do projeto.
   - __dirname é a pasta src do projeto.
   - As alterações do nunjucks permitem trabalhar com dados vindos do BD e colocalos no HTML usando {{ nomeDaVar }}
   PASSOS: organiza os diretórios do projeto, cria o server.js, npm init -y, instala o express e o nodemon -D.*/