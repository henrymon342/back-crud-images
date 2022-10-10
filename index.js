const  express  =  require('express')
const multer  = require('./libs/multer')
const bodyParser = require("body-parser");
const cors = require('cors')
const cloudinary = require('./utils/cloudinary');
const db = require('./models');

const  app  =  express()
const PORT = process.env.PORT || 3000;

const corsOptions ={
  origin:['https://front-crud-images.vercel.app', 'http://localhost:4200'], 
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

// ROUTES...
// ADMINISTRADORES' ROUTES 
const admiRoutes = require('./routes/administrador.routes');
app.use("/api/administrador", admiRoutes);

// PASTORES' ROUTES 
const pastorRoutes = require('./routes/pastor.routes');
app.use("/api/pastores", pastorRoutes);

// RECORDS' ROUTES 
const recordRoutes = require('./routes/record.routes');
app.use("/api/records", recordRoutes);

// IMAGES' ROUTES 
const imageRoutes = require('./routes/image.rotes');
app.use("/api/image", imageRoutes);

app.post('/api/create',  multer.single('image'), async (req, res) => {
  const idAsosiado = req.body['idAsociado'];
  const impath = req.file['path'];
  console.log('idAsosiado', idAsosiado );
  console.log('req.files', req.file );
  console.log( 'path', impath );
  // console.log(req.files.uploads[0]);
  const result = await cloudinary.uploader.upload( impath )

  res.send({
    message: 'llego el mensage',
    result
  })

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




db.sequelize.sync().then(() => {
  app.listen(PORT, () =>{
      console.log(`LISTENING AT: http://localhost:${PORT}`);
  });
});
// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))



