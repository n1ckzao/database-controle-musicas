/**************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados)
*       Validações, tratamento de dados etc..
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const message = require('../../modulo/config.js')
const usuarioDAO = require ('../../model/DAO/usuario.js')

const  inserirUsuario = async function(usuario, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if(     usuario.nome_usuario      == '' ||  usuario.nome_usuario     == null     ||  usuario.nome_usuario   == undefined    ||  usuario.nome_usuario.length > 100 ||
                usuario.email             == '' ||  usuario.email            == null     ||  usuario.email          == undefined    ||  usuario.email.length > 150   ||
                usuario.senha             == '' ||  usuario.senha            == null     ||  usuario.senha          == undefined    ||  usuario.senha.length  > 50 ||
                usuario.data_criacao      == '' ||  usuario.data_criacao     == null     || usuario.data_criacao    == undefined    ||  usuario.data_criacao.length > 10 ||
                usuario.data_atualizacao  == undefined ||  usuario.data_atualizacao.length > 10
        ){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultUsuario = await usuario.insertUsuario(usuario)

            if(resultUsuario)
                return message.SUCCESS_CREATED_ITEM

            else
                return message.ERROR_INTERNAL_SERVER_MODEL
        
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const  atualizarUsuario = async function(id, usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if(     usuario.nome_usuario      == '' ||  usuario.nome_usuario     == null     ||  usuario.nome_usuario   == undefined    ||  usuario.nome_usuario.length > 100 ||
                    usuario.email             == '' ||  usuario.email            == null     ||  usuario.email          == undefined    ||  usuario.email.length > 150   ||
                    usuario.senha             == '' ||  usuario.senha            == null     ||  usuario.senha          == undefined    ||  usuario.senha.length  > 50 ||
                    usuario.data_criacao      == '' ||  usuario.data_criacao     == null     || usuario.data_criacao    == undefined    ||  usuario.data_criacao.length > 10 ||
                    usuario.data_atualizacao  == undefined ||  usuario.data_atualizacao.length > 10 ||
                    id                        == ''        ||  id                 == undefined      ||  id              == null         || isNaN(id)
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await usuarioDAO.selectByIdUsuario(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        
                        usuario.id = id
                        let resultUsuario = await usuarioDAO.updateUsuario(usuario)

                        if(resultUsuario){
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

const  excluirUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if (resultUsuario.length > 0){
                    //delete
                    let result = await usuarioDAO.deleteUsuario(id)

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

const  listarUsuario = async function(){
    try {
        let dadosUsuario = {}

        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false){
            if(resultUsuario.length > 0){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.users = resultUsuario

                return dadosUsuario
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

const  buscarUsuario = async function(id){

    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario == 'object')){
                if(resultUsuario.length > 0){
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.users = resultUsuario

                return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}