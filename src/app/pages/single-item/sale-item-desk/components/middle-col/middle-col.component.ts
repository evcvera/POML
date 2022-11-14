import {Component, Input, OnInit} from '@angular/core';
import {IMeliSingleItem, Attribute} from '../../../../../core/interfaces/imeli-single-item';
import {FavouritesModelServiceService} from '../../../../../core/model-services/favourites-model-service.service';

@Component({
  selector: 'app-middle-col',
  templateUrl: './middle-col.component.html',
  styleUrls: ['./middle-col.component.scss']
})
export class MiddleColComponent implements OnInit {

  @Input() iMeliSingleItem: IMeliSingleItem;
  itemConditionAndSoldQuantity: string;
  isFavourite: boolean;

  constructor(private favouritesModelService: FavouritesModelServiceService) {
  }

  ngOnInit(): void {
    this.itemConditionAndSoldQuantity = this.getItemCondition();
    this.isFavourite = this.favouritesModelService.findFavouriteBoolean(this.iMeliSingleItem.id);
  }

  getItemCondition(): string {
    if (this.iMeliSingleItem.attributes) {
      let atributeItem: Attribute = {};
      let soldQuantity: number;
      if (this.iMeliSingleItem?.attributes) {
        atributeItem = this.iMeliSingleItem.attributes.find(x => x.id === 'ITEM_CONDITION');
      }
      if (this.iMeliSingleItem?.sold_quantity) {
        soldQuantity = this.iMeliSingleItem.sold_quantity;
      }
      if (soldQuantity && atributeItem !== {}) {
        return `${atributeItem.value_name}  |  ${soldQuantity} ${soldQuantity > 1 ? 'vendidos' : 'vendido'}`;
      } else {
        if (soldQuantity) {
          return atributeItem.value_name;
        }
        if (atributeItem !== {}) {
          return `${soldQuantity} ${soldQuantity > 1 ? 'vendidos' : 'vendido'}`;
        }
      }
    }
    return '';
  }

  activeFavorites(id: string): void {
    this.favouritesModelService.upSertFavouriteItem(id, !this.isFavourite);
    this.isFavourite = this.favouritesModelService.findFavouriteBoolean(id);
  }
}
