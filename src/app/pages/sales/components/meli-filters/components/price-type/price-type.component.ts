import {Component, Input, OnInit} from '@angular/core';
import {AvailableFiltersEntity, ResultsEntity, ValuesEntity2} from '../../../../../../core/interfaces/imeli-search';
import {PriceTypeModelService} from '../../../../../../core/mode-services/price-type-model.service';
import {MeliModelService} from '../../../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../../../core/mode-services/user-data-model.service';
import {FavouritesModelServiceService} from '../../../../../../core/mode-services/favourites-model-service.service';

@Component({
  selector: 'app-price-type',
  templateUrl: './price-type.component.html',
  styleUrls: ['./price-type.component.scss']
})
export class PriceTypeComponent implements OnInit {

  priceType: AvailableFiltersEntity = {
    name: 'Tipo de precio', id: 'price_type', type: 'string',
    values: [{name: 'Estandar', id: 'standar', display_currency: ''},
      {name: 'Peso oficial', id: 'peso', display_currency: '$'},
      {name: 'Peso blue', id: 'peso_blue', display_currency: '$ B'},
      {name: 'Dolar oficial', id: 'dollar', display_currency: 'U$D'},
      {name: 'Dolar blue', id: 'dollar_blue', display_currency: 'U$D B'},
      {name: 'Tiempo de mis ingresos b.', id: 'income_time', display_currency: 'T'},
      {name: 'Tiempo capacidad de ahorro b.', id: 'saving_capacity_time', display_currency: 'TC'}]
  };

  constructor(public priceTypeModelService: PriceTypeModelService,
              public meliModelService: MeliModelService,
              public favouritesModelService: FavouritesModelServiceService) {
  }

  ngOnInit(): void {
  }

  setPriceType(item: ValuesEntity2): void {
    this.priceTypeModelService.priceType$.next(item);
    if (this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem?.length > 0) {
      this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem.forEach((x) => {
        x.body.priceAndType = this.priceTypeModelService.buildPriceType(x.body.price, x.body.currency_id);
      });
    }
    if (this.meliModelService.searchMeliData$.value?.results?.length > 0) {
      this.meliModelService.searchMeliData$.value?.results.forEach((x) => {
        const price = this.getCurrentPrice(x);
        x.priceAndType = this.priceTypeModelService.buildPriceType(price, x.prices.presentation.display_currency);
      });
    }
  }

  getCurrentPrice(x: ResultsEntity): number {
    if (x.prices?.prices?.length) {
      if (x.prices?.prices[x.prices?.prices?.length - 1]?.amount) {
        return Number(x.prices?.prices[x.prices?.prices?.length - 1]?.amount?.toFixed(0));
      }
    }
    if (x.price) {
      return Number(x.price.toFixed(0));
    }
    return 0;
  }

}
