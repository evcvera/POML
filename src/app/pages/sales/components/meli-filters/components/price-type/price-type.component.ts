import {Component, OnInit} from '@angular/core';
import {AvailableFiltersEntity} from '../../../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-price-type',
  templateUrl: './price-type.component.html',
  styleUrls: ['./price-type.component.scss']
})
export class PriceTypeComponent implements OnInit {

  priceType: AvailableFiltersEntity = {
    name: 'Tipo de precio', id: 'price_type', type: 'string',
    values: [{name: 'Estandar', id: 'standar'},
      {name: 'Peso', id: 'peso'},
      {name: 'Dolar oficial', id: 'dollar'},
      {name: 'Dolar blue', id: 'dollar_blue'},
      {name: 'Tiempo capacidad de ahorro', id: 'saving_capacity'},
      {name: 'Tiempo de mis ingresos', id: 'income'},
      {name: 'Porcentaje ahorro', id: 'saving_capacity_percent'}]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
