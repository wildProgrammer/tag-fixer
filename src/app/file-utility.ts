const fs = require("fs");
const paths = require("path");

export function getFilesFromFolder(path : String): String[] {
    var filePaths: String[] = [];
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            let absPath = paths.join(path, file);
            let stat = fs.lstatSync(absPath);
            if (stat.isFile() &&  hasValidExtension(absPath)){
                console.log(absPath);
                filePaths.push(absPath);
            } else if(stat.isDirectory()){
                filePaths = filePaths.concat(getFilesFromFolder(absPath));
            }
        });
    })
    return filePaths;
}

export function hasValidExtension(path: String): boolean{
    console.log(path);
    console.log(paths.extname(path).toLowerCase() == ".mp3")
    return paths.extname(path).toLowerCase() == ".mp3"
}

