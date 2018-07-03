import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { PathEntry } from '../../PathEntry'

@Component({
  selector: 'app-file-list-preview',
  templateUrl: './file-list-preview.component.html',
  styleUrls: ['./file-list-preview.component.scss'],
})
export class FileListPreviewComponent implements OnInit {

  constructor(private pathsService: FilesListService) { }

  get pathEntries () { return this.pathsService.pathEntries; }

  ngOnInit() {
  }

  deleteEntry(entry: PathEntry){
    this.pathsService.removeEntry(entry);
  }

  deleteAll(){
    this.pathsService.removeAllEntries();
    console.log("Everything gets erased!")
  }

}
