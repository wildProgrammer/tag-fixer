import { spawn } from "child_process";

const NodeID3 = require('node-id3')

export interface ID3Tags {
    title?: String,
    artist?: String,
    image?: any,
    description?: String,
    album?: String
}
const readline = require("readline");

const child = spawn('node', ['./pseudo-threads/tags-reader-worker.js']);
var reader = readline.createInterface({
    input: child.stdout,
    output: child.stdin,
    terminal: false
})

export class ID3TagManager{
    
    constructor (public path: String) {}

    get tags() : ID3Tags{
        let tags = NodeID3.read(this.path);
        return tags;
    }

    saveTags(modifiedTags: ID3Tags, filePath: String){
        return NodeID3.write(modifiedTags, filePath);
    }

    
}