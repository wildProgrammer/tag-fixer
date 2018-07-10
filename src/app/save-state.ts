import { PathEntry } from "./PathEntry";

export class SaveState{
    current: number = 0;
    toBeSaved: PathEntry[] = [];
    currentlySaving: String;
    constructor(){}

    get total() {
        return this.toBeSaved.length;
    }
}