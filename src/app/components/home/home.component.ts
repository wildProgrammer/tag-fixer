import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  paths: any[] = [];
  @ViewChild('filePicker')
  openFileInput : ElementRef;
  @ViewChild('folderPicker')
  openDirectoryInput : ElementRef;
  constructor() { }

  ngOnInit() {
  }

  openFile(){
    this.openFileInput.nativeElement.click();
  }
  
  openFolder() {
    this.openDirectoryInput.nativeElement.click();
  }

  changeFiles(){
    this.paths = this.openFileInput.nativeElement.files;

    console.log(this.paths)
  }

  changeFolders(){
    this.paths = this.openDirectoryInput.nativeElement.files;

    console.log(this.paths)
  }
}
