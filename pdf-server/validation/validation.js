const fs = require('fs');
const path = require('path');

function file_checker(filename) {
    const filePath = path.join(__dirname, "..", "documents", filename);
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}


module.exports = file_checker;