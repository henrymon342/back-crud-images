const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/new', (req, res) => {
    db.Record.create(
        req.body
    ).then((newRecord) => {
        res.send(newRecord)
    });
})



router.get('/all', (req, res) => {
    db.Record.findAll({
        include: [db.Pastor]
    }).then((allRecords) => {
        res.send(allRecords)
    });
})


router.get('/find/:id', (req, res) => {
    db.Record.findAll({
        where: { id: req.params.id }, 
        include: [db.Pastor]
    }).then((RecordFound) => {
        res.send(RecordFound)
    });
})


router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    db.Record.update( req.body,{
        where: { id: req.params.id },
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Record was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Record with id=${id}. Maybe Record was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Record with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Record.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Record was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Record with id=${id}. Maybe Record was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Record with id=" + id
        });
      });
})



module.exports = router;