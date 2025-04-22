show databases;

use db_musicas_aa;

show tables;

drop table tbl_teste;

create table tbl_musica(
	id 					int not null primary key auto_increment,
    nome 				varchar(100) not null,
    duracao 			time not null,
    data_lancamento 	date not null,
    letra 				text,
    link 				varchar(200)
);

select * from tbl_musica;

CREATE TABLE tbl_genero (
  id_genero    int not null primary key auto_increment,
  tipo_genero  VARCHAR(50) NOT NULL
  );
  
select * from tbl_genero;

select * from tbl_genero order by id_genero desc;
   
CREATE TABLE tbl_artistas (
  id_artista      int not null primary key auto_increment,
  nome            VARCHAR(100) NOT NULL,
  biografia       TEXT NOT NULL,
  imagem_artista  VARCHAR(200) NOT NULL
  );
  
select * from tbl_artistas;

CREATE TABLE tbl_usuarios (
  id_usuario 		int not null primary key auto_increment,
  nome_usuario		VARCHAR(100) NOT NULL,
  email 			VARCHAR(150) NOT NULL,
  senha 			VARCHAR(50) NOT NULL,
  data_criacao		DATE NOT NULL,
  data_atualizacao 	DATE NULL
  );
  
select * from tbl_usuarios;
  
select * from tbl_usuarios order by id_usuario desc;