import { PathEntry } from "./components/song-modules/PathEntry";
import { InterfaceEntry } from "./components/song-modules/interface-entry";

export class SaveState{
    current: number = 0;
    toBeSaved: InterfaceEntry[] = [];
    currentlySaving: String;
    constructor(){}

    get total() {
        return this.toBeSaved.length;
    }
}