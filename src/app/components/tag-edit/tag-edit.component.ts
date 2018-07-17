import { Component, OnInit, Input } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry, ID3Tags } from '../../PathEntry';
import { validateConfig } from '@angular/router/src/config';
import { ValueTransformer } from '@angular/compiler/src/util';
import {getAlias, TagAlias} from '../../supported-aliases'
import { UpperfirstPipe } from '../../pipes/upperfirst.pipe'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {

  @Input()
  entry: PathEntry;
  private _tagNamesWithTypes: TagAlias[] = null;

  get tags(): ID3Tags{
    return this.entry.tags
  }
  constructor(private filesService: FilesListService) {
   }  

  ngOnInit() {
  }

  get tagNamesTypes(): any[]{
    if(this._tagNamesWithTypes === null){
      var names = Object.keys(this.entry.tags);
    
      names = names.filter(el => {
        return el !="raw" && el != "comment"
      })
    
      var namesWithTypes = names.map(getAlias);
      this._tagNamesWithTypes = namesWithTypes;
    }
    return this._tagNamesWithTypes;
  }

  removeTag(tagName: string){
    delete this.tags[tagName];
    var pos = this._tagNamesWithTypes.findIndex(val => val.name == tagName);
    if(pos !== -1)
      this._tagNamesWithTypes.splice(pos, 1);
  }

  get image(){
    //TODO: var data = getMyvalue(this, ["tags", "image", "imageBuffer", "data"])
    return this.decode(this.tags.image.imageBuffer);
  }

  decode(imgBuffer) {
    var mime = imgBuffer.mime;
    var a = new Uint8Array(imgBuffer.data);
    var nb = a.length;
    if (nb < 4)
      return null;
    // var b0 = a[0];
    // var b1 = a[1];
    // var b2 = a[2];
    // var b3 = a[3];
    // if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
    //   mime = 'image/png';
    // else if (b0 == 0xff && b1 == 0xd8)
    //   mime = 'image/jpeg';
    // else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
    //   mime = 'image/gif';
    // else
    //   return null;
    var binary = "";
    for (var i = 0; i < nb; i++)
      binary += String.fromCharCode(a[i]);
    var base64 = window.btoa(binary);
    var image = new Image();
    image.src = 'data:' + mime + ';base64,' + base64;
    return image;
  }
}
