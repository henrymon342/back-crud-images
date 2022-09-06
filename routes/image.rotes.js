const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary');
const multer  = require('../libs/multer')
const path = require('path')
const fs = require('fs-extra')



router.post('/new', multer.single('image'), async (req, res) => {

  // const impath = req.file.path;
  // console.log( impath );

  res.send( {message: 'llego la imagen'} )
  // //CLOUDINARY
  // const result = await cloudinary.uploader.upload(impath)

  // // const newImage = { idAsosiado: idAsosiado, imagePath: impath };
  // const newImage = { idAsosiado: idAsosiado,
  //                    imagePath: result.secure_url,
  //                    cloudinary_id: result.public_id
  //                   };
  //   await db.Imagen.create(
  //       newImage
  //   ).then( (newImagen) => {
  //        res.send(newImagen)
  //   });
})

router.get('/prueba', async (req, res) => {
  res.send( {message: 'llego'} )
})


router.post('/crear', multer.single('image'), async (req, res) => {
  res.send( {message: 'llego la imagen'} )
})





module.exports = router;
