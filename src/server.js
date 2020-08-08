const proffys =
  [
    {
      name: 'Diego Fernandes',
      avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
      whatsapp: '88889999',
      bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
      subject: 'Química',
      cost: '20',
      weekday: [0],
      time_from: [720],
      time_to: [1200]
    },
    {
      name: 'Thiago Lourenço',
      avatar: 'https://avatars1.githubusercontent.com/u/51346622?s=460&u=b7bdd098d64369dc034135467bab9f103dd7d287&v=4',
      whatsapp: '88889999',
      bio: 'Entusiasta das melhores tecnologias de front-end avançado. Apaixonado por desenvolver coisas em e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas aulas.',
      subject: 'Programação',
      cost: '40',
      weekday: [1],
      time_from: [720],
      time_to: [1200]
    }
  ];

const subjects = [
  'Artes',
  'Biologia',
  'Ciências',
  'Educação física',
  'Física',
  'Geografia',
  'História',
  'Matemática',
  'Português',
  'Química'
];

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

//funcionalidades
function pageLanding(req, res) {
  return res.render('index.html');
}

function pageStudy(req, res) {
  const filters = req.query;
  return res.render('study.html', { proffys, filters, subjects, weekdays });//render(páginaQueRenderizada, objetoQueEnviará, outroObj...pode ser vários)
}

function pageGiveClasses(req, res) {
  const userData = req.query;

  const dataArrayIsEmpty = Object.keys(userData).length > 0;

  if (dataArrayIsEmpty) {
    userData.subject = getSubject(userData.subject);
    proffys.push(userData);
    return res.redirect('/study');
  }

  return res.render('give-classes.html', { subjects, weekdays });
}

function getSubject(subjectNumber) {
  return subjects[subjectNumber - 1];
}

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
server.use(express.static('public'))/*Configuração de arquivos estáticos(css, imagens, scripts)*/
  .get('/', pageLanding)/*get(pedido, function(requisição com dados, reposta))*/
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
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