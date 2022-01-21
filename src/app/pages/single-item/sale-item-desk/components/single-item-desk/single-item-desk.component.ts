import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMeliSingleItem} from '../../../../../core/interfaces/imeli-single-item';

@Component({
  selector: 'app-single-item-desk',
  templateUrl: './single-item-desk.component.html',
  styleUrls: ['./single-item-desk.component.scss']
})
export class SingleItemDeskComponent implements OnInit {

  @Input() iMeliSingleItem: IMeliSingleItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
