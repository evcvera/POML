import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {FavouritesModelService} from '../../core/model-services/favourites-model.service';
import {CasaModelService} from '../../core/model-services/casa-model.service';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {Subscription} from 'rxjs';
import {PriceTypeModelService} from '../../core/model-services/price-type-model.service';
import {IPriceAndType} from '../../core/interfaces/iprice-and-type';
import {OverPriceTypeService} from '../../core/model-services/over-price-type.service';

@Component({
  selector: 'app-sales-favourites',
  templateUrl: './sales-favourites.component.html',
  styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit, OnDestroy {

  sumTimeBlue = '';
  sumTimeIncome = '';
  sumTimeSavingCapacity = '';
  sub: Subscription;


  constructor(public meliModelService: MeliModelService,
              public favouritesModelService: FavouritesModelService,
              public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService,
              public priceTypeModelService: PriceTypeModelService,
              private overPriceTypeService: OverPriceTypeService) {
  }

  ngOnInit(): void {
    const favouritesItems = this.favouritesModelService.favouritesMeliItems$.value;
    const favouritesDataIds = this.favouritesModelService.favouritesMeliData$.value.ids;

    const difference = favouritesItems?.filter(x => !favouritesDataIds?.includes(x))
      .concat(favouritesDataIds?.filter(x => !favouritesItems.includes(x)));

    if (difference?.length > 0) {
      this.favouritesModelService.meliSearchFavourites();
    }

    this.totalSumValues();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  totalSumValues(): void {
    this.sub = this.favouritesModelService.favouritesMeliData$.subscribe(x => {
      if (x.totalSum && x.totalSum !== 0) {
        const sumDollarBlue = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'dollar_blue');
        const sumIncomeTime = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'income_time');
        const sumSavingCapacityTime = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'saving_capacity_time');

        this.sumTimeBlue = 'Dolares blue:\n' + sumDollarBlue.price +' U$D';
        this.sumTimeIncome = 'Ingresos mensual:\n' + this.overPriceTypeService.getTimeRequired(sumIncomeTime.price);
        this.sumTimeSavingCapacity = 'Capacidad de ahorro mensual:\n' + this.overPriceTypeService.getTimeRequired(sumSavingCapacityTime.price);
      }
    });
  }
}
