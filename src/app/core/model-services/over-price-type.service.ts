import {Injectable} from '@angular/core';
import {AvailableFiltersEntity, ResultsEntity, ValuesEntity2} from '../interfaces/imeli-search';
import {CasaModelService} from './casa-model.service';
import {UserDataModelService} from './user-data-model.service';
import {PriceTypeModelService} from './price-type-model.service';
import {FavouritesModelServiceService} from './favourites-model-service.service';
import {MeliModelService} from './meli-model.service';
import {BehaviorSubject} from 'rxjs';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';

@Injectable({
  providedIn: 'root'
})
export class OverPriceTypeService {


  /******** FALTA AQUI ********/
  priceType: AvailableFiltersEntity = {
    name: 'Tipo de precio', id: 'price_type', type: 'string',
    values: [{name: 'Estandar', id: 'standar', display_currency: ''},
      {name: 'Peso oficial', id: 'peso', display_currency: '$'},
      {name: 'Peso blue', id: 'peso_blue', display_currency: '$ B'},
      {name: 'Dolar oficial', id: 'dollar', display_currency: 'U$D'},
      {name: 'Dolar blue', id: 'dollar_blue', display_currency: 'U$D B'},
      {name: 'Tiempo de mis ingresos blue', id: 'income_time', display_currency: 'M.I.'},
      {name: 'Tiempo capacidad de ahorro b.', id: 'saving_capacity_time', display_currency: 'M.A.'}]
  };

  priceType$: BehaviorSubject<AvailableFiltersEntity> = new BehaviorSubject<AvailableFiltersEntity>(this.priceType);

  constructor(private casaModelService: CasaModelService,
              private userDataModelService: UserDataModelService,
              private priceTypeModelService: PriceTypeModelService,
              private favouritesModelService: FavouritesModelServiceService,
              private meliModelService: MeliModelService) {
  }


  setPriceType(item: ValuesEntity2): void {
    this.clearTimeRequired();

    this.priceTypeModelService.priceType$.next(item);
    if (this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem?.length > 0) {
      this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem.forEach((x) => {
        console.log("me ejecute 2");
        x.body.priceAndType = this.priceTypeModelService.buildPriceType(x.body?.price, x.body?.currency_id);
        /*if (x.body?.priceAndType?.completedPriceTime) {
          x.body.timeRequired = this.getTimeRequired(x.body?.priceAndType?.completedPriceTime.toString());
        }*/
      });
    }
    if (this.meliModelService.searchMeliData$.value?.results?.length > 0) {
      this.meliModelService.searchMeliData$.value?.results.forEach((x) => {
        const price = this.getCurrentPrice(x);
        console.log("me ejecute 3");
        //console.log(x);
        x.priceAndType = this.priceTypeModelService.buildPriceType(price, x.currency_id);
        /*if (x.priceAndType?.completedPriceTime) {
          x.timeRequired = this.getTimeRequired(x.priceAndType?.completedPriceTime.toString());
        }*/
      });
    }
  }

  clearTimeRequired(): void {
    this.meliModelService.searchMeliData$.value?.results.forEach(x => {
      x.timeRequired = null;
    });
    this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem?.forEach((x) => {
      x.body.timeRequired = null;
    });
  }

  setPriceTypeMouseOver(currentPrince: string, id: string): void {
    if (this.priceTypeModelService.priceType$.value.id === 'income_time' || this.priceTypeModelService.priceType$.value.id === 'saving_capacity_time') {
      const auxItem = this.meliModelService.searchMeliData$.value?.results.find((x => x.id === id));
      /*if (auxItem && !auxItem.timeRequired) {*/
      if (auxItem) {
        auxItem.timeRequired = this.getTimeRequired(currentPrince);
      }
      const auxFavItem = this.favouritesModelService.favouritesMeliData$.value?.meliFavouriteItem?.find((x => x.body.id === id));
      /*if (auxItem && !auxItem.timeRequired) {*/
      if (auxFavItem) {
        auxFavItem.body.timeRequired = this.getTimeRequired(currentPrince);
      }
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

  /*************** AQUI TO DO *********************/

  /*
    getTimeRequired(currentPrince: string): string {
      var result = '';
      var years = 0;
      var months = 0;
      var auxMonths = 0;
      var weeks = 0;
      var auxWeeks = 0;
      var days = 0;
      var auxDays = 0;

      let auxNumber = currentPrince.replace('.', '');
      auxNumber = auxNumber.replace(',', '.');

      const auxCurrentPrice = parseFloat(auxNumber);
      if (auxCurrentPrice / 12 >= 1) {
        years = Math.floor(auxCurrentPrice / 12);
        result += years;
        result += auxCurrentPrice / 12 ? ' años ' : 'año ';
      }

      months = (auxCurrentPrice - (years * 12));

      if (months >= 1) {
        auxMonths = Math.floor(months);
        result += auxMonths;
        result += auxMonths > 1 ? ' meses ' : ' mes ';
      }

      weeks = months - auxMonths;

      if (weeks >= 0.25) {
        auxWeeks = Math.floor(weeks * 4);
        result += auxWeeks;
        result += auxWeeks > 1 ? ' semanas ' : ' semana ';
      }

      //days = weeks - auxWeeks;
      if (weeks >= (0.25 / 7)) {
        let dias = Math.floor(((weeks * 28) + 1) % 7);
        if (dias === 0) {
          dias = 6;
        }
        result += dias;
        result += dias > 1 ? ' dias ' : ' dia ';
      }
      /!*console.log(rest);
      if (rest % 7 > 0) {
        weeks = `${rest % 7}`;
        result += weeks;
        result += rest % 7 ? ' meses ' : 'mes ';
      }*!/
      return result;
    }
  */

  getTimeRequired(currentPrince: string): string {
    const daysInWeek = 7;
    const daysInMonths = 30.436875;
    const daysInYear = 365.2425;
    let result = '';
    let year, months, week, days, hour;

    let numberOfDaysString = currentPrince.replace('.', '');
    numberOfDaysString = numberOfDaysString.replace(',', '.');

    const numberOfDays = parseFloat(numberOfDaysString) * daysInMonths;
    year = Math.floor(numberOfDays / daysInYear);
    months = Math.floor((numberOfDays % daysInYear) / daysInMonths);
    week = Math.floor((numberOfDays % daysInMonths) / daysInWeek);
    days = Math.floor(((numberOfDays % daysInYear) % daysInMonths) % daysInWeek);
    hour = Math.floor((numberOfDays - Math.floor(numberOfDays)) * 24);

    result += this.auxStringBuild('Año', year);
    result += this.auxStringBuild('Mes' , months);
    result += this.auxStringBuild('Semana', week);
    result += this.auxStringBuild('Día', days);
    result += this.auxStringBuild('Hora', hour);

    return result;
  }

  auxStringBuild(title: string, intTime: number): string {
    if (intTime > 0) {
      if (intTime > 1) {
        return '  ' + title + (title === 'Mes' ? 'es:' : 's:' ) + intTime + '\n';
      } else {
        return '  ' + title + ':' + intTime  + '\n';
      }
    } else {
      return '';
    }
  }

}
