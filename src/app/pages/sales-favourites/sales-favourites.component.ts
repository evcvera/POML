import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {FavouritesModelServiceService} from '../../core/mode-services/favourites-model-service.service';

@Component({
  selector: 'app-sales-favourites',
  templateUrl: './sales-favourites.component.html',
  styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit, OnDestroy {

  constructor(public meliModelService: MeliModelService,
              public favouritesModelServiceService: FavouritesModelServiceService) {
  }

  ngOnInit(): void {
    this.favouritesModelServiceService.meliSearchFavourites();
  }

  ngOnDestroy(): void {
    this.favouritesModelServiceService.favouritesMeliData$.next({});
  }
}
