import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ValuesEntity2} from '../interfaces/imeli-search';
import {IPriceAndType} from '../interfaces/iprice-and-type';
import {CasaModelService} from './casa-model.service';

@Injectable({
  providedIn: 'root'
})
export class PriceTypeModelService {

  priceType$: BehaviorSubject<ValuesEntity2> = new BehaviorSubject<ValuesEntity2>({name: 'Estandar', id: 'standar'});

  constructor(private casaModelService: CasaModelService) {
  }



  buildPriceType(price: number, type: string): IPriceAndType {
    console.log(this.priceType$.value.id);
    console.log(price);
    console.log(type);
    const currentDollar = this.casaModelService.currentDollar$.value;
    const priceAndType: IPriceAndType = {price: this.transform(price.toString()), id: type};
    switch (this.priceType$.value.id) {
      case 'peso': {
        if (type === 'USD') {
          priceAndType.price = this.transform((currentDollar.oficialProm * price).toFixed(0));
        }
        break;
      }
      case 'peso_blue': {
        if (type === 'USD') {
          priceAndType.price = this.transform((currentDollar.blueProm * price).toFixed(0));
        }
        break;
      }
      case 'dollar': {
        if (type === 'ARS') {
          priceAndType.price = this.transform((price / currentDollar.oficialProm).toFixed(0));
        }
        break;
      }
      case 'dollar_blue': {
        if (type === 'ARS') {
          priceAndType.price = this.transform((price / currentDollar.blueProm).toFixed(0));
        }
        break;
      }
    }
    return priceAndType;
  }

  transform(value: any): string {
    if (value !== null && value !== undefined) {
      const aux = value.toString().replace('.', ',');
      return aux.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
      return null;
    }
  }

}
