/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAlbum = async function(album){
    try {

    let sql = `insert into tbl_albuns (titulo, data_lancamento, id_artista)
                               values ('${album.titulo}', '${album.data_lancamento}', ${album.id_artista})`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

const updateAlbum = async function(album){
    try {
        let sql = `update tbl_albuns set        titulo          = '${album.titulo}',
                                                data_lancamento = '${album.data_lancamento}',
                                                id_artista      = '${album.id_artista}'
                                                where id_album  = ${album.id_album}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteAlbum = async function(id_album){
    try{
        let sql = `delete from tbl_albuns where id_album = ${id_album}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
const selectAllAlbum = async function (){
    try {
        let sql = 'select * from tbl_albuns order by id_album desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdAlbum = async function(id_album){
    try {
        let sql = `select * from tbl_albuns where id_album = ${id_album}`

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
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}