export class PathEntry{
    inList : boolean = true;
    get isFolder(){
        return !this.isFile;
    }
    constructor(public path: String, public isFile: boolean) {}
}