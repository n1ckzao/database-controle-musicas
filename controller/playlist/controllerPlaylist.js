/**************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados)
*       Validações, tratamento de dados etc..
* Data:13/05/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const message = require('../../modulo/config.js')
const playlistDAO = require ('../../model/DAO/playlist.js')
const controllerUsuario = require('../usuario/controllerUsuarios.js')

const inserirPlaylist = async function(playlist, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if(     playlist.titulo       == '' || playlist.titulo       == null  || playlist.titulo       == undefined  || playlist.titulo.length > 100    ||
                playlist.data_criacao == '' || playlist.data_criacao == null  || playlist.data_criacao == undefined  || playlist.data_criacao.length > 10 ||
                playlist.id_usuario   == '' || playlist.id_usuario   == undefined
        ){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultPlaylist = await playlistDAO.insertPlaylist(playlist)

            if(resultPlaylist)
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
const  atualizarPlaylist = async function(id_playlist, playlist, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if(     playlist.titulo       == '' || playlist.titulo       == null || playlist.titulo       == undefined || playlist.titulo.length > 100 ||
                    playlist.data_criacao == '' || playlist.data_criacao == null || playlist.data_criacao == undefined || playlist.data_criacao.length > 10 ||
                    playlist.id_usuario   == '' || playlist.id_usuario   == undefined ||
                    id_playlist           == '' || id_playlist           == null || id_playlist           == undefined || isNaN(id_playlist)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let result = await playlistDAO.selectByIdPlaylist(id_playlist)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        playlist.id_playlist = id_playlist
                        let resultPlaylist = await playlistDAO.updatePlaylist(playlist)

                        if(resultPlaylist){
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
const  excluirPlaylist = async function(id_playlist){
    try {
        if(id_playlist == '' || id_playlist == undefined || id_playlist == null || isNaN(id_playlist)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultPlaylist = await playlistDAO.selectByIdPlaylist(id_playlist)

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if (resultPlaylist.length > 0){
                    let result = await playlistDAO.deletePlaylist(id_playlist)

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
const  listarPlaylist = async function(){
    try {
        let arrayPlaylists = []

        let dadosPlaylist = {}

        let resultPlaylist = await playlistDAO.selectAllPlaylist()

        if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
            if(resultPlaylist.length > 0){
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.items = resultPlaylist.length

                for(const itemPlaylist of resultPlaylist){
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                    itemPlaylist.usuario = dadosUsuario.usuario

                    delete itemPlaylist.id_usuario

                    arrayPlaylists.push(itemPlaylist)
                }

                dadosPlaylist.playlists = arrayPlaylists

                return dadosPlaylist
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
const  buscarPlaylist = async function(id_playlist){

    try {
        let arrayPlaylists = []

        if(id_playlist == '' || id_playlist == undefined || id_playlist == null || isNaN(id_playlist)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosPlaylist = {}
            let resultPlaylist = await playlistDAO.selectByIdAlbum(id_playlist)

            if(resultPlaylist != false || typeof(resultPlaylist == 'object')){
                if(resultPlaylist.length > 0){
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200

                for(const itemPlaylist of resultPlaylist){
                    let dadosArtista = await controllerArtista.buscarArtista(itemPlaylist.id_artista)

                    itemPlaylist.artista = dadosArtista.artista

                    delete itemPlaylist.id_artista

                    arrayAlbuns.push(itemPlaylist)
                }

                dadosPlaylist.artists = arrayAlbuns
                
                return dadosPlaylist
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
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarPlaylist
}