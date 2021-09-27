import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {ResultsEntity} from '../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.scss']
})
export class SalesItemComponent implements OnInit {

  private _resultsEntity: ResultsEntity;
  public activeHeart = false;
  currentRate = 3.26;

  @Input() isClassified: boolean;

  @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
    this._resultsEntity = value;
  }

  get resultsEntity(): ResultsEntity {
    return this._resultsEntity;
  }

  get remainingDays(): number {
    if (this.resultsEntity.prices.prices[this.resultsEntity.prices.prices.length - 1].metadata.campaign_end_date) {
      const to = new Date(this.resultsEntity.prices.prices[this.resultsEntity.prices.prices.length - 1].metadata.campaign_end_date);
      const from = new Date();
      const diff = to.getTime() - from.getTime();
      const diffDays = diff / (1000 * 3600 * 24);
      if (diffDays >= 0) {
        return diffDays;
      } else {
        return -1;
      }
    }
    return -1;
  }

  get promoPercent(): string {
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

  get dealOfTheDay(): boolean {
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

  get sellerName(): string {
    if (this.resultsEntity.seller.eshop &&
      this.resultsEntity.seller.eshop.nick_name) {
      return this.resultsEntity.seller.eshop.nick_name.replace('_', ' ');
    }
    if (this.resultsEntity.seller.permalink === 'http://perfil.mercadolibre.com.ar/MERCADOLIBRE+ELECTRONICA_AR' &&
      this.resultsEntity.attributes[0].values) {
      return this.resultsEntity.attributes[0].values[0].name;
    }
    return '';
  }

  get typeOfCurrency(): string {
    if (this.resultsEntity.currency_id) {
      return (this.resultsEntity.currency_id === 'USD' ? 'U$D ' : '$ ');
    } else {
      return '';
    }
  }

  get currentPrice(): string {
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

  get remainingPromoDays(): string {
    if (this.resultsEntity.prices?.prices?.length &&
      this.resultsEntity.prices?.prices[this.resultsEntity.prices.prices.length - 1]?.metadata.campaign_discount_percentage) {
      return this.resultsEntity.prices?.prices[this.resultsEntity.prices.prices.length - 1]?.metadata.campaign_discount_percentage.toFixed(0);
    }
    return '';
  }


  activeFavorites(id: string): void {
    this.resultsEntity.isFavourite = !this.resultsEntity.isFavourite;
    this.meliModelService.upsertFavourites(id, this.resultsEntity.isFavourite);
  }


  constructor(public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

  Shoemw(): void {
    console.log(this.meliModelService.searchMeliData$.value);
    console.log(this.resultsEntity);
  }
}
