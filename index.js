const  express  =  require('express')

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const bodyParser = require("body-parser");
const cors = require('cors')
const cloudinary = require('./utils/cloudinary');


const  app  =  express()
const PORT = process.env.PORT || 3000;

const corsOptions ={
  origin:'http://localhost:4200', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




app.get('/', (req, res) => {
    res.send({
        'message': 'hello'
    });
});

app.get('/api/users', (req, res) => {
  res.send([
    {
      name: "henry",
      age: "26",
      dni: '123456'
    },
    {
      name: 'pepito',
      age: '12',
      dni: '65421'
    }
  ]);
});


app.post('/api/create', async (req, res) => {
  const idAsosiado = req.body['idAsociado'];
  // const impath = req.files.uploads[0]['path'];
  console.log('req', req );
  console.log('req.body', req.body );
  console.log('req.files', req.files.uploads[0] );
  // console.log( impath );
  // console.log(req.files.uploads[0]);

  res.send({
    idAsosiado
  })
  // const result = await cloudinary.uploader.upload( impath )

  // const newImage = { 
  //   idAsosiado,
  //   imagePath: result.secure_url,
  //   cloudinary_id: result.public_id
  //  };
  // res.send({
  //   'message': 'File uploaded successfully',
  //   newImage
  // });
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

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))



