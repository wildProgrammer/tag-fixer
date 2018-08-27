import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service';
import { InterfaceEntry } from '../song-modules/interface-entry';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit{

  constructor(private filesService: FilesListService) { }

  ngOnInit() {
    var defaultSelector = setInterval(() => {
      if (this.pathEntries.length > 0 && this.pathEntries[0].tagState.tagsLoaded) {
        this.selectedEntry = this.pathEntries[0];
        clearInterval(defaultSelector);
      }
    }, 20);

    this.pathEntries.forEach(el => {
      if (el.file.isFile)
        el.tagState.loadTags()
    })
    this.filesService.searchInFolders();
  }

  set selectedEntry(value: InterfaceEntry) {
    this.filesService.selectedEntry = value;
  }

  selectEntry(entry: InterfaceEntry) {
    console.log("click" + entry.file.fileName);
    this.selectedEntry = entry;
  }

  get selectedEntry() {
    return this.filesService.selectedEntry;
  }


  get pathEntries(): InterfaceEntry[] {
    return this.filesService.pathEntries;
  }

  get filesLoaded() {
    return this.pathEntries.filter(el => el.tagState.tagsLoaded);
  }

  get filesEdited() {
    return this.pathEntries.filter(el => el.tagState.isEdited())
  }

  allFilesLoaded() {
    return this.pathEntries.every(el => el.tagState.tagsLoaded)
  }
}
