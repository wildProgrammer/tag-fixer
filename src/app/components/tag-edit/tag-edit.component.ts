import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {

  position : number;
  tags : any;
  constructor(private filesService: FilesListService
            , private route: ActivatedRoute) {
        this.position = route.snapshot.params['id'];
   }  

  ngOnInit() {
    console.log("object list:" + this.position)
    console.log(this.filesService.pathEntries);
    let entry = this.filesService.getByIndex(Number(this.position));
    console.log(entry);
    let manager = new ID3TagManager(entry.path);
    this.tags = manager.tags;
    console.log(this.tags);
  }

}
