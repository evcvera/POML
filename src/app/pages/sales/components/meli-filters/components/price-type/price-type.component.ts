import {Component, Input, OnInit} from '@angular/core';
import {AvailableFiltersEntity, ResultsEntity, ValuesEntity2} from '../../../../../../core/interfaces/imeli-search';
import {PriceTypeModelService} from '../../../../../../core/mode-services/price-type-model.service';
import {MeliModelService} from '../../../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../../../core/mode-services/user-data-model.service';
import {FavouritesModelServiceService} from '../../../../../../core/mode-services/favourites-model-service.service';
import {OverPriceTypeService} from '../../../../../../core/mode-services/over-price-type.service';

@Component({
  selector: 'app-price-type',
  templateUrl: './price-type.component.html',
  styleUrls: ['./price-type.component.scss']
})
export class PriceTypeComponent implements OnInit {

  constructor(public priceTypeModelService: PriceTypeModelService,
              public overPriceTypeService: OverPriceTypeService,
              public meliModelService: MeliModelService,
              public favouritesModelService: FavouritesModelServiceService) {
  }

  ngOnInit(): void {
  }

}
