// import path from 'path';
// import multer from 'multer';
// import uuid from 'uuid/v4'

const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: '/tmp/task/uploads',
    filename: ( req, file, cb) => {
        cb( null, uuidv4() + path.extname(file.originalname))
    }
})

module.exports = multer({ storage })
// export default multer({ storage })
