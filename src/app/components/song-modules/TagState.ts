import { PathEntry, ID3TagManager, ID3Tags } from "./PathEntry";

export{
    PathEntry,
    ID3TagManager,
    ID3Tags
}

export class TagState{
    tagsLoaded: boolean = false;

    _initialTags: ID3Tags = null;
    
    tags: ID3Tags = null;
    constructor(public pathEntry: PathEntry){

    }

    loadTags(): void {
        if (this.initialTags != null) return;
        ID3TagManager.setTags(this);
    }
    
    resetTags() {
        this.tags = this.initialTags;
    }

    isEdited() {
        return this.initialTags !== this.tags;
    }

    save(): boolean {
        return ID3TagManager.saveTags(this.tags as ID3Tags,
                                      this.pathEntry.path);

    }

    set initialTags(val: any) {
        this._initialTags = val;
        this.tags = val;
        this.tagsLoaded = true;
        // console.log("load tags: " + JSON.stringify(this.tags));
    }

    get initialTags() {
        return this._initialTags;
    }

    getTag(name: String) {
        return this.tags[name as string];
    }


}