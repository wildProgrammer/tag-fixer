"use strict";
exports.__esModule = true;
var fs = require("fs");
var paths = require("path");
function searchMusic(path, arr) {
    getFilesFromFolder(path, function (str) { return arr.push(str); });
    return arr;
}
exports.searchMusic = searchMusic;
function getFilesFromFolder(path, callback) {
    fs.readdir(path, function (err, files) {
        files.forEach(function (file) {
            var absPath = paths.join(path, file);
            var stat = fs.lstatSync(absPath);
            if (stat.isDirectory()) {
                console.log(absPath);
                getFilesFromFolder(absPath, callback);
            }
            else if (stat.isFile() && hasValidExtension(absPath)) {
                callback(absPath);
            }
        });
    });
}
function hasValidExtension(path) {
    // console.log(path);
    return paths.extname(path).toLowerCase() == ".mp3";
}
exports.hasValidExtension = hasValidExtension;
