const fs = require('fs');
const path = require('path');


function fileChecker() {
  return (req, res, next) => {
    
    const filePath = path.join(__dirname, req.path);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        return res.status(404).send('File not found');
      }
      // File exists
      next();
    });
  };
}

module.exports = fileChecker;
