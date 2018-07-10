import { PathEntry } from "./PathEntry";

const fs = require("fs");
const paths = require("path");
const rx = require("rxjs");

export function searchMusic(path: String){
    
    var source = rx.Observable.create(observer => { 
        getFilesFromFolder(path, str => { 
            observer.next(str);
         })
    });
        
    return source;
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
    return paths.extname(path).toLowerCase() == ".mp3"
}

