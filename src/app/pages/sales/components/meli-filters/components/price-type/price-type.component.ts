import {Component, Input, OnInit} from '@angular/core';
import {AvailableFiltersEntity, ResultsEntity, ValuesEntity2} from '../../../../../../core/interfaces/imeli-search';
import {PriceTypeModelService} from '../../../../../../core/model-services/price-type-model.service';
import {MeliModelService} from '../../../../../../core/model-services/meli-model.service';
import {UserDataModelService} from '../../../../../../core/model-services/user-data-model.service';
import {FavouritesModelServiceService} from '../../../../../../core/model-services/favourites-model-service.service';
import {OverPriceTypeService} from '../../../../../../core/model-services/over-price-type.service';

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
