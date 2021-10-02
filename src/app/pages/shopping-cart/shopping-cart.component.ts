import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {CartModelService} from '../../core/mode-services/cart-model.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  constructor(public cartModelService: CartModelService,
              public meliModelService: MeliModelService) { }

  ngOnInit(): void {
    this.cartModelService.meliSearchCartData();
  }

  ngOnDestroy(): void {
    this.cartModelService.cartMeliData$.next({});
  }

}
