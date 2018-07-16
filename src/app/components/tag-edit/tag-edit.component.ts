import { Component, OnInit, Input } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry } from '../../PathEntry';
import { validateConfig } from '@angular/router/src/config';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {

  @Input()
  entry: PathEntry;

  private _tagNames: String[] = null;

  get tags(): any{
    return this.entry.tags
  }
  constructor(private filesService: FilesListService) {
   }  

  ngOnInit() {
  }

  get tagNames(): any[]{
    if(this._tagNames === null){
    var names = Object.keys(this.entry.tags);
    names = names.filter(el => el !="raw" && el != "comment")
    names.forEach((value, index, arr) => {
      arr[index] = value.substring(0,1) + value.substring(1);
    });
    this._tagNames = names;
  }
    return this._tagNames;
  }

  removeTag(tagName: string){
    delete this.tags[tagName];
    this.tagNames.splice(this.tagNames.indexOf(tagName), 1);
  }
}
