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
  activeHeart = false;

  @Input() isClassified: boolean;

  @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
    this._resultsEntity = value;
  }

  get resultsEntity(): ResultsEntity {
    return this._resultsEntity;
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

  get locationCar(): string {
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

  activeFavorites(): void {
    this.activeHeart = !this.activeHeart;
  }

  constructor(public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

}
