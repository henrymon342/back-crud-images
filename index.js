const  express  =  require('express')

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const bodyParser = require("body-parser");

const cloudinary = require('./utils/cloudinary');


const  app  =  express()
const  port  =  3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




app.get('/', (req, res) => {
    res.json({
        'message': 'hello'
    });
});




app.post('/api/upload', multipartMiddleware, async (req, res) => {
  console.log(req.files);
  console.log(req.files.uploads[0]);
  const idAsosiado = req.body.idAsosiado;
  const impath = req.files.uploads[0].path;
  console.log( impath );
  const result = await cloudinary.uploader.upload(impath)

  // const newImage = { idAsosiado: idAsosiado, imagePath: impath };
  const newImage = { idAsosiado: idAsosiado,
                     imagePath: result.secure_url,
                     cloudinary_id: result.public_id
                    };

  res.json({
      'message': 'File uploaded successfully',
      newImage
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
