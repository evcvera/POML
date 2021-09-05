import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.scss']
})
export class SalesItemComponent implements OnInit {

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
