import { ID3TagManager, ID3Tags } from "../../ID3TagManager";
const pathTools = require("path");
export { ID3TagManager, ID3Tags };

export class PathEntry {
    
    
    get isFolder() {
        return !this.isFile;
    }
    constructor(public path: String, public isFile: boolean) {}

    get fileName() {
        return pathTools.basename(this.path, '.mp3');
    }









}