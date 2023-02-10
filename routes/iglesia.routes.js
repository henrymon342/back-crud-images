const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/new', (req, res) => {
    db.Iglesia.create(
        req.body
    ).then((newIglesia) => {
        res.send(newIglesia)
    });
})

router.get('/all', (req, res) => {
    db.Iglesia.findAll({
    }).then((allChurchs) => {
        res.send(allChurchs)
    }).catch(err => {
      res.status(500).send({
        message: "Error getting all Iglesia "
      });
    });
})

router.get('/find/:id', (req, res) => {
    db.Iglesia.findByPk(req.params.id).then((churchFound) => {
        res.send(churchFound)
    });
})

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    db.Iglesia.update( req.body,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Iglesia was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Iglesia with id=${id}. Maybe Iglesia was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Iglesia with id=" + id
        });
      });
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Iglesia.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Iglesia was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Iglesia with id=${id}. Maybe Iglesia was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Iglesia with id=" + id
        });
      });
})


router.post('/findByCategory', (req, res) => {
  db.Iglesia.findAll({
    where: { category: req.body.category }
  }).then((Iglesias) => {
      res.send(Iglesias)
  });
})

module.exports = router;