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

CREATE TABLE tbl_albuns (
  id_albuns INT NOT NULL primary key AUTO_INCREMENT,
  titulo    VARCHAR(100) NOT NULL,
  data_lancamento date NOT NULL,
  id_artista INT NOT NULL,
  
CONSTRAINT FK_ARTISTAS_ALBUM
FOREIGN KEY (id_artista)
REFERENCES tbl_artistas (id_artista)
);

ALTER TABLE tbl_albuns
CHANGE COLUMN id_albuns id_album INT NOT NULL AUTO_INCREMENT;

select * from tbl_albuns;
    
CREATE TABLE tbl_playlist (
  id_playlist INT NOT NULL primary key AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  data_criacao date NOT NULL,
  id_usuario INT NOT NULL,
  
CONSTRAINT FK_USUARIO_PLAYLIST
FOREIGN KEY (id_usuario)
REFERENCES tbl_usuarios (id_usuario)
);

select * from tbl_playlist;

CREATE TABLE tbl_musica_artistas (
  id_musica_artistas INT NOT NULL primary key AUTO_INCREMENT,
  id_musicas INT NOT NULL,
  id_artista INT NOT NULL,
  
CONSTRAINT FK_MUSICA_MUSICA_ARTISTA
FOREIGN KEY (id_musicas)
REFERENCES tbl_musica (id),

CONSTRAINT FK_ARTISTA_MUSICA_ARTISTA
FOREIGN KEY (id_artista)
REFERENCES tbl_artistas (id_artista)
);

select * from tbl_musica_artistas;