import { ID3TagManager } from "./ID3TagManager";
const pathTools = require("path");
export class PathEntry{
    inList : boolean = true;
    initialTags: any = null;
    tags: any = null;
    tagManager: ID3TagManager = null;
    get isFolder(){
        return !this.isFile;
    }
    constructor(public path: String, public isFile: boolean) {}

    loadTags(): void{
        if (this.initialTags != null) return;
        if(this.tagManager === null)
            this.tagManager = new ID3TagManager(this.path);
        this.tags = this.tagManager.tags;
    }

    get fileName(){
        return pathTools.basename(this.path);
    }

}