const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary');
const multer  = require('../libs/multer')
const path = require('path')
const fs = require('fs-extra')

router.post('/new',  multer.single('image'), async (req, res) => {
  const idAsosiado = req.body['idAsociado'];
  const impath = req.file['path'];
  console.log('idAsosiado', idAsosiado );
  console.log('req.files', req.file );
  console.log( 'path', impath );
  const result = await cloudinary.uploader.upload( impath )

  const newImage = { 
    idAsosiado,
    imagePath: result.secure_url,
    cloudinary_id: result.public_id
   };
  res.send({
    'message': 'File uploaded successfully',
    newImage
  });
});


router.get('/find/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params)
  // db.Imagen.findOne({
  //     where: { idAsosiado: req.params.id }
  // })
  // .then((ImageFound) => {
  //   if (ImageFound ) {
  //       res.send(ImageFound)
  //     } else {
  //       res.send({
  //         message: `Cannot found Imagen with id=${id}.`
  //       });
  //     }
  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message: "Error getting Image"
  //   });
  // });
})


// router.get('/prueba', async (req, res) => {
//   res.send( {message: 'llego'} )
// })


// router.post('/crear', multer.single('image'), async (req, res) => {
//   res.send( {message: 'llego la imagen'} )
// })





module.exports = router;
