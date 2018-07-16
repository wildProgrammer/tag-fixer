import { ID3TagManager, ID3Tags } from "./ID3TagManager";
const pathTools = require("path");
export { ID3TagManager, ID3Tags };
var fileUrl = require('file-url');
export class PathEntry {
    inList: boolean = true;
    _initialTags: any = null;
    tags: any = null;
    private dataUrl: string = null;
    tagManager: ID3TagManager = null;
    tagsLoaded: boolean = false;
    get isFolder() {
        return !this.isFile;
    }
    constructor(public path: String, public isFile: boolean) {

    }

    loadTags(): void {
        if (this.initialTags != null) return;
        if (this.tagManager === null)
            this.tagManager = new ID3TagManager(this.path);
        this.tagManager.setTags(this);


    }

    get url(){
        if(this.dataUrl === null){
            this.dataUrl = fileUrl(this.path)
        }
        return this.dataUrl;
    }

    get fileName() {
        return pathTools.basename(this.path, '.mp3');
    }

    isEdited() {
        return this.initialTags !== this.tags;
    }

    resetTags() {
        this.tags = this.initialTags;
    }

    save(): boolean {
        return this.tagManager.saveTags(this.tags as ID3Tags, this.path);

    }

    set initialTags(val: any) {
        this._initialTags = val;
        this.tags = val;
        this.tagsLoaded = true;
        console.log("load tags: " + JSON.stringify(this.tags));
    }

    get initialTags() {
        return this._initialTags;
    }

    getTag(name: String){
        return this.tags[name as string];
    }

}