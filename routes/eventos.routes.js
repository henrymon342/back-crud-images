const express = require('express')
const router = express.Router()
const db = require('../models')
const moment = require('moment'); 


router.post('/new', (req, res) => {
  const {ministerio, titulo, modalidad, optionplace, place, tipofecha, fechasingle, fechaini, fechafin, horaini, horafin, descripcion, encargado } = req.body
    const event = {
      ministerio, titulo, modalidad, optionplace, place, tipofecha, fechasingle, fechaini, fechafin, horaini, horafin, descripcion, encargado
    }
  db.Eventos.create(
    event
  ).then((newEvent) => {
    res.send(newEvent)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
})



router.get('/all', (req, res) => {
    db.Eventos.findAll().then((allEventos) => {
        res.send(allEventos)
    });
})


router.get('/find/:id', (req, res) => {
    db.Eventos.findOne({
        where: { id: req.params.id }
    }).then((EventoFound) => {
        res.send(EventoFound)
    });
})




router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const {ministerio, titulo, modalidad, optionplace, place, tipofecha, fechasingle, fechaini, fechafin, horaini, horafin, descripcion, encargado } = req.body
    const event = {
      ministerio, titulo, modalidad, optionplace, place, tipofecha, fechasingle, fechaini, fechafin, horaini, horafin, descripcion, encargado
    }
    db.Eventos.update( event,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Eventos was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Eventos with id=${id}. Maybe Eventos was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Eventos with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Eventos.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Eventos was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Eventos with id=${id}. Maybe Eventos was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Eventos with id=" + id
        });
      });
})



router.post('/findByMinisterio', (req, res) => {
  const {ministerio} = req.body;
  console.log(ministerio);
  db.Eventos.findAll({
    where: { ministerio: ministerio }
  }).then((EventosFound) => {
        res.send(EventosFound)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
})


router.post('/findByFecha', async (req, res) => {
  const fecha_ref = moment(req.body.fecha).format('L');
  console.log('FECHA', fecha_ref);
  
  arr = [];
  // const hoy = moment().format('DD-MM-YYYY');

  var eventos_parciales = [];

  arr = await db.Eventos.findAll();


  arr.forEach(evento => {

    if( evento.tipofecha == 'Varios días' ){

      const fecha_ver_ini = moment(evento.fechaini);
      const fecha_ver_fin = moment(evento.fechafin);
      console.log('FECHA INICIO_1', evento.fechaini);
      console.log('FECHA FIN_1', evento.fechafin);
      var isThere = false;
      var cursor_date = fecha_ver_ini;

      // console.log('mas uno', moment(evento.fechaini).add(1, 'days'));
      while ( cursor_date <= fecha_ver_fin ) {
        console.log('mas uno', cursor_date.format('L'));
        if( cursor_date.format('L') == fecha_ref ){
          isThere = true;
        }
        cursor_date = cursor_date.add(1, 'days');
      }

      if( isThere ){
        eventos_parciales.push(evento);
      }

    }else{
      const fecha_ver = moment(evento.fecha).format('L');
      console.log('DIA', fecha_ver);
      if( fecha_ref == fecha_ver ){
        console.log('ES LO MISMO', fecha_ver);
        eventos_parciales.push(evento);
      }
    }
  });

  res.send( eventos_parciales )
})


router.post('/findByMonth', async (req, res) => {
  const nromes = req.body.nromes;
  console.log('MES', nromes);

  arr = [];
  // const hoy = moment().format('DD-MM-YYYY');
  var eventos_parciales = [];
  arr = await db.Eventos.findAll();

  arr.forEach(evento => {
    if( evento.tipofecha == 'Varios días' ){

      if(verVariosDias( evento.fechaini, evento.fechafin, nromes )){
        eventos_parciales.push(evento)
      }

    }else{
      if(verDia( evento.fecha, nromes )){
        eventos_parciales.push(evento)
      }
    }
  });

  res.send( eventos_parciales )
})


router.post('/findByRangeDates', async (req, res) => {
  // 2022-06-06T04:00:00.000Z
  // const nromes = req.body.mes;
  // const nromes = req.body.mes;
  var uno = [];
  var dos = [];

  uno.push('2022-06-06T04:00:00.000Z');
  uno.push('2022-06-08T04:00:00.000Z');

  arr = [];
  var eventos_parciales = [];
  arr = await db.Eventos.findAll();

  arr.forEach(evento => {
    if( evento.tipofecha == 'Varios días' ){

      if(verVariosDias( evento.fechaini, evento.fechafin, nromes )){
        eventos_parciales.push(evento)
      }

    }else{
      if(verDia( evento.fecha, nromes )){
        eventos_parciales.push(evento)
      }
    }
  });

  res.send( eventos_parciales )
})


function verVariosDias( fecha_ini, fecha_fin, nromes){
  mesini = moment(fecha_ini).month();
  mesfin = moment(fecha_fin).month();
  console.log('fecha_ini', mesini);
  console.log('fecha_fin', mesfin);
  return nromes >= mesini && nromes <= mesfin? true: false;
}

function verDia( fechaunica, nromes){
  mesfecha = moment(fechaunica).month();
  console.log('fecha', mesfecha);
  return nromes == mesfecha? true: false;
}

module.exports = router;