import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry } from '../../PathEntry';
import { SaveState } from '../../save-state';


@Component({
  selector: 'app-display-menu',
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.scss']
})

export class DisplayMenuComponent implements OnInit {
  
  saving: boolean = false;
  
  savingState: SaveState;
  
  constructor(private filesService: FilesListService,
              private router: Router) {
    
  }

  ngOnInit() {
    this.pathEntries.forEach(el => {
      if(el.isFile)
        el.loadTags()
    })
    this.filesService.searchInFolders();
    console.log("after search in folders" + this.filesService.pathEntries)
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

  saveChanges(){
    this.savingState = new SaveState();
    this.saving = true;
    this.filesService.pathEntries.forEach(el => {
      if (el.isEdited()) {
        this.savingState.toBeSaved.push(el);
      }
    })
    this.savingState.toBeSaved.forEach((el) => {
      setTimeout(()=>
      {
        this.savingState.currentlySaving = el.fileName;
        if (el.save())
          this.savingState.current++;
          
      } , 0);
    })

    setTimeout(()=>{
      this.toMainMenu()
    },
    500);
  }
  
}
