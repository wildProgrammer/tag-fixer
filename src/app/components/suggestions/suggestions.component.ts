import { Component, OnInit } from '@angular/core';
import { FilesListService } from '../../files-list.service'
import { ActivatedRoute } from '@angular/router';
import { ID3TagManager } from '../../ID3TagManager';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  position: number;

  constructor(private filesService: FilesListService
    , private route: ActivatedRoute) {
    this.position = route.snapshot.params['id'];
  }  

  ngOnInit() {
  }

}
