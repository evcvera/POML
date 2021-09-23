import {Component, Input, OnInit} from '@angular/core';
import {IMeliSearch, ResultsEntity} from '../../../../core/interfaces/imeli-search';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-item-classified',
  templateUrl: './sales-item-classified.component.html',
  styleUrls: ['./sales-item-classified.component.scss']
})
export class SalesItemClassifiedComponent implements OnInit {

  private _resultsEntity: ResultsEntity;
  public isCarousel: boolean;

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

  get surface(): string {
    const aux: string[] = [];
    let auxSurface = false;
    let ambs = false;
    if (this.resultsEntity.attributes) {
      this.resultsEntity.attributes.forEach((x) => {

        if (aux.length >= 2) {
          return aux.join(' | ');
        }

        if (x.name.includes('Superficie cubierta') && !auxSurface) {
          if (x.value_struct.number !== 0) {
            aux.push(x.value_name + ' cubiertos');
            auxSurface = true;
          }
        }
        if (x.name.includes('Superficie total') && !auxSurface) {
          if (x.value_struct.number !== 0) {
            aux.push(x.value_name + ' totales');
            auxSurface = true;
          }
        }
        if (x.name.includes('Dormitorios') && !ambs) {
          if (x.value_name !== '0') {
            aux.push(x.value_name + ' dorms.');
            ambs = true;
          }
        }
        if (x.name.includes('Ambientes') && !ambs) {
          if (x.value_name !== '0') {
            aux.push(x.value_name + ' ambs.');
            ambs = true;
          }
        }
      });
      aux.reverse();
      return aux.join(' | ');
    }
    return aux.join('');
  }

  get attributesCar(): string {
    const aux: string[] = [];
    if (this.resultsEntity.attributes) {
      this.resultsEntity.attributes.forEach((x) => {

        if (aux.length >= 2) {
          return aux.join(' | ');
        }

        if (x.name.includes('Año')) {
          if (x.values) {
            aux.push(x.value_name);
          }
        }
        if (x.name.includes('Kilómetros')) {
          if (x.values) {
            aux.push(x.value_name);
          }
        }
      });
      aux.reverse();
      return aux.join(' | ');
    }
    return aux.join('');
  }

  get operationPropertyType(): string {
    let operation = '';
    let propertyType = '';
    if (this.resultsEntity.attributes) {
      this.resultsEntity.attributes.forEach((x) => {
        if (x.id.includes('PROPERTY_TYPE')) {
          propertyType = x.value_name;
        }
        if (x.id.includes('OPERATION')) {
          operation = x.value_name;
        }
      });
    }
    if (operation !== '' && propertyType !== '') {
      return propertyType + ' en ' + operation;
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

  get location(): string {
    let locationTxt = '';
    if (this.resultsEntity.location && this.resultsEntity.location.address_line) {
      locationTxt = this.resultsEntity.location.address_line;
      if (this.resultsEntity.location.city) {
        locationTxt += ', ' + this.resultsEntity.location.city.name;
        if (this.resultsEntity.location.state) {
          locationTxt += ', ' + this.resultsEntity.location.state.name;
        }
      }
      return locationTxt;
    }
    return locationTxt;
  }

  activeCarousel(): void {
    this.isCarousel = true;
  }


  constructor(public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

}
