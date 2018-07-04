import { Injectable } from '@angular/core';
import { PathEntry } from './PathEntry'
@Injectable({
  providedIn: 'root',
  useExisting : true
})
export class FilesListService {
  private entries : PathEntry[];
  constructor() {
    console.log("entries=" + this.entries);
    this.entries = [];
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
    for(let e of this.entries){
      e.inList=false;
    }
    this.entries = [];
  }

  getByIndex(index: number): PathEntry{
    return this.entries[index];
  }
}
