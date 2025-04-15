/**************************************************************************************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados)
*       Validações, tratamento de dados etc..
* Data:01/04/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const message = require('../../modulo/config.js')
const generoDAO = require ('../../model/DAO/genero.js')

const  inserirGenero = async function(genero, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if(genero.tipo_genero == '' ||  genero.tipo_genero  == null      ||  genero.tipo_genero == undefined  ||  genero.tipo_genero.length > 100){

            return message.ERROR_REQUIRED_FIELDS //400

        }else{
            let resultGenero = await generoDAO.insertGenero(genero)

            if(resultGenero)
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
const  atualizarGenero = async function(id_genero, genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if(genero.tipo_genero == '' ||  genero.tipo_genero  == null      ||  genero.tipo_genero == undefined  ||  genero.tipo_genero.length > 100 ||
                id_genero         == '' ||  id_genero           == undefined ||  id_genero          == null       ||  isNaN(id_genero)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let result = await generoDAO.selectByIdGenero(id_genero)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        genero.id_genero = id_genero
                        let resultGenero = await generoDAO.updateGenero(genero)

                        if(resultGenero){
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
const  excluirGenero = async function(id_genero){
    try {
        if(id_genero == '' || id_genero == undefined || id_genero == null || isNaN(id_genero)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultGenero = await generoDAO.selectByIdGenero(id_genero)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if (resultGenero.length > 0){
                    let result = await generoDAO.deleteGenero(id_genero)

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
const  listarGenero = async function(){
    try {
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false){
            if(resultGenero.length > 0){
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                dadosGenero.genres = resultGenero

                return dadosGenero
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
const  buscarGenero = async function(id){

    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosGenero = {}
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero == 'object')){
                if(resultGenero.length > 0){
                dadosGenero.status = true,
                dadosGenero.status_code = 200,
                dadosGenero.genres = resultGenero

                return dadosGenero
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}