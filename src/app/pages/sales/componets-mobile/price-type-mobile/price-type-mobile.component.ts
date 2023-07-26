import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../../../core/model-services/meli-model.service';
import {Router} from '@angular/router';
import {UserDataModelService} from '../../../../core/model-services/user-data-model.service';
import {AvailableFiltersEntity, IMeliSearch, ResultsEntity, ValuesEntity2} from '../../../../core/interfaces/imeli-search';
import {PriceTypeModelService} from '../../../../core/model-services/price-type-model.service';
import {FavouritesModelService} from '../../../../core/model-services/favourites-model.service';
import {OverPriceTypeService} from '../../../../core/model-services/over-price-type.service';

@Component({
  selector: 'app-price-type-mobile',
  templateUrl: './price-type-mobile.component.html',
  styleUrls: ['./price-type-mobile.component.scss']
})
export class PriceTypeMobileComponent implements OnInit {

  @Input() isFavourites: boolean;

  constructor(public priceTypeModelService: PriceTypeModelService,
              public overPriceTypeService: OverPriceTypeService,
              public meliModelService: MeliModelService,
              public modal: NgbActiveModal,
              public userDataModelService: UserDataModelService,
              public favouritesModelService: FavouritesModelService) {
  }

  ngOnInit(): void {
  }

  setPriceType(item: ValuesEntity2): void {
    this.overPriceTypeService.setPriceType(item);
    this.modal.close(false);
  }

}
