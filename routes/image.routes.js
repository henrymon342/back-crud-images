const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary');
const multer  = require('../libs/multer')
const db = require('../models')


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

   await db.Imagen.create(
    newImage
  ).then( (newImagen) => {
    res.send({
      'message': 'File uploaded successfully',
      newImagen
    });
  })
  .catch(err => {
    res.status(500).send({
      message: err
    });
  });
});


router.get('/find/:id', (req, res) => {
  const {id} = req.params;  
  db.Imagen.findOne({
      where: { idAsosiado: id }
  })
  .then((ImageFound) => {
    if (ImageFound ) {
        res.send(ImageFound)
      } else {
        res.send({
          message: `Cannot found Imagen with id=${id}`
        });
      }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error getting Image"
    });
  });
})


router.put('/update/:id', multer.single('image'), async (req, res) => {
  const {id} = req.params; 
  console.log(id);
  const impath = req.file['path'];
  // const newImage = { imagePath: req.file.path };
  // res.send(req.file)

  await db.Imagen.findOne({
    where: {idAsosiado: id}
 }).then(async (result) => {
      console.log(result);
      if( result ){
        console.log(result, 'IMAGEN EXISTE');
      }else{
        console.log(result, 'NO EXISTE IMAGEN');
      }

      // elimina la direccion y la imagen de uploads
      // fs.unlink(path.resolve(result.dataValues.imagePath))
      // ELIMINA LA IMAGEN DEL SERVIDOR DE CLOUDINARY
      await cloudinary.uploader.destroy(result.cloudinary_id)
      //CLOUDINARY
      const resultimg = await cloudinary.uploader.upload(impath)
      const auxImage = { 
                        idAsosiado: id,
                        imagePath: resultimg.secure_url, 
                        cloudinary_id: resultimg.public_id
       };
      db.Imagen.update( auxImage,{
        where: { idAsosiado: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Imagen was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Imagen with id=${id}. Maybe Imagen was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Imagen with id=" + id
        });
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error getting Image"
    });
  });
  
})


router.delete('/delete/:id', async (req, res) => {
  const {id} = req.params; 
  await db.Imagen.findOne({
    where: {idAsosiado: id}
 }).then(async (result) => {
    // BORRA LA IMAGEN DE LA CAPPETA EN LA QUE SE ENCUENTRA
    // fs.unlink(path.resolve(result.dataValues.imagePath))
    // ELIMINA LA IMAGEN DEL SERVIDOR DE CLOUDINARY
    await cloudinary.uploader.destroy(result.cloudinary_id)
    db.Imagen.destroy({
        where: { idAsosiado: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Imagen was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Imagen with id=${id}. Maybe Imagen was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Imagen with id=" + id
        });
      });
 });
})

router.get('/all', (req, res) => {
  db.Imagen.findAll({
  }).then((allImages) => {
      res.send(allImages)
  });
})


module.exports = router;
