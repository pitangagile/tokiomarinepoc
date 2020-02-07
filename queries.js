var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgresql://postgres:postgres@localhost:5432/tokio';

var db = pgp(connectionString);

function getAllGrupos(req, res, next) {
  db.any('select * from grupo')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recuperamos todos os grupos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleGrupo(req, res, next) {
  var grupoID = parseInt(req.params.id);
  db.one('select * from grupo where id = $1', grupoID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recuperamos um grupo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createGrupo(req, res, next) {
  req.body.lider = parseInt(req.body.lider);

  db.none('insert into grupo(lider, nome, liderManual, diretoria, sucursal, dtInclusao, dtAlteracao,'+
                          ' usuario, resgate, tipo, aumentaSinistralidade)' +
           'values(${lider}, ${nome}, ${liderManual}, ${diretoria}, ${sucursal} , ${dtInclusao}, ${dtAlteracao}, ${usuario}, ${resgate}, ${tipo}, ${aumentaSinistralidade})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateGrupo(req, res, next) {
  db.none('update grupo set lider = $1, nome = $2, liderManual = $3, diretoria = $4, sucursal = $5, dtInclusao = $6, dtAlteracao = $7,'+
  ' usuario = $8, resgate = $9, tipo = $10, aumentaSinistralidade = $11',
    [parseInt(req.body.lider), req.body.nome, req.body.liderManual, req.body.diretoria, req.body.sucursal,  req.body.dtInclusao, req.body.dtAlteracao, 
      req.body.usuario, req.body.resgate, req.body.tipo, req.body.aumentaSinistralidade])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated grupo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeGrupo(req, res, next) {
  var grupoID = parseInt(req.params.id);
  db.result('delete from grupo where id = $1', grupoID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} grupo`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllCorretores(req, res, next) {
  db.any('select * from corretor')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recuperamos todos os corretores'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllGrupos: getAllGrupos,
  getSingleGrupo: getSingleGrupo,
  createGrupo: createGrupo,
  updateGrupo: updateGrupo,
  removeGrupo: removeGrupo,
  getAllCorretores: getAllCorretores
};
