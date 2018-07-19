import { Component, OnInit, Input } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { PathEntry, ID3TagManager, ID3Tags } from '../song-modules/PathEntry'
import { Suggestion
         ,KeepTagsSuggestion
         ,FileNameSuggestion
         ,ReverseFileNameSuggestion
        } from '../../Suggestion-kinds/Suggestion';
import { TextFilter, RemoveCharFilter, ClearTextBetweenCharsFilter } from '../../Suggestion-kinds/SuggestionFilters';
import { InterfaceEntry } from '../song-modules/interface-entry';

interface FilterDescriptor {
  obj: TextFilter;
  name: String;
  description: String;
  enabled: boolean;
}

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  position: number;
  
  suggestions: Suggestion[];

  filters: FilterDescriptor[] = 
    [
      {
        obj: new ClearTextBetweenCharsFilter("(", ")"),
        name: "del-parantheses",
        description: "Delete text between parantheses",
        enabled: false
      },
      {
        obj: new ClearTextBetweenCharsFilter("[", "]"),
        name: "del-square-brackets",
        description: "Delete text between square brackets",
        enabled: false
      }
    ] 

  @Input()
  set song(entry: InterfaceEntry){
    var oldEntry = this.entry
    this.entry = entry;
    if(oldEntry!=this.entry)
      this.reload();
  }

  entry: InterfaceEntry;

  constructor(private filesService: FilesListService) {
    
  }  

  ngOnInit() {
  }

  reload(){
    // console.log("RELOAD SuggestionComponent")
    this.suggestions = [
      new KeepTagsSuggestion(this.entry),
      new FileNameSuggestion(this.entry),
      new ReverseFileNameSuggestion(this.entry)
    ]
  }

  toEdit(suggestion: Suggestion){
    this.entry.tagState.tags = suggestion.tags;
  }
  
  triggerChange(filter: FilterDescriptor){
    console.log("triggerChange")
    for(let suggest of this.suggestions){
      if(filter.enabled)
        suggest.useFilter(filter.obj)
      else
        suggest.removeFilter(filter.obj);
    }
  }

}
