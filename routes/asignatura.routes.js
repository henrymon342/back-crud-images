const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/new', (req, res) => {
    db.Asignatura.create(
        req.body
    ).then((newAsignatura) => {
        res.send(newAsignatura)
    });
})



router.get('/all', (req, res) => {
    db.Asignatura.findAll({
    }).then((allAsignaturas) => {
        res.send(allAsignaturas)
    });
})


router.get('/find/:id', (req, res) => {
    db.Asignatura.findByPk(req.params.id).then((AsignaturaFound) => {
        res.send(AsignaturaFound)
    });
})


router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    numerito = req.body.numero
    db.Asignatura.update( req.body,{
    where: [{ idFKPastor: id  }, { numero: numerito }]
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Asignatura was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Asignatura with id=${id}. Maybe Asignatura was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Asignatura with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
  const {id} = req.params; 
    db.Asignatura.destroy({
        where: { idFKPastor: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Asignatura was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Asignatura with id=${id}. Maybe Asignatura was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Asignatura with id=" + id
        });
      });
})



router.post('/findByIdPastor', (req, res) => {
  db.Asignatura.findAll({
    where: { idFKPastor: req.body.idFKPastor }
  }).then((Asignatura) => {
      if( Asignatura ){
        res.send(Asignatura);
      }else{
        res.send({message: 'vacio'})
      }
  })
})








module.exports = router;