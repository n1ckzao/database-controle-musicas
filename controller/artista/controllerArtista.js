/**************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados)
*       Validações, tratamento de dados etc..
* Data:01/04/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const message = require('../../modulo/config.js')
const artistaDAO = require ('../../model/DAO/artista.js')

const  inserirArtista = async function(artista, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if(     artista.nome             == ''        ||  artista.nome             == null     ||  artista.nome             == undefined    ||  artista.nome.length > 100    ||
                artista.biografia        == ''        ||  artista.biografia        == null     ||  artista.biografia        == undefined    ||  artista.biografia.length > 500 ||
                artista.imagem_artista   == undefined ||  artista.imagem_artista.length > 200
        ){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultArtista = await artistaDAO.insertArtista(artista)

            if(resultArtista)
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
const  atualizarArtista = async function(id_artista, artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if(     artista.nome             == ''        ||  artista.nome             == null      ||  artista.nome             == undefined    ||  artista.nome.length > 100    ||
                    artista.biografia        == ''        ||  artista.biografia        == null      ||  artista.biografia        == undefined    ||  artista.biografia.length > 2000 ||
                    artista.imagem_artista   == undefined ||  artista.imagem_artista.length > 200   ||
                    id_artista               == ''        ||  id_artista               == undefined ||  id_artista               == null         || isNaN(id_artista)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let result = await artistaDAO.selectByIdArtista(id_artista)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        artista.id_artista = id_artista
                        let resultArtista = await artistaDAO.updateArtista(artista)

                        if(resultArtista){
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
const  excluirArtista = async function(id_artista){
    try {
        if(id_artista == '' || id_artista == undefined || id_artista == null || isNaN(id_artista)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultArtista = await artistaDAO.selectByIdArtista(id_artista)

            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if (resultArtista.length > 0){
                    let result = await artistaDAO.deleteArtista(id_artista)

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
const  listarArtista = async function(){
    try {
        let dadosArtista = {}

        let resultArtista = await artistaDAO.selectAllArtista()

        if(resultArtista != false){
            if(resultArtista.length > 0){
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.items = resultArtista.length
                dadosArtista.artists = resultArtista

                return dadosArtista
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
const  buscarArtista = async function(id_artista){

    try {
        if(id_artista == '' || id_artista == undefined || id_artista == null || isNaN(id_artista)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id_artista)

            if(resultArtista != false || typeof(resultArtista == 'object')){
                if(resultArtista.length > 0){
                dadosArtista.status = true,
                dadosArtista.status_code = 200,
                dadosArtista.artists = resultArtista
                
                return dadosArtista
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
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista
}