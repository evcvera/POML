import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-sales-favourites',
  templateUrl: './sales-favourites.component.html',
  styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit {

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
