var promise = require('bluebird');
var request = require('request-promise');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgresql://postgres:postgres@localhost:5432/tokio';

var db = pgp(connectionString);

function getAllGrupos(req, res, next) {
    request('http://169.57.168.117:7800/grupomovimentorestapi/v1/grupomovimento?cdGrupo=1&nmGrupo=grupo1&user=alex1')
    .then(function (data) {
      let retorno = parserJsonWeb(data);            
      res.status(200)
        .json({
          status: 'success',
          data: retorno,
          message: 'Recuperamos um grupo'
        });
    });
}

function parserJsonWeb(data){
  let json = JSON.parse(data);

  var arrayObj = []; 
  
  for (let index = 0; index < json.out.Data.length; index++) {
    var obj = { "id": json.out.Data[index].CD_CRTOR,
                "lider": json.out.Data[index].IC_LIDER,
                "nome": json.out.Data[index].NM_CRTOR,
                "lidermanual": true,
                "diretoria":json.out.Data[index].NM_CIA,
                "sucursal":"sucursal",
                "dtinclusao": json.out.Data[index].DT_INI_GRUPO,
                "dtalteracao":json.out.Data[index].DT_FIM_GRUPO,
                "usuario":"1",
                "resgate":true,
                "tipo":json.out.Data[index].NR_CNPJ,
                "aumentasinistralidade":false
              }
    arrayObj[index] = obj
  }
  return arrayObj;
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
/*
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
}*/

function createGrupo(req, res, next) {
  var requestOpts = {
      encoding: 'utf8',
      uri: 'http://169.57.168.117:7800/grupomovimentorestapi/v1/grupomovimento?cdGrupo=1&nmGrupo=grupo1&user=thiagojotacorreia',
      method: 'PUT',
      json: true
  };

  requestOpts.body = {
      "in":
      {
        "data":
          [
            {
              "id_ptcpt_grp_pnc":  1,
                "cd_grp_ptcpt_pnc":  1,
                "id_ptcpt":          1,
                "cd_crtor":          1,
                "nm_cia":            "ATP",
                "nm_crtor":	         req.query.nome,
                "nr_cnpj":	         "58.149.897/0001-08",
                "dt_ini_grupo":	     "2020-01-23 10:00:00.0",
                "dt_fim_grupo":	     "2020-01-23 10:00:00.0",
                "dt_ini_lider":	     "2020-01-23 10:00:00.0",
                "dt_fim_lider":	     "2020-01-23 10:00:00.0",
                "ic_lider":          "A",
                "cd_crtor_tms":      1,
                "cd_crtor_tmb":      1
            }
          ]
        
      }
  }

  request(requestOpts)
  .then(function (data) {
    console.log(res);
    res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one puppy',
        data: data
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
