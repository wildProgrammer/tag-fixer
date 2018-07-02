import { Injectable } from '@angular/core';
import { PathEntry } from './PathEntry'
import { FileListPreviewComponent} from './components/file-list-preview/file-list-preview.component'
@Injectable({
  providedIn: 'root'
})
export class FilesListService {
  private entries : PathEntry[] = [];
  constructor() { }
  addEntry(entry : PathEntry){
    if(this.entries.findIndex(el=>el.path===entry.path) === -1){
      this.entries.push(entry);
      entry.inList = true;
    }
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
}
