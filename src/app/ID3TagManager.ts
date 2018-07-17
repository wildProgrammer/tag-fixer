import { ProcessPool } from "./process-pool";
import { PathEntry } from "./PathEntry";


const NodeID3 = require('node-id3')

export interface ID3Tags {
    title?: String,
    artist?: String,
    image?: any,
    description?: String,
    album?: String,
    genre?: String,
    year?: number,
    trackNumber?: number;
    unsynchronisedLyrics?: {
        language?: String,
        text: String
    };
    composer?: String;
    time?: String;
    date?: String;
    publisher?: String
}

const pool = new ProcessPool(3);

export class ID3TagManager {

    constructor(public path: String) { }

    setTags(target: PathEntry) {
        pool.loadTags(target);
    }

    saveTags(modifiedTags: ID3Tags, filePath: String) {
        return NodeID3.write(modifiedTags, filePath);
    }


}