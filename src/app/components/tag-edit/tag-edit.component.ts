import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
import { PathEntry, ID3Tags } from '../song-modules/PathEntry';
import { validateConfig } from '@angular/router/src/config';
import { ValueTransformer } from '@angular/compiler/src/util';
import {getAlias, TagAlias, aliasesPrototypes} from '../../supported-aliases'
import { TagFormatPipe } from '../../pipes/tagformat.pipe'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { readFile, readFileSync } from 'fs';
import {supportedAliases, supportedAliasesNames} from "../../supported-aliases"
import { InterfaceEntry } from '../song-modules/interface-entry';
@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit, OnDestroy{

  @ViewChild("tagoptions")
  tagOptions: ElementRef

  @Input()
  set entry(val: InterfaceEntry){
    this._entry = val;
    this.ngOnInit();
  }

  get entry(){
    return this._entry 
  }

  _entry: InterfaceEntry;


  private _tagNamesWithTypes: TagAlias[] = null;

  private _availableTags:String[] = supportedAliasesNames.slice(0);
  
  get selectedImage(){
    return this.entry.editState.selectedImage;
  }

  set selectedImage(value){
    this.entry.editState.selectedImage = value;
  }

  get decodedImg(){
    return this.entry.editState.decodedImg
  }

  set decodedImg(val: string){
    
    this.entry.editState.decodedImg = val;
  }

  get newTagName(){
    return this.entry.editState.newTagName;
  }

  set newTagName(value){
    console.log("newTagName set "+value)
    this.entry.editState.newTagName=value;
  }
  

  
  get tags(): ID3Tags{
    return this.entry.tagState.tags
  }
  
  constructor(private filesService: FilesListService) {}  

  ngOnInit() {
    console.log("ngInit")
    this._availableTags = supportedAliasesNames.slice(0);
    this.initTagNamesTypes();
  }

  selectTagName(name){
    this.newTagName = name;
  }

  initTagNamesTypes(){
    var names = Object.keys(this.entry.tagState.tags);

    names = names.filter(el => {
      return el != "raw" && el != "comment"
    })

    var namesWithTypes = names.map(getAlias)
      .sort((a, b) => Number(a.name > b.name));
    this._tagNamesWithTypes = namesWithTypes;

    this.removeOptionsThatArePresent();
  }

  get tagNamesTypes(){

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
    try{
      if(this.selectedImage){
        return "file://" + this.selectedImage.path
      }
      else if(this.decodedImg === null)
        this.decodedImg = this.decode(this.tags.image);
      }
    catch(err){
      return ""
    }
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
    this.tags.image.imageBuffer = readFileSync(this.selectedImage.path as string)
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
    var pos = this.availableTags.indexOf(this.newTagName);
    console.log("add tag" + this.newTagName)
    console.log(this.availableTags)
    console.log(pos)
    if(pos === -1){
      alert("Selected tag isn't available")
      return
    }
    this.availableTags.splice(pos, 1);
    var alias = getAlias(this.newTagName);
    this.insertTag(alias);
    if(this.availableTags.length > 0)
      this.newTagName = this.availableTags[0]
  }

  insertTag(alias: TagAlias){
    console.log(aliasesPrototypes[alias.type as string]())
    this.entry.tagState.tags[alias.name as string] = aliasesPrototypes[alias.type as string]();
    for(var i=0; i<this.tagNamesTypes.length; i++)
      if(this.tagNamesTypes[i].name > alias.name) break;
    this.tagNamesTypes.splice(i, 0, alias)
  }

  get availableTags(){
    return this._availableTags;
  }

  ngOnDestroy(){
    // this._tagNamesWithTypes = null;
  }
}
