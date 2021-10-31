import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {ResultsEntity} from '../../core/interfaces/imeli-search';
import {Subscription} from 'rxjs';
import {FavouritesModelServiceService} from '../../core/mode-services/favourites-model-service.service';
import {PriceTypeModelService} from '../../core/mode-services/price-type-model.service';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.scss']
})
export class SalesItemComponent implements OnInit {

  @Input() isClassified: boolean;
  @Input() resultsEntity: ResultsEntity;
  @Input() typeItem: string;
  @Input() opinions: boolean;

  remainingDays: number;
  promoPercent: string;
  dealOfTheDay: boolean;
  sellerName: string;
  typeOfCurrency: string;
  currentPrice: string;
  remainingPromoDays: string;

  getRating: Subscription;

  currentDate: Date;


  constructor(public meliModelService: MeliModelService,
              public favouritesModelServiceService: FavouritesModelServiceService,
              public priceTypeModelService: PriceTypeModelService) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.remainingDays = this.getRemainingDays();
    this.promoPercent = this.getPromoPercent();
    this.dealOfTheDay = this.getDealOfTheDay();
    this.sellerName = this.getSellerName();
    this.typeOfCurrency = this.getTypeOfCurrency();
    this.currentPrice = this.getCurrentPrice();
    this.remainingPromoDays = this.getRemainingPromoDays();
  }

  imgLoaded(): any {
    if (this.resultsEntity.rating_average === undefined && this.opinions) {
      this.resultsEntity.rating_average = 0;
      this.meliModelService.getSingleMeliItemOpinion(this.resultsEntity.id, this.typeItem);
    }
  }

  getRemainingDays(): number {
    if (this.resultsEntity.prices !== undefined && this.resultsEntity?.prices !== null && this.resultsEntity?.prices.prices !== null
      && this.resultsEntity?.prices?.prices !== undefined
      && this.resultsEntity?.prices?.prices[this.resultsEntity?.prices?.prices?.length - 1].metadata?.campaign_end_date) {
      const to = new Date(this.resultsEntity.prices.prices[this.resultsEntity.prices.prices.length - 1].metadata.campaign_end_date);
      const from = new Date();
      const diff = to.getTime() - from.getTime();
      const diffDays = diff / (1000 * 3600 * 24);
      if (diffDays >= 0) {
        return diffDays !== undefined ? diffDays : -1;
      } else {
        return -1;
      }
    }
    return -1;
  }

  getPromoPercent(): string {
    if (this.resultsEntity.prices?.prices?.length) {
      if (this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1] &&
        this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1].regular_amount !== null &&
        this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1].amount !== null) {
        const regularAmount = this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1].regular_amount !== null ? this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1].regular_amount : 1;
        const percent = (this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1].amount / regularAmount - 1) * (-100);
        return percent.toFixed(0) + '% OFF';
      }
    }
    return '';
  }

  getDealOfTheDay(): boolean {
    if (this.resultsEntity.tags) {
      const aux = this.resultsEntity.tags.find(x => x === 'deal_of_the_day');
      return aux !== undefined;
    }
    if (this.resultsEntity.prices.prices) {
      const aux = this.resultsEntity.prices.prices.find(x => x.metadata.promotion_type === 'deal_of_the_day');
      return aux !== undefined;
    }
    return false;
  }

  getSellerName(): string {
    if (this.resultsEntity.seller?.eshop &&
      this.resultsEntity.seller.eshop.nick_name) {
      return this.resultsEntity.seller.eshop.nick_name.replace('_', ' ');
    }
    if (this.resultsEntity.seller?.permalink === 'http://perfil.mercadolibre.com.ar/MERCADOLIBRE+ELECTRONICA_AR' &&
      this.resultsEntity.attributes[0].values) {
      return this.resultsEntity.attributes[0].values[0].name;
    }
    return '';
  }

  getTypeOfCurrency(): string {
    if (this.resultsEntity.currency_id) {
      return (this.resultsEntity.currency_id === 'USD' ? 'U$D ' : '$ ');
    } else {
      return '';
    }
  }

  getCurrentPrice(): string {
    if (this.resultsEntity.prices?.prices?.length) {
      if (this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1]?.amount) {
        return this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1]?.amount?.toFixed(0);
      }
    }
    if (this.resultsEntity.price) {
      return this.resultsEntity.price.toFixed(0);
    }
    return '';
  }

  /*  getCurrentPrice(): string {
      if (this.resultsEntity.prices?.prices?.length) {
        /!*if (this.resultsEntity.prices?.reference_prices[0]?.amount) {
          return this.resultsEntity.prices?.reference_prices[0]?.amount.toFixed(0);
        }*!/
        /!*if (this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1]?.amount) {
          return this.resultsEntity.prices?.prices[this.resultsEntity.prices?.prices?.length - 1]?.amount?.toFixed(0);
        }*!/
        this.resultsEntity.prices?.prices?.forEach(x => {
          if (x.conditions?.start_time && x.conditions?.end_time) {
            const startTime = new Date(x.conditions?.start_time);
            const endTime = new Date(x.conditions?.end_time);
            if (this.currentDate > startTime && this.currentDate < endTime) {
              if (x.conditions?.context_restrictions) {
                if (x.conditions.context_restrictions.findIndex(y => y === 'channel_marketplace') === -1) {
                }
              }
            }
          }
        });
      }
      if (this.resultsEntity.price) {
        return this.resultsEntity.price.toFixed(0);
      }
      return '';
    }*/

  getRemainingPromoDays(): string {
    if (this.resultsEntity.prices?.prices?.length &&
      this.resultsEntity.prices?.prices[this.resultsEntity.prices.prices.length - 1]?.metadata.campaign_discount_percentage) {
      return this.resultsEntity.prices?.prices[this.resultsEntity.prices.prices.length - 1]?.metadata.campaign_discount_percentage.toFixed(0);
    }
    return '';
  }


  activeFavorites(id: string): void {
    this.resultsEntity.isFavourite = !this.resultsEntity.isFavourite;

    if (this.meliModelService.searchMeliData$.value) {
      const searchIndex = this.meliModelService.searchMeliData$.value.results.findIndex(x => x.id === id);
      if (searchIndex > -1) {
        this.meliModelService.searchMeliData$.value.results[searchIndex].isFavourite = this.resultsEntity.isFavourite;
      }
    }

    if (!this.resultsEntity.isFavourite) {
      const favouriteIndex = this.favouritesModelServiceService.favouritesMeliData$.value
        .meliFavouriteItem?.findIndex(x => x.body.id === id);
      if (favouriteIndex > -1) {
        this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.splice(favouriteIndex, 1);
        this.favouritesModelServiceService.favouritesMeliData$.value.ids
          .splice(this.favouritesModelServiceService.favouritesMeliData$.value.ids.indexOf(id), 1);
      }
    }

    this.favouritesModelServiceService.upSertFavouriteItem(id, this.resultsEntity.isFavourite);
  }
}
