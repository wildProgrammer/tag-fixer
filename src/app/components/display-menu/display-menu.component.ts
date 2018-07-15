import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute, Router } from '@angular/router';
import { PathEntry } from '../../PathEntry';
import { SaveState } from '../../save-state';
import { HostListener } from '@angular/core';

const leftKey = 37,
      upKey = 38,
      rightKey = 39,
      downKey = 40;

@Component({
  selector: 'app-display-menu',
  templateUrl: './display-menu.component.html',
  styleUrls: ['./display-menu.component.scss']
})


export class DisplayMenuComponent implements OnInit {
  
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log("keypressed " + event.key)
    var code = event.key.charCodeAt(0)
    if(code == leftKey || code == upKey ){
      this.prevSong();
    }
    else if(code == rightKey || code == downKey ){
      this.prevSong();
    }
  }

  saving: boolean = false;
  
  savingState: SaveState;
  
  constructor(private filesService: FilesListService,
              private router: Router) {
    
  }

  ngOnInit() {
    this.pathEntries.reverse().forEach(el => {
      if(el.isFile)
        el.loadTags()
    })
    this.filesService.searchInFolders();
    // console.log("after search in folders" + this.filesService.pathEntries)
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
        this.savingState.toBeSaved.unshift(el);
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
