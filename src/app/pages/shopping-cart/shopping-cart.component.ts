import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
