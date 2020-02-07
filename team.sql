DROP DATABASE IF EXISTS tokio;
CREATE DATABASE tokio;

\c tokio;


CREATE SEQUENCE corretor_id_seq;

CREATE TABLE Corretor (
                id INTEGER NOT NULL DEFAULT nextval('corretor_id_seq'),
                nome VARCHAR NOT NULL,
                CONSTRAINT corretor_pk PRIMARY KEY (id)
);


ALTER SEQUENCE corretor_id_seq OWNED BY Corretor.id;

CREATE SEQUENCE grupo_id_seq;

CREATE TABLE Grupo (
                id INTEGER NOT NULL DEFAULT nextval('grupo_id_seq'),
                lider INTEGER NOT NULL,
                nome VARCHAR NOT NULL,
                liderManual BOOLEAN NOT NULL,
                diretoria VARCHAR NOT NULL,
                sucursal VARCHAR NOT NULL,
                dtInclusao DATE NOT NULL,
                dtAlteracao DATE NOT NULL,
                usuario VARCHAR NOT NULL,
                resgate BOOLEAN NOT NULL,
                tipo VARCHAR NOT NULL,
                aumentaSinistralidade BOOLEAN NOT NULL,
                CONSTRAINT grupo_pk PRIMARY KEY (id)
);


ALTER SEQUENCE grupo_id_seq OWNED BY Grupo.id;

CREATE TABLE Grupo_Corretor (
                idGrupo INTEGER NOT NULL,
                idCorretor INTEGER NOT NULL,
                CONSTRAINT grupo_corretor_pk PRIMARY KEY (idGrupo, idCorretor)
);


ALTER TABLE Grupo ADD CONSTRAINT corretor_grupo_fk
FOREIGN KEY (lider)
REFERENCES Corretor (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Grupo_Corretor ADD CONSTRAINT corretor_grupo_corretor_fk
FOREIGN KEY (idCorretor)
REFERENCES Corretor (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Grupo_Corretor ADD CONSTRAINT grupo_grupo_corretor_fk
FOREIGN KEY (idGrupo)
REFERENCES Grupo (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

INSERT INTO public.corretor(nome)
	VALUES ('Gustavo Alves');

INSERT INTO public.corretor(nome)
	VALUES ('Thiago Jota');

INSERT INTO public.corretor(nome)
	VALUES ('Bruno Correia');

INSERT INTO public.grupo(
	lider, nome, lidermanual, diretoria, sucursal, dtinclusao, dtalteracao, usuario, resgate, tipo, aumentasinistralidade)
	VALUES ( 1, 'Grupo 1', true, 'Diretoria', 'sucursal', '2010-01-01', '2010-10-01', 1, true, 'Direto', false);

INSERT INTO public.grupo(
	lider, nome, lidermanual, diretoria, sucursal, dtinclusao, dtalteracao, usuario, resgate, tipo, aumentasinistralidade)
	VALUES ( 1, 'Grupo 2', true, 'Diretoria', 'sucursal', '2010-01-01', '2010-10-01', 1, true, 'Direto', false);