import { Injectable } from '@angular/core';
import { PathEntry } from './PathEntry'
import { getFilesFromFolder } from './file-utility';
require("./file-utility");
@Injectable({
  providedIn: 'root',
  useExisting : true
})
export class FilesListService {
  private entries : PathEntry[] = [];
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
    for(let entry of this.entries){
      if(entry.isFile)
        pathSet.add(entry.path);
      else
        for(let innerFile of getFilesFromFolder(entry.path))
          pathSet.add(innerFile);
    }
    console.log(pathSet.values);
    this.entries = Array.from(pathSet).map(el => new PathEntry(el, true));
  }
}
