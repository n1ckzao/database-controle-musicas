/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertArtista = async function(artista){
    try {

    

    let sql = `insert into tbl_artistas ( nome, 
                                        biografia, 
                                        imagem_artista
                                        )
                            values      (
                                        '${artista.nome}',
                                        '${artista.biografia}',
                                        '${artista.imagem_artista}'
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

const updateArtista = async function(artista){
    try {
        let sql = `update tbl_artistas set      nome           = '${artista.nome}',
                                                biografia      = '${artista.biografia}',
                                                imagem_artista = '${artista.imagem_artista}'
                                            where id_artista = ${artista.id_artista}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteArtista = async function(id_artista){
    try{
        let sql = `delete from tbl_artistas where id_artista = ${id_artista}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
const selectAllArtista = async function (){
    try {
        let sql = 'select * from tbl_artistas order by id_artista desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdArtista = async function(id_artista){
    try {
        let sql = `select * from tbl_artistas where id_artista = ${id_artista}`

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
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}