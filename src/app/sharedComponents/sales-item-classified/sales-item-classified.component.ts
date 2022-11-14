import {Component, Input, OnInit} from '@angular/core';
import {IMeliSearch, ResultsEntity} from '../../core/interfaces/imeli-search';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {FavouritesModelServiceService} from '../../core/model-services/favourites-model-service.service';
import {PriceTypeModelService} from '../../core/model-services/price-type-model.service';
import {OverPriceTypeService} from '../../core/model-services/over-price-type.service';

@Component({
  selector: 'app-sales-item-classified',
  templateUrl: './sales-item-classified.component.html',
  styleUrls: ['./sales-item-classified.component.scss']
})
export class SalesItemClassifiedComponent implements OnInit {

  @Input() isClassified: boolean;
  @Input() resultsEntity: ResultsEntity;

  public isCarousel: boolean;
  activeHeart = false;
  typeOfCurrency: string;
  surface: string;
  attributesCar: string;
  operationPropertyType: string;
  currentPrice: string;
  location: string;
  locationCar: string;

  /*  @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
      this._resultsEntity = value;
    }

    get resultsEntity(): ResultsEntity {
      return this._resultsEntity;
    }*/


  constructor(public meliModelService: MeliModelService,
              public favouritesModelServiceService: FavouritesModelServiceService,
              public priceTypeModelService: PriceTypeModelService,
              public overPriceTypeService: OverPriceTypeService) {
  }

  ngOnInit(): void {
    this.typeOfCurrency = this.getTypeOfCurrency();
    this.surface = this.getSurface();
    this.attributesCar = this.getAttributesCar();
    this.operationPropertyType = this.getOperationPropertyType();
    this.currentPrice = this.getCurrentPrice();
    this.location = this.getLocation();
    this.locationCar = this.getLocationCar();
  }

  getTypeOfCurrency(): string {
    if (this.resultsEntity.currency_id) {
      return (this.resultsEntity.currency_id === 'USD' ? 'U$D ' : '$ ');
    } else {
      return '';
    }
  }

  getSurface(): string {
    const aux: string[] = [];
    let auxSurface = false;
    let ambs = false;
    if (this.resultsEntity.attributes) {
      this.resultsEntity.attributes.forEach((x) => {

        if (aux.length >= 2) {
          return aux.join(' | ');
        }

        if (x.name.includes('Superficie cubierta') && !auxSurface) {
          if (x.value_struct?.number !== 0) {
            aux.push(x.value_name + ' cubiertos');
            auxSurface = true;
          }
        }
        if (x.name.includes('Superficie total') && !auxSurface) {
          if (x.value_struct?.number !== 0) {
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

  getAttributesCar(): string {
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

  getOperationPropertyType(): string {
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

  getLocation(): string {
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

  getLocationCar(): string {
    let locationTxt = '';
    if (this.resultsEntity.location && this.resultsEntity.location.city) {
      if (this.resultsEntity.location.city) {
        locationTxt += this.resultsEntity.location.city.name;
        if (this.resultsEntity.location.state) {
          locationTxt += ' - ' + this.resultsEntity.location.state.name;
        }
      }
      return locationTxt;
    }
    return locationTxt;
  }

  activeCarousel(id: string): void {
    this.isCarousel = true;
    this.meliModelService.getImages(id);
  }

  /*activeFavorites(): void {
    this.activeHeart = !this.activeHeart;
  }*/

  activeFavorites(id: string): void {
    this.resultsEntity.isFavourite = !this.resultsEntity.isFavourite;

    if (this.meliModelService.searchMeliData$.value) {
      const searchIndex = this.meliModelService.searchMeliData$.value.results.findIndex(x => x.id === id);
      if (searchIndex > -1) {
        this.meliModelService.searchMeliData$.value.results[searchIndex].isFavourite = this.resultsEntity.isFavourite;
      }
    }
    this.favouritesModelServiceService.upSertFavouriteItem(id, this.resultsEntity.isFavourite);
  }

}
