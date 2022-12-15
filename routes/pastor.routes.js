const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/new', (req, res) => {
    const {area, category, lugardeministerio, membresia, name, titulos, year, requisitos } = req.body
    const pas = {
      area, category, lugardeministerio, membresia, name, titulos, year, requisitos
    }
    
    db.Pastor.create(
        pas
    ).then((newPastor) => {
        res.send(newPastor)
    });
})



router.get('/all', (req, res) => {
    db.Pastor.findAll({
    }).then((allPastores) => {
        res.send(allPastores)
    });
})


router.get('/find/:id', (req, res) => {
    db.Pastor.findByPk(req.params.id).then((PastorFound) => {
        res.send(PastorFound)
    });
})


router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    db.Pastor.update( req.body,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Pastor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Pastor with id=${id}. Maybe Pastor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Pastor with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Pastor.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Pastor was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Pastor with id=${id}. Maybe Pastor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Pastor with id=" + id
        });
      });
})



router.post('/findByCategory', (req, res) => {
  db.Pastor.findAll({
    where: { category: req.body.category }
  }).then((Pastores) => {
      res.send(Pastores)
  });
})


router.post('/findByName', (req, res) => {
  db.Pastor.findOne({
    where: { name: req.body.name }
  }).then((Pastor) => {
      res.send(Pastor)
  });
})







module.exports = router;