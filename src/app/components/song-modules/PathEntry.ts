import { ID3TagManager, ID3Tags } from "../../ID3TagManager";
const pathTools = require("path");
export { ID3TagManager, ID3Tags };
var fileUrl = require('file-url');

export class PathEntry {
    

    // private dataUrl: string = null;
    
    
    get isFolder() {
        return !this.isFile;
    }
    constructor(public path: String, public isFile: boolean) {}

    get fileName() {
        return pathTools.basename(this.path, '.mp3');
    }









}