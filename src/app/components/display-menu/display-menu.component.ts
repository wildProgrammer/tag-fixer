import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry } from '../../PathEntry';


@Component({
  selector: 'app-display-menu',
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.scss']
})

export class DisplayMenuComponent implements OnInit {
  
  
  
  constructor(private filesService: FilesListService,
              private router: Router) {
    filesService.searchInFolders();
    setTimeout(() => {
      this.pathEntries.forEach(el => {
        el.loadTags()
      });
      this.selectedEntry = this.pathEntries[0]
    }, 0); 
  }

  ngOnInit() {
    
  }

  get pathEntries(): PathEntry[]{
    return this.filesService.pathEntries;
  }

  selectEntry(entry: PathEntry){
    console.log("click" + entry.fileName);
    this.selectedEntry = entry;
  }

  get selectedEntry(): PathEntry{
    return this.filesService.selectedEntry;
  }

  set selectedEntry(value: PathEntry){
    this.filesService.selectedEntry = value;
  }

  prevSong(): void{
    this.filesService.selectPreviousEntry();
  }

  nextSong(): void{
    this.filesService.selectNextEntry();
  }

  toSuggestions(): void{
    this.selectedEntry.resetTags();
  }  

  toMainMenu(): void{
    this.filesService.removeAllEntries();
    this.filesService.reset();
    this.router.navigate(['../']);
  }
}
