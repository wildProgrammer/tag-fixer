import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry, ID3Tags } from '../../PathEntry';
import { validateConfig } from '@angular/router/src/config';
import { ValueTransformer } from '@angular/compiler/src/util';
import {getAlias, TagAlias} from '../../supported-aliases'
import { UpperfirstPipe } from '../../pipes/upperfirst.pipe'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { readFile, readFileSync } from 'fs';
import {supportedAliases, supportedAliasesNames} from "../../supported-aliases"
@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit, OnDestroy{

  @ViewChild("tagoptions")
  tagOptions: ElementRef

  @Input()
  entry: PathEntry;

  private _tagNamesWithTypes: TagAlias[] = null;

  private _availableTags:String[] = supportedAliasesNames.slice(0);
  
  selectedImage: {
    path: string,
    mimeType: string
  } = null;
  
  decodedImg = null;
  
  newTagName: string;
  
  get tags(): ID3Tags{
    return this.entry.tags
  }
  
  constructor(private filesService: FilesListService) {
  }  

  ngOnInit() {
    this._tagNamesWithTypes = null;
    this._availableTags = supportedAliasesNames.slice(0);
  }

  get tagNamesTypes(): any[]{
    if(this._tagNamesWithTypes === null){
      var names = Object.keys(this.entry.tags);
    
      names = names.filter(el => {
        return el !="raw" && el != "comment"
      })
    
      var namesWithTypes = names.map(getAlias)
                                .sort((a, b)=> Number(a.name > b.name));
      this._tagNamesWithTypes = namesWithTypes;

      this.removeOptionsThatArePresent();

    }
    return this._tagNamesWithTypes;
  }

  private removeOptionsThatArePresent(){
    this._tagNamesWithTypes.forEach(el => {
      var index = this._availableTags.indexOf(el.name);
      if (index != -1)
        this._availableTags.splice(index, 1);
    })
  }

  removeTag(tagName: string){
    delete this.tags[tagName];
    var pos = this._tagNamesWithTypes.findIndex(val => val.name == tagName);
    if(pos !== -1){
      this._availableTags.push(this._tagNamesWithTypes[pos].name);
      this._tagNamesWithTypes.splice(pos, 1)
    }
  }

  get image(){
    //TODO: var data = getMyvalue(this, ["tags", "image", "imageBuffer", "data"])
    if(this.selectedImage){
      return "file://" + this.selectedImage.path
    }
    else if(this.decodedImg === null)
      this.decodedImg = this.decode(this.tags.image);
    return this.decodedImg;
  }

  decode(img) {
    let imgBuffer = img.imageBuffer
    var mime = img.mime;
    var a = new Uint8Array(imgBuffer.data);
    var nb = a.length;
    if (nb < 4)
      return null;
    var binary = "";
      for(var i=0; i< a.length; i++){
        binary += String.fromCharCode(a[i]);
    }
    var base64 = window.btoa(binary)
    // console.log(mime)
    // console.log(imgBuffer.data.length)
    return `data:image/${mime};base64,${base64}`; 
  }

  changeImage(event){
    if(event.srcElement.files.length===0) return;
    var img = event.srcElement.files[0];
    console.log(img.path);
    this.selectedImage = {
      path: img.path,
      mimeType: img.type
    }
    this.tags.image.mime = this.selectedImage.mimeType;
    this.tags.image.imageBuffer = readFileSync(this.selectedImage.path)
  }

  showTagOptions(){
    console.log(this.tagOptions.nativeElement);
    this.showDropdown(this.tagOptions.nativeElement)
  }
  
  showDropdown(element) {
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    var worked = element.dispatchEvent(event);
    console.log("show tag options!")
  };

  addTag(){
    var alias = getAlias(this.newTagName);
    console.log("add tag" + this.newTagName)
    this._tagNamesWithTypes.push(alias);
  }

  get availableTags(){
    return this._availableTags;
  }

  ngOnDestroy(){
    // this.selectedImage = null;
  }
}
