import { PathEntry } from "./PathEntry";
import { TagAlias, supportedAliases, supportedAliasesNames } from "../../supported-aliases";
import { TagState } from "./TagState";

export class EditTemporaryState{
    tagNamesWithTypes: TagAlias;
    availableTags: String[];
    selectedImage: {
        path: String,
        mimeType: String
    };
    decodedImg: string;
    newTagName: String;
    constructor(){
        this.newTagName = null;
        this.availableTags = supportedAliasesNames;
        this.tagNamesWithTypes = null;
        this.decodedImg = null;
        this.selectedImage = null;
    }
}

export class ListEntryState{
    inList: boolean = true;
    constructor(){}
}

export class InterfaceEntry{
    editState: EditTemporaryState
    tagState: TagState;
    listState: ListEntryState;
    constructor(public file:PathEntry){
        this.editState = new EditTemporaryState();
        this.tagState = new TagState(this.file);
        this.listState = new ListEntryState();
    }
    equals(entry: InterfaceEntry){
        return this.file.path === entry.file.path
    }
}