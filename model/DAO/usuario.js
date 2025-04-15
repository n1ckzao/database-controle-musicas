/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertUsuario = async function(usuario){
    try {

    let sql = `insert into tbl_usuarios (nome_usuario, 
                                        email,
                                        senha, 
                                        data_criacao,
                                        data_atualizacao
                                        )
                            values      (
                                        '${usuario.nome_usuario}',
                                        '${usuario.email}',
                                        '${usuario.senha}',
                                        '${usuario.data_criacao}',
                                        '${usuario.data_atualizacao}'
                                        )`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuarios set       nome            = '${usuario.nome_usuario}',
                                                duracao         = '${usuario.email}',
                                                data_lancamento = '${usuario.senha}',
                                                letra           = '${usuario.data_criacao}',
                                                link            = '${usuario.data_atualizacao}'
                                            where id = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteUsuario = async function(id){
    try{
        let sql = `delete from tbl_usuarios where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
const selectAllUsuario = async function (){
    try {
        let sql = 'select * from tbl_usuarios order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdUsuario = async function(id){
    try {
        let sql = `select * from tbl_usuarios where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}