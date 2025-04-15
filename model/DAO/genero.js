/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:01/04/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGenero = async function(genero){
    try {

    let sql = `insert into tbl_genero (tipo_genero) 
                                    values ('${genero.tipo_genero}')`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set tipo_genero = '${genero.tipo_genero}' where id_genero = ${genero.id_genero}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteGenero = async function(id_genero){
    try{
        let sql = `delete from tbl_genero where id_genero = ${id_genero}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
const selectAllGenero = async function (){
    try {
        let sql = 'select * from tbl_genero order by id_genero desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdGenero = async function(id_genero){
    try {
        let sql = `select * from tbl_genero where id_genero = ${id_genero}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}