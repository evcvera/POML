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

 /* ngOnInit(): void {
    if (this.favouritesModelServiceService.favouritesMeliItems$.value !== []
      && this.favouritesModelServiceService.favouritesMeliItems$.value.length > 0) {
      try {
        this.favouritesModelServiceService.favouritesMeliItems$.value.forEach(x => {
          if (this.favouritesModelServiceService.favouritesMeliData$.value !== {}) {
            if (!this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.some(y => y.body.id === x)) {
              console.log('hola');
              throw true;
            }
          }
        });
      } catch (e) {
        this.favouritesModelServiceService.meliSearchFavourites();
        console.log('hola1');
      }
    } else {
      this.favouritesModelServiceService.meliSearchFavourites();
      console.log('hola2');
    }
  }*/

  ngOnDestroy(): void {
    this.favouritesModelServiceService.favouritesMeliData$.next({});
  }
}
