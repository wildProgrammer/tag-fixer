import { PathEntry, ID3TagManager, ID3Tags } from "../PathEntry";

export interface Suggestion{
    tags: any;
    title: String;
    getData();
}

export class KeepTagsSuggestion implements Suggestion{
    tags: ID3Tags = null;
    title: String = "Keep existing tags";
    constructor(public song: PathEntry){
        
    }

    getData(): ID3Tags {
        if(this.tags === null)
            this.tags = Object.assign({}, this.song.tags);
        return this.tags;
    }
}

export class FileNameSuggestion extends KeepTagsSuggestion{
    tags: ID3Tags = null;
    title: String = "Guessed from filename"
    path: String;
    constructor(public song: PathEntry){
        super(song);
        this.path = song.fileName.replace('_', ' ');
    }
    
    getData(): ID3Tags{
        if(this.tags !== null) return this.tags;
        
        var arr = this.path.split("-");
        var artist: String = arr[0];
        var title: String = "";
        for(var i=1; i<arr.length; i++){
            title += arr[i] + " ";
        }
        this.tags = Object.assign({}, this.song.tags);
        this.tags.artist = artist;
        this.tags.title = title;

        return this.tags;
    }
}

export class ReverseFileNameSuggestion extends FileNameSuggestion {
    tags: ID3Tags = null;
    title: String = "Guessed from filename"
    path: String;
    constructor(public song: PathEntry) {
        super(song);
    }

    getData(): ID3Tags {
        if(this.tags !== null) return this.tags;
        super.getData();
        console.log(`${this.tags.artist} and ${this.tags.title}`)
        var aux = this.tags.artist;
        this.tags.artist=this.tags.title;
        this.tags.title=aux;
        console.log(`after swap ${this.tags.artist} and ${this.tags.title}`)
        return this.tags;
    }
}