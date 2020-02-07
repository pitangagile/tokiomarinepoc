var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/grupos', db.getAllGrupos);
router.get('/api/grupos/:id', db.getSingleGrupo);
router.post('/api/grupos', db.createGrupo);
router.put('/api/grupos/:id', db.updateGrupo);
router.delete('/api/grupos/:id', db.removeGrupo);

router.get('/api/corretores', db.getAllCorretores);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
