const express = require('express')
const router = express.Router()
const db = require('../models')

const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs');


//verifyToken

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.Administrador.findOne({
        where: { username: username }
    })
    console.log('USUARIO.....', user );
    if( !user ) {
        return res.status(200).json({message: 'El username no existe'});
    }
    // if( user.password != password ){
    //     return res.status(200).json({message: 'contraseña erronea'});  
    // } 

    const checkPassword = await compare( password, user.password )
    const token = jwt.sign({ _id: user.id }, 'secretkey' )  
    if( checkPassword ){
      res.send({
        token, username: user.username, type: user.type
      })
      return
    }

    if( !checkPassword ){
      res.status(409)
      res.send({
        message: 'contraseña erronea'
      })
      return  
    }

    return res.status(200).json({ token, username: user.username, type: user.type });
});






router.get('/all', (req, res) => {
    db.Auth.findAll({
    }).then((allAuths) => {
        res.send(allAuths)
    });
})


router.get('/find/:id', (req, res) => {
    db.Auth.findByPk(req.params.id).then((AuthFound) => {
        res.send(AuthFound)
    });
})


router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    db.Auth.update( req.body,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Auth was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Auth with id=${id}. Maybe Auth was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Auth with id=" + id
        });
      });
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.Auth.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Auth was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Auth with id=${id}. Maybe Auth was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Auth with id=" + id
        });
      });
})


function verifyToken( req, res, next ){
  console.log( req.headers.authorization );
  if( !req.headers.authorization ){
    return res.status(401).send('Unauthorize Request');  
  }

  const token = req.headers.authorization.split(' ')[1];
  if ( token === 'null' ){
    return res.status(401).send('Unauthorize Request');  
  }

  const payload = jwt.verify(token, 'secretkey');
  console.log(payload);
  req.userId = payload._id;
  next();
}





module.exports = router;