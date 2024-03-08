// multerConfig.js
const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Use the original file name for storing
    cb(null, file.originalname);
  }
});

// Initialize multer instance
const upload = multer({ storage: storage });

module.exports = upload;
