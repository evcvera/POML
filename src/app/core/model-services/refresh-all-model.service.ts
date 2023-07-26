import { Injectable } from '@angular/core';
import {MeliModelService} from './meli-model.service';
import {FavouritesModelService} from './favourites-model.service';
import {PriceTypeModelService} from './price-type-model.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshAllModelService {

  constructor(private meliModelService: MeliModelService,
              private favouritesModelService: FavouritesModelService,
              private priceTypeModelService: PriceTypeModelService) { }

  refresh(): void{
    this.meliModelService.searchMeliData$.next(this.meliModelService.searchMeliData$.value);
    this.favouritesModelService.favouritesMeliData$.next(this.favouritesModelService.favouritesMeliData$.value);
    this.priceTypeModelService.priceType$.next({name: 'Estandar', id: 'standar'});
  }
}
