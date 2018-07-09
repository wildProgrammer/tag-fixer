import { PathEntry } from "./PathEntry";

const fs = require("fs");
const paths = require("path");
const rx = require("rxjs");

export function searchMusic(path: String){
    var execObj = {
        depth: 0,
        startDir: function(){
            this.depth++;
        },
        endDir: function(){
            this.depth--;
        }
    }
    var source = rx.Observable.create(observer => 
        getFilesFromFolder(path, str => {
                observer.next(path);
                setImmediate(function(){
                    if(execObj.depth<=0){
                        observer.onCompleted();
                    }
                })
             }, execObj));
        
    return source;
}

function getFilesFromFolder(path : String, callback: Function, execObj){
    execObj.startDir();
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            let absPath = paths.join(path, file);

            let stat = fs.lstatSync(absPath);
            if (stat.isDirectory()) {
                console.log(absPath);
                getFilesFromFolder(absPath, callback, execObj);
            }
            else if (stat.isFile() &&  hasValidExtension(absPath)){
                callback(absPath);
            }
        });
        
    })
    execObj.endDir();
}

export function hasValidExtension(path: String): boolean{
    // console.log(path);
    return paths.extname(path).toLowerCase() == ".mp3"
}

