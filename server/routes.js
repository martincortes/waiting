// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const mensajes = [
  
  {
    _id: 'XXX',
    user:'spiderman',
    mensaje: 'Hola mundo'
  }

];




// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});

// POST mensajes
router.post('/', function (req, res) {

  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes); //Es algo que voy a necesitar ver cuando lo haga offline

  res.json({
    ok: true,
    mensaje: mensaje
  });

});


module.exports = router;