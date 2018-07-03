const NodeID3 = require('node-id3')

export class ID3TagManager{
    constructor (public path: String) {}
    get tags() : any{
        let tags = NodeID3.read(this.path);
        return tags;
    }
}