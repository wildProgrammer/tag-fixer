import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { PathEntry } from '../../PathEntry';
import { FilesListService } from '../../files-list.service'
import { hasValidExtension } from '../../file-utility'
const fs = require("fs");
const app = require('electron').remote.app;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  @ViewChild('filePicker')
  openFileInput : ElementRef;
  @ViewChild('folderPicker')
  openDirectoryInput : ElementRef;

  get filesSelected() : boolean{
    return this.pathsService.length != 0;
  }

  constructor(private pathsService: FilesListService) { }

  ngOnInit() {
    // console.log=function(){};
    console.log(__dirname);

  }

  openFile(){
    this.openFileInput.nativeElement.click();
    console.log("open file click")
  }
  
  openFolder() {
    this.openDirectoryInput.nativeElement.click();
  }

  private addPaths(addedPaths : any[], isFile: boolean){
    Array.from(addedPaths).forEach(el => {
      this.pathsService.addEntry(new PathEntry(el.path, isFile));
    });
  }

  changeFiles(){
    let files:any[] = Array.from(this.openFileInput.nativeElement.files)
                      .filter((el:any) => hasValidExtension(el.path));
    this.addPaths(files, true);
    console.log(this.pathsService.pathEntries)
    this.openFileInput.nativeElement.value="";
  }

  changeFolders(){
    this.addPaths(this.openDirectoryInput.nativeElement.files, false);
    console.log(this.pathsService.pathEntries)
    this.openDirectoryInput.nativeElement.value="";
  }

}
