import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { PathEntry } from '../../PathEntry';
import { FilesListService } from '../../files-list.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [FilesListService]
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
  }

  openFile(){
    this.openFileInput.nativeElement.click();
  }
  
  openFolder() {
    this.openDirectoryInput.nativeElement.click();
  }

  private addPaths(addedPaths : [any], isFile: boolean){
    Array.from(addedPaths).forEach(el => {
      this.pathsService.addEntry(new PathEntry(el.path, isFile));
    });
  }

  changeFiles(){
    this.addPaths(this.openFileInput.nativeElement.files, true);
    console.log(this.pathsService.pathEntries)
  }

  changeFolders(){
    this.addPaths(this.openDirectoryInput.nativeElement.files, false);
    console.log(this.pathsService.pathEntries)
  }

  

  
}
