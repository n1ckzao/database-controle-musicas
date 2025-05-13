/**************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados)
*       Validações, tratamento de dados etc..
* Data:13/05/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const message = require('../../modulo/config.js')
const albumDAO = require ('../../model/DAO/album.js')

const controllerArtista = require('../artista/controllerArtista.js')

const inserirAlbum = async function(album, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if(     album.titulo          == '' || album.titulo           == null  || album.titulo          == undefined  || album.titulo.length > 100    ||
                album.data_lancamento == '' || album.data_lancamento  == null  || album.data_lancamento == undefined  || album.data_lancamento.length > 10 ||
                album.id_artista      == '' || album.id_artista       == undefined
        ){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultAlbum = await albumDAO.insertAlbum(album)

            if(resultAlbum)
                return message.SUCCESS_CREATED_ITEM //201

            else
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
        
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const  atualizarAlbum = async function(id_album, album, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if(     album.titulo          == '' || album.titulo          == null || album.titulo          == undefined || album.titulo.length > 100    ||
                    album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento == undefined || album.data_lancamento.length > 10 ||
                    album.id_artista      == '' || album.id_artista      == undefined ||
                    id_album              == '' || id_album              == null || id_album              == undefined || isNaN(id_album)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let result = await albumDAO.selectByIdAlbum(id_album)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        album.id_album = id_album
                        let resultAlbum = await albumDAO.updateAlbum(album)

                        if(resultAlbum){
                            return message.SUCCESS_UPDATED_ITEM
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const  excluirAlbum = async function(id_album){
    try {
        if(id_album == '' || id_album == undefined || id_album == null || isNaN(id_album)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultAlbum = await albumDAO.selectByIdAlbum(id_album)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if (resultAlbum.length > 0){
                    let result = await albumDAO.deleteAlbum(id_album)

                    if (result)
                        return message.SUCCESS_DELETE_ITEM
                    else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const  listarAlbum = async function(){
    try {
        let arrayAlbuns = []

        let dadosAlbum = {}

        let resultAlbum = await albumDAO.selectAllAlbum()

        if(resultAlbum != false || typeof(resultAlbum) == 'object'){
            if(resultAlbum.length > 0){
                dadosAlbum.status = true
                dadosAlbum.status_code = 200
                dadosAlbum.items = resultAlbum.length

                for(const itemAlbum of resultAlbum){
                    let dadosArtista = await controllerArtista.buscarArtista(itemAlbum.id_artista)
                    itemAlbum.artista = dadosArtista.artista

                    delete itemAlbum.id_artista

                    arrayAlbuns.push(itemAlbum)
                }

                dadosAlbum.albuns = arrayAlbuns

                return dadosAlbum
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const  buscarAlbum = async function(id_album){

    try {
        let arrayAlbuns = []

        if(id_album == '' || id_album == undefined || id_album == null || isNaN(id_album)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosAlbum = {}
            let resultAlbum = await albumDAO.selectByIdAlbum(id_album)

            if(resultAlbum != false || typeof(resultAlbum == 'object')){
                if(resultAlbum.length > 0){
                dadosAlbum.status = true
                dadosAlbum.status_code = 200

                for(const itemAlbum of resultAlbum){
                    let dadosArtista = await controllerArtista.buscarArtista(itemAlbum.id_artista)

                    itemAlbum.artista = dadosArtista.artista

                    delete itemAlbum.id_artista

                    arrayAlbuns.push(itemAlbum)
                }

                dadosAlbum.artists = arrayAlbuns
                
                return dadosAlbum
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum
}