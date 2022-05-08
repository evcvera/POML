import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {FavouritesModelServiceService} from '../../core/mode-services/favourites-model-service.service';
import {CasaModelService} from '../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Subscription} from 'rxjs';
import {PriceTypeModelService} from '../../core/mode-services/price-type-model.service';
import {IPriceAndType} from '../../core/interfaces/iprice-and-type';
import {OverPriceTypeService} from '../../core/mode-services/over-price-type.service';

@Component({
    selector: 'app-sales-favourites',
    templateUrl: './sales-favourites.component.html',
    styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit, OnDestroy {

    sumTimeBlue = '';
    sumTimeIncome = '';
    sumTimeSavingCapacity = '';

    constructor(public meliModelService: MeliModelService,
                public favouritesModelService: FavouritesModelServiceService,
                public casaModelService: CasaModelService,
                public userDataModelService: UserDataModelService,
                public priceTypeModelService: PriceTypeModelService,
                private overPriceTypeService: OverPriceTypeService) {
    }

    ngOnInit(): void {
        const difference = this.favouritesModelService.favouritesMeliItems$.value?.filter(x => !this.favouritesModelService.favouritesMeliData$.value.ids?.includes(x))
            .concat(this.favouritesModelService.favouritesMeliData$.value.ids?.filter(x => !this.favouritesModelService.favouritesMeliItems$.value.includes(x)));
        if (difference.length > 0) {
            this.favouritesModelService.meliSearchFavourites();
        }
    }

    /* ngOnInit(): void {
       if (this.favouritesModelServiceService.favouritesMeliItems$.value !== []
         && this.favouritesModelServiceService.favouritesMeliItems$.value.length > 0) {
         try {
           this.favouritesModelServiceService.favouritesMeliItems$.value.forEach(x => {
             if (this.favouritesModelServiceService.favouritesMeliData$.value !== {}) {
               if (!this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.some(y => y.body.id === x)) {
                 throw true;
               }
             }
           });
         } catch (e) {
           this.favouritesModelServiceService.meliSearchFavourites();
         }
       } else {
         this.favouritesModelServiceService.meliSearchFavourites();
       }
     }*/

    totalSumValues(): string {
        let sumDollarBlue: IPriceAndType = {};
        let sumIncomeTime: IPriceAndType = {};
        let sumSavingCapacityTime: IPriceAndType = {};
        this.favouritesModelService.favouritesMeliData$.subscribe(x => {
            if (x.totalSum && x.totalSum !== 0) {
                sumDollarBlue = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'dollar_blue');
                sumIncomeTime = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'income_time');
                sumSavingCapacityTime = this.priceTypeModelService.buildTotalPriceType(x.totalSum, 'ARS', 'saving_capacity_time');


                this.sumTimeBlue = '-----------------' + 'DOLARES' +  `\n` + sumDollarBlue.price + '-----------------' + ' ';

                this.sumTimeIncome  =  '-----------------' + 'INGRESOS MENSUALES' + `\n` + this.overPriceTypeService.getTimeRequired(sumIncomeTime.price)  + '-----------------' + ' ';

                this.sumTimeSavingCapacity  = '-----------------' + 'CAPACIDAD DE AHORRO MENSUAL' + `\n` + this.overPriceTypeService.getTimeRequired(sumSavingCapacityTime.price) + '-----------------';
            }
        });

        return '';
    }

    ngOnDestroy(): void {
    }
}
