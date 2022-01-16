import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-sale-item-desk',
  templateUrl: './sale-item-desk.component.html',
  styleUrls: ['./sale-item-desk.component.scss']
})
export class SaleItemDeskComponent implements OnInit {

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
