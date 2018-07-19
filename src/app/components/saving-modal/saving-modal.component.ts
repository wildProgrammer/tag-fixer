import { Component, OnInit, Input } from '@angular/core';
import { FilesListService } from '../../files-list.service';
import { PathEntry } from '../song-modules/PathEntry';
import { SaveState } from '../../save-state';

@Component({
  selector: 'app-saving-modal',
  templateUrl: './saving-modal.component.html',
  styleUrls: ['./saving-modal.component.scss']
})
export class SavingModalComponent implements OnInit {

  
  @Input()
  state: SaveState;
  
  constructor() { }
  ngOnInit() {
  }
  
 

}
