import { ProcessPool } from "./process-pool";
import { PathEntry } from "./components/song-modules/PathEntry";
import { TagState } from "./components/song-modules/TagState";


const NodeID3 = require('node-id3')

export interface ID3Tags {
    title?: String,
    artist?: String,
    image?: {
        mime: String,
        type: {
            id: number,
            name: string
        },
        description?: String,
        imageBuffer: Buffer
    },
    description?: String,
    album?: String,
    genre?: String,
    year?: number,
    trackNumber?: number;
    unsynchronisedLyrics?: {
        language: String,
        text: String
    };
    composer?: String;
    time?: String;
    date?: String;
    publisher?: String
}

const pool = new ProcessPool(3);

export class ID3TagManager {


    static setTags(target: TagState) {
        pool.loadTags(target);
    }

    static saveTags(modifiedTags: ID3Tags, filePath: String) {
        return NodeID3.write(modifiedTags, filePath);
    }


}