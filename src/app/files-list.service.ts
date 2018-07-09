import { Injectable } from '@angular/core';
import { PathEntry } from './PathEntry'
import { searchMusic } from './file-utility';
@Injectable({
  providedIn: 'root',
  useExisting : true
})
export class FilesListService {
  private entries : PathEntry[] = [];
  selectedEntry: PathEntry = null;
  constructor() {
    console.log("entries=" + this.entries);
    console.log("constructor of service")
   }
  addEntry(entry : PathEntry){
    if(this.entries.findIndex(el=>el.path===entry.path) === -1){
      this.entries.push(entry);
      entry.inList = true;
    }
    console.log(this.entries);
  }

  removeEntry(entry : PathEntry){
    if(!entry.inList) return;
    let pos = this.entries.findIndex(el => el == entry);
    if(pos != -1){
      this.entries[pos] = this.entries[this.entries.length-1];
      this.entries.pop();
    }
    entry.inList = false;
  }

  get pathEntries()  { return this.entries; }

  get length() { return this.entries.length; }

  removeAllEntries(){
    let cache = this.entries;
    this.entries = [];
    console.log("done deleting")
    for(let e of this.entries){
      e.inList=false;
    }
  }

  getByIndex(index: number): PathEntry{
    return this.entries[index];
  }

  searchInFolders(){
    let pathSet: Set<String> = new Set();
    this.entries = [];
    for(let entry of this.entries){
      if(entry.isFile && !pathSet.has(entry.path)){
        pathSet.add(entry.path);
        this.entries.push(entry);
      }
      else{
        searchMusic(entry.path, this.entries, pathSet);
      }
    }
    
  }

  selectNextEntry(){
    var i = this.entries.findIndex(e => e == this.selectedEntry);
    if(i < this.entries.length - 1)
      this.selectedEntry = this.entries[i+1];
    else 
      this.selectedEntry = this.entries[0];
  }

  selectPreviousEntry(){
    var i = this.entries.findIndex(e => e == this.selectedEntry);
    if(i > 0)
      this.selectedEntry = this.entries[i-1];
    else 
      this.selectedEntry = this.entries[this.entries.length-1];
  }

  reset(): void{
    this.removeAllEntries();
    this.selectedEntry = null;
  }
}
