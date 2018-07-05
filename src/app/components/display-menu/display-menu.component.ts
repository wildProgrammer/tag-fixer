import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry } from '../../PathEntry';


@Component({
  selector: 'app-display-menu',
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.scss']
})

export class DisplayMenuComponent implements OnInit {
  
  selectedEntry: PathEntry;
  
  constructor(private filesService: FilesListService) {
    filesService.searchInFolders();
    filesService.pathEntries.forEach(el => el.loadTags()) 

    this.selectedEntry = this.pathEntries[0]; 
  }

  ngOnInit() {
    
  }

  get pathEntries(): PathEntry[]{
    return this.filesService.pathEntries;
  }

  selectEntry(entry: PathEntry){
    this.selectedEntry = entry;
  }
}
