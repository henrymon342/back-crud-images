const express  =  require('express')
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
app.use(bodyParser.json({ limit: '12mb' }));
app.use(bodyParser.urlencoded({
  limit: "12mb",
  extended: true
}));
// fixing "413 Request Entity Too Large" errors
// app.use(express.urlencoded({limit: "12mb", extended: true, parameterLimit: 50000}))




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

// ASIGNATURAS' ROUTES 
const asignaturaRoutes = require('./routes/asignatura.routes');
app.use("/api/asignaturas", asignaturaRoutes);

// IMAGES' ROUTES 
const imageRoutes = require('./routes/image.routes');
app.use("/api/image", imageRoutes);

// EVENTOS' ROUTES 
const eventosRoutes = require('./routes/eventos.routes');
app.use("/api/event", eventosRoutes);

// AUTH' ROUTES 
const authRoutes = require('./routes/auth.routes');
app.use("/api/auth", authRoutes);


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
});




db.sequelize.sync().then(() => {
  app.listen(PORT, () =>{
      console.log(`LISTENING AT: http://localhost:${PORT}`);
  });
});
// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))



