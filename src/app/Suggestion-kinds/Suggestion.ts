import { PathEntry, ID3TagManager, ID3Tags } from "../PathEntry";
import { TextFilter,
         ClearTextBetweenCharsFilter,
         RemoveCharFilter 
       } from "./SuggestionFilters"
export interface Suggestion{
    tags: any;
    title: String;
    getData();
    useFilter(filter: TextFilter);
    removeFilter(filter: TextFilter);
    getTag(name: string): any;
}

export class KeepTagsSuggestion implements Suggestion{
    tags: ID3Tags = null;
    title: String = "Keep existing tags";
    filters: TextFilter[] = [];
    constructor(public song: PathEntry){
        
    }

    getData(): ID3Tags {

        if (this.tags !== null) return this.tags;

        this.processData();
        
        this.applyFilters();

        return this.tags;
    }

    protected processData(): void {
        this.resetTags();
    }

    useFilter(filter: TextFilter){
        this.filters.push(filter)
        this.tags = null;
    }

    removeFilter(filter: TextFilter){
        var pos = this.filters.findIndex(el => el === filter);
        this.filters.splice(pos, 1);
        this.tags = null;
    }

    private applyFilters(){
        console.log(this.tags)
        console.log(this.filters)
        if (this.tags === null) throw "Error, tags are null when using filter";
        for (var i in this.tags) {
            
            if ((typeof this.tags[i]) === "string")
                for(var filter of this.filters){
                    this.tags[i] = filter.apply(this.tags[i])
                    console.log("getData APPLY FILTER")
                }
        }
    }

    protected resetTags(){
        this.tags =  Object.assign({}, this.song.tags);
    }

    getTag(name: String):any {
        return this.tags[name as string];
    }
}

export class FileNameSuggestion extends KeepTagsSuggestion{
    tags: ID3Tags = null;
    title: String = "Guessed from filename"
    path: String;
    constructor(public song: PathEntry){
        super(song);
        this.path = song.fileName.replace(/_/g, ' ');
    }
    
    processData(){
        var arr = this.path.split("-");
        var artist: String = arr[0];
        var title: String = "";
        for (var i = 1; i < arr.length; i++) {
            title += arr[i] + " ";
        }
        this.resetTags();
        this.tags.artist = artist;
        this.tags.title = title;
    }


}

export class ReverseFileNameSuggestion extends FileNameSuggestion {
    tags: ID3Tags = null;
    title: String = "Guessed from filename"
    path: String;
    constructor(public song: PathEntry) {
        super(song);
    }

    processData(){
        super.processData();
        console.log(`${this.tags.artist} and ${this.tags.title}`)
        var aux = this.tags.artist;
        this.tags.artist = this.tags.title;
        this.tags.title = aux;
        console.log(`after swap ${this.tags.artist} and ${this.tags.title}`)
    }
}