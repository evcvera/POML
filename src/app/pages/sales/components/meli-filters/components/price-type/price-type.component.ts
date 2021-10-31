import {Component, OnInit} from '@angular/core';
import {AvailableFiltersEntity, ResultsEntity, ValuesEntity2} from '../../../../../../core/interfaces/imeli-search';
import {PriceTypeModelService} from '../../../../../../core/mode-services/price-type-model.service';
import {MeliModelService} from '../../../../../../core/mode-services/meli-model.service';

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
      {name: 'Tiempo capacidad de ahorro', id: 'saving_capacity', display_currency: 'T'},
      {name: 'Tiempo de mis ingresos', id: 'income', display_currency: 'T'},
      {name: 'Porcentaje de ahorro', id: 'saving_capacity_percent', display_currency: '%'},
      {name: 'Porcentaje de ingresos', id: 'income_percent', display_currency: '%'}]
  };

  constructor(public priceTypeModelService: PriceTypeModelService,
              public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

  setPriceType(item: ValuesEntity2): void {
    this.priceTypeModelService.priceType$.next(item);
    this.meliModelService.searchMeliData$.value?.results.forEach((x) => {
      const price = this.getCurrentPrice(x);
      x.priceAndType = this.priceTypeModelService.buildPriceType(price, x.prices.presentation.display_currency);
    });
    console.log(this.meliModelService.searchMeliData$.value?.results);
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
