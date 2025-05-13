/**************************************************************************************************************************
* Objetivo: Criar uma API para realizar integração com banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
* Observações:
* Para criar a API precisa instalar:
*   express             npm install express --save
*   cors                npm install cors --save
*   body-parser         npm install body-parser --save
* Para criar a conexão com banco de dados precisa instalar:
*   prisma              npm install prisma --save
*   @prisma/client      npm install @prisma/client --save
*
* Após a instalação do prisma e @prisma/client, devemos:
*       npx prima init    Para iniciar o prisma no projeto
* Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando:
*       npx prisma migrate dev
***************************************************************************************************************************/

//import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import das controllers do projeto
const controllerMusica = require('./controller/musica/controllerMusica.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerArtista = require('./controller/artista/controllerArtista.js')
const controllerUsuario = require('./controller/usuario/controllerUsuarios.js')
const controllerAlbum = require('./controller/album/controllerAlbum.js')
const controllerPlaylist = require('./controller/playlist/controllerPlaylist.js')

//cria um objeto para o body do tipo JSON
const bodyParserJSON = bodyParser.json()

//cria um objeto do app para criar a API
const app = express()

//configurações de permissões do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,  POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){

    //recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da controller par inserir os dados e aguarda o retorno da função
    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    let idMusica = request.params.id

    let resultMusica = await controllerMusica.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){
    let idMusica = request.params.id

    let resultMusica = await controllerMusica.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o contentType da requisição
    let contentType = request.headers['content-type']

    // recebe os dados do corpo da requisição
    let dadosBody = request.body
    
    let idMusica = request.params.id

    //chama a função e encaminha os argumentos de id, body e content-type
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-musicas/genero', cors(), async function(request, response){

    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-musicas/genero/:id', cors(), async function (request, response){
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultArtista = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.get('/v1/controle-musicas/artista', cors(), async function(request, response){

    let resultArtista = await controllerArtista.listarArtista()

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.get('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response){

    let idArtista = request.params.id
    let resultArtista = await controllerArtista.buscarArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.delete('/v1/controle-musicas/artista/:id', cors(), async function (request, response){
    let idArtista = request.params.id

    let resultArtista = await controllerArtista.excluirArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idArtista = request.params.id
    let resultArtista = await controllerArtista.atualizarArtista(idArtista, dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-musicas/usuario', cors(), async function(request, response){

    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.delete('/v1/controle-musicas/usuario/:id', cors(), async function (request, response){
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})
app.post('/v1/controle-musicas/album', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultAlbum = await controllerAlbum.inserirAlbum(dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})
app.get('/v1/controle-musicas/album', cors(), async function(request, response){

    let resultAlbum = await controllerAlbum.listarAlbum()

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.get('/v1/controle-musicas/album/:id', cors(), bodyParserJSON, async function(request, response){

    let idAlbum = request.params.id

    let resultAlbum = await controllerAlbum.buscarAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})
app.put('/v1/controle-musicas/album/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idAlbum = request.params.id
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})
app.post('/v1/controle-musicas/playlist', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPlaylist = await controllerPlaylist.inserirPlaylist(dadosBody, contentType)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})
app.get('/v1/controle-musicas/playlist', cors(), async function(request, response){

    let resultPlaylist = await controllerPlaylist.listarPlaylist()

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

app.get('/v1/controle-musicas/playlist/:id', cors(), bodyParserJSON, async function(request, response){

    let idPlaylist = request.params.id

    let resultPlaylist = await controllerPlaylist.buscarPlaylist(idPlaylist)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})
app.put('/v1/controle-musicas/playlist/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idPlaylist = request.params.id
    let resultPlaylist = await controllerPlaylist.atualizarPlaylist(idPlaylist, dadosBody, contentType)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})