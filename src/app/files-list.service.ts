import { Injectable } from '@angular/core';
import { PathEntry } from './components/song-modules/PathEntry'
import { searchMusic } from './file-utility';
import { Observable } from 'rxjs';
import { NullTemplateVisitor } from '@angular/compiler';
import { InterfaceEntry } from './components/song-modules/interface-entry';
@Injectable({
  providedIn: 'root',
  useExisting : true
})
export class FilesListService {
  private entries: InterfaceEntry[]=[];
  public observableEntries: Observable<Array<PathEntry>>;
  selectedEntry: InterfaceEntry = null;
  constructor() {
    console.log("entries=" + this.entries);
    console.log("constructor of service")
   }

  addEntry(entry : PathEntry){
    if(this.entries.findIndex(el=>el.file.path===entry.path) === -1){
      var interfaceEntry = new InterfaceEntry(entry);
      this.entries.push(interfaceEntry);
      interfaceEntry.listState.inList = true;
    }
    console.log(this.entries);
  }

  removeEntry(entry : InterfaceEntry){
    // if(!entry.inList) return;
    let pos = this.entries.findIndex(el => el == entry);
    if(pos != -1){
      this.entries[pos] = this.entries[this.entries.length-1];
      this.entries.pop();
    }
    // entry.inList = false;
  }

  get pathEntries()  { 
    return this.entries;
   }


  get length() { return this.entries.length; }

  removeAllEntries(){
    let cache = this.entries;
    this.entries = [];
    console.log("done deleting")
    for(let e of this.entries){
      e.listState.inList=false;
    }
  }

  getByIndex(index: number): InterfaceEntry{
    return this.entries[index];
  }

  searchInFolders(){
    let pathSet: Set<String> = new Set();
    // console.log("after pathset")
    var newEntries:InterfaceEntry[] = [];
    // console.log("after newEntries[]" )
    // for(let entry of this.entries){
    for(let i=this.entries.length-1; i>=0; i--){
      let entry = this.entries[i];
      if(entry.file.isFile && !pathSet.has(entry.file.path)){
        pathSet.add(entry.file.path);
        newEntries.push(entry);
        // console.log(entry.file.path + " pushed in array")
      }
      else{
        // console.log("searching in folder")
        searchMusic(entry.file.path).subscribe(
          path => {
            if (!pathSet.has(path)) {
              // console.log("path: " + path)
              pathSet.add(path)
              let entry = new InterfaceEntry(new PathEntry(path, true));
              entry.tagState.loadTags();
              newEntries.push(entry);
            }});
      }
    }
    this.entries = newEntries;
  }

  selectPreviousEntry(){
    var i = this.entries.findIndex(e => e == this.selectedEntry);
    if(i < this.entries.length - 1)
      this.selectedEntry = this.entries[i+1];
    else 
      this.selectedEntry = this.entries[0];
  }

  selectNextEntry(){
    var i = this.entries.findIndex(e => e == this.selectedEntry);
    for(var j = i>0 ? i-1: this.entries.length; !this.entries[j].tagState.tagsLoaded; j=j>0? j--: this.entries.length);
    
    this.selectedEntry = this.entries[j];
    // if(i > 0)
      //   this.selectedEntry = this.entries[i-1];
      // else 
      //   this.selectedEntry = this.entries[this.entries.length-1];
  }

  reset(): void{
    this.removeAllEntries();
    this.selectedEntry = null;
  }
}
