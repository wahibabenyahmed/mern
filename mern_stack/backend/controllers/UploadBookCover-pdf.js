const multer  = require('multer');

const storage= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public/books')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
});

const upload= multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
 });

exports.multipleUpload= upload.fields([
  {name:"bookImage",maxCount:1},
  {name:"bookPdf",maxCount:1}
])

