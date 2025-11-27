// scanner.js, scans a directory for pdf files
const path = require('path');
const fs = require('fs');

const documentsFolder = path.join(__dirname, '..', 'documents');
let cache = [];
let cache_date = 0; // should be as old as possible to update on first run

function scan_folder() {
    // cache is accessed if it is less than an hour old
    if (Date.now() < cache_date + (60 * 60 * 1000)) {
        console.log("Returning Cache");
        return cache;
    }
    console.log("Cache is too old, updating cache");
    let files = fs.readdirSync(documentsFolder);
    let filtered = [];
    files.forEach(element => {
        // only get .pdf files
        const file_split = element.split(".");
        if (file_split[file_split.length - 1] == "pdf") {
            filtered.push(element);
        }
    });
    cache = filtered;
    cache_date = Date.now();
    console.log(`Cache successfully updated at ${cache_date}`);
    return filtered;
}

module.exports = scan_folder;