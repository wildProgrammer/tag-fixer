import { Component, OnInit, Input } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { PathEntry, ID3TagManager, ID3Tags } from '../../PathEntry'
import { Suggestion
         ,KeepTagsSuggestion
         ,FileNameSuggestion
         ,ReverseFileNameSuggestion
        } from '../../Suggestion-kinds/Suggestion';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  position: number;
  
  suggestions: Suggestion[];
  @Input()
  set song(entry: PathEntry){
    this.entry = entry;
    this.reload();
  }

  entry: PathEntry;

  constructor(private filesService: FilesListService) {
    
  }  

  ngOnInit() {
  }

  reload(){
    console.log("RELOAD SuggestionComponent")
    this.suggestions = [
      new KeepTagsSuggestion(this.entry),
      new FileNameSuggestion(this.entry),
      new ReverseFileNameSuggestion(this.entry)
    ]
  }

  

}
