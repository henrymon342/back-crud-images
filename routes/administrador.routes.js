const express = require('express')
const router = express.Router()
const db = require('../models')
const { encrypt, compare } = require('../helpers/handlerBcrypt')


router.post('/new', async (req, res) => {
  const {name, lastname, username, password, cargo, type, ministerio, miembroen } = req.body;
  const passwordHash = await encrypt(password);
    db.Administrador.create({
      name, lastname, username, passwordHash, cargo, type, ministerio, miembroen
    }).then((newAdministrador) => {
      res.send(newAdministrador)
    });
})


router.get('/all', (req, res) => {
    db.Administrador.findAll({
        // include: [db.AdmiEventos]
    }).then((allAdministradores) => {
        res.send(allAdministradores)
    });
})


router.get('/find/:id', (req, res) => {
    db.Administrador.findOne({
        where: { id: req.params.id }
        // include: [db.AdmiEventos]
    }).then((AdministradorFound) => {
        res.send(AdministradorFound)
    });
})


router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    db.Administrador.update( req.body,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Administrador was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Administrador with id=${id}. Maybe Administrador was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Administrador with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Administrador.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Administrador was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Administrador with id=${id}. Maybe Administrador was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Administrador with id=" + id
        });
      });
})



router.post('/findActivitiesUser', (req, res) => {
  db.Administrador.findAll({
    where: { type: req.body.type }
    // include: [db.AdmiEventos]
  }).then((newAdministrador) => {
      res.send(newAdministrador)
  });
})








module.exports = router;