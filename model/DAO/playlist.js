/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertPlaylist = async function(playlist){
    try {

    let sql = `insert into tbl_playlist (titulo, data_criacao, id_usuario)
                               values ('${playlist.titulo}', '${playlist.data_criacao}', ${playlist.id_usuario})`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

const updatePlaylist = async function(playlist){
    try {
        let sql = `update tbl_playlist set      titulo          = '${playlist.titulo}',
                                                data_criacao = '${playlist.data_lancamento}',
                                                id_artista      = '${playlist.id_artista}'
                                                where id_playlist  = ${playlist.id_playlist}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deletePlaylist = async function(id_playlist){
    try{
        let sql = `delete from tbl_playlist where id_playlist = ${id_playlist}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
const selectAllPlaylist = async function (){
    try {
        let sql = 'select * from tbl_playlist order by id_playlist desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdPlaylist = async function(id_playlist){
    try {
        let sql = `select * from tbl_playlist where id_playlist = ${id_playlist}`

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
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylist,
    selectByIdPlaylist
}