const fs = require('fs');
const path = require('path');


function file_checker(req, res, next) {
    const filePath = path.join(__dirname, "..", req.path);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        next();
    });
}


module.exports = {
    file_checker: file_checker
}
