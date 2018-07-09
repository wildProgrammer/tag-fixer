import { PathEntry } from "./PathEntry";

const fs = require("fs");
const paths = require("path");

export function searchMusic(path: String, arr:Array<PathEntry>,  set: Set<String>){
    getFilesFromFolder(path, str => {
        if(!set.has(path)){
            set.add(str)
            arr.push(new PathEntry(str, true));
        }
    });
    return arr;
}

function getFilesFromFolder(path : String, callback: Function){
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            let absPath = paths.join(path, file);

            let stat = fs.lstatSync(absPath);
            if (stat.isDirectory()) {
                console.log(absPath);
                getFilesFromFolder(absPath, callback);
            }
            else if (stat.isFile() &&  hasValidExtension(absPath)){
                callback(absPath);
            }
        });
    })
    
}

export function hasValidExtension(path: String): boolean{
    // console.log(path);
    return paths.extname(path).toLowerCase() == ".mp3"
}

