/**************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no banco de dados
* Data:11/02/2025
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/
//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//instancia da classe do prisma client
const prisma = new PrismaClient()

//inserir nova musica
const insertMusica = async function(musica){
    try {
    let sql = `insert into tbl_musica ( nome, 
                                        duracao, 
                                        data_lancamento, 
                                        letra, 
                                        link)
                            values      (
                                        '${musica.nome}',
                                        '${musica.duracao}',
                                        '${musica.data_lancamento}',
                                        '${musica.letra}',
                                        '${musica.link}'
                                        )`

    //Executa o script AQL no banco de dados e aguarda o reultado (true ou false)
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false // bug no banco de dados

    } catch (error) {
        return false // bug de programação
    }
}

//atualizar musica existente
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set        nome            = '${musica.nome}',
                                                duracao         = '${musica.duracao}',
                                                data_lancamento = '${musica.data_lancamento}',
                                                letra           = '${musica.letra}',
                                                link            = '${musica.link}'
                                            where id = ${musica.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
//excluir musica existente
const deleteMusica = async function(id){
    try{
        let sql = `delete from tbl_musica where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    }catch (error) {
        return false
    }
}
//retornar todas as musicas do BD
const selectAllMusica = async function (){
    try {
        //Script SQL
        let sql = 'select * from tbl_musica order by id desc'

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result // retorna o dados do banco
        else
            return false
    } catch (error) {
        return false
    }
}
//buscar musicas pelo ID
const selectByIdMusica = async function(id){
    try {
        //Script SQL
        let sql = `select * from tbl_musica where id = ${id}`

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result // retorna o dados do banco
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}