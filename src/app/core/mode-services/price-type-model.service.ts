import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ValuesEntity2} from '../interfaces/imeli-search';
import {IPriceAndType} from '../interfaces/iprice-and-type';
import {CasaModelService} from './casa-model.service';
import {MeliModelService} from './meli-model.service';
import {UserDataModelService} from './user-data-model.service';

@Injectable({
  providedIn: 'root'
})
export class PriceTypeModelService {

  priceType$: BehaviorSubject<ValuesEntity2> = new BehaviorSubject<ValuesEntity2>({name: 'Estandar', id: 'standar'});

  constructor(private casaModelService: CasaModelService,
              private userDataModelService: UserDataModelService) {
  }


  buildPriceType(price: number, type: string): IPriceAndType {
    /*console.log(this.priceType$.value.id);
    console.log(price);
    console.log(type);*/
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
      case 'income_time': {
        let auxSalaryDollar = 1;
        const userData = this.userDataModelService.userData$.value;
        if (this.userDataModelService.userData$.value && userData.isDollar) {
          auxSalaryDollar = userData.isDepenRelationship ? userData.salary * (13 / 12) : userData.salary;
        }
        if (this.userDataModelService.userData$.value && !userData.isDollar) {
          auxSalaryDollar = userData.isDepenRelationship ? userData.salary * (13 / 12) / currentDollar.blueProm : userData.salary / currentDollar.blueProm;
        }
        if (type === 'ARS') {
          priceAndType.price = this.transform(((price / currentDollar.blueProm) / auxSalaryDollar).toFixed(3));
        } else {
          priceAndType.price = this.transform(((price) / auxSalaryDollar).toFixed(3));
        }
        break;
      }
      case 'saving_capacity_time': {
        let auxSalaryDollar = 1;
        const userData = this.userDataModelService.userData$.value;
        if (this.userDataModelService.userData$.value && userData.isDollar) {
          if (userData.isPercent) {
            auxSalaryDollar = userData.isDepenRelationship ? userData.salary * (13 / 12) * (100 / userData.savingCapacity) : userData.salary * (100 / userData.savingCapacity);
          } else {
            auxSalaryDollar = userData.isDepenRelationship ? userData.savingCapacity * (13 / 12) : userData.savingCapacity;
          }
        }
        if (this.userDataModelService.userData$.value && !userData.isDollar) {
          if (userData.isPercent) {
            auxSalaryDollar = userData.isDepenRelationship ? userData.salary * (13 / 12) / currentDollar.blueProm * (100 / userData.savingCapacity) : userData.salary / currentDollar.blueProm * (100 / userData.savingCapacity);
          } else {
            auxSalaryDollar = userData.isDepenRelationship ? userData.savingCapacity * (13 / 12) / currentDollar.blueProm : userData.savingCapacity / currentDollar.blueProm;
          }
        }
        if (type === 'ARS') {
          priceAndType.price = this.transform(((price / currentDollar.blueProm) / auxSalaryDollar).toFixed(3));
        } else {
          priceAndType.price = this.transform(((price) / auxSalaryDollar).toFixed(3));
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
