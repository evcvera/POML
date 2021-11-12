import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {FavouritesModelServiceService} from '../../core/mode-services/favourites-model-service.service';
import {CasaModelService} from '../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-sales-favourites',
  templateUrl: './sales-favourites.component.html',
  styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit, OnDestroy {

  constructor(public meliModelService: MeliModelService,
              public favouritesModelService: FavouritesModelServiceService,
              public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    const difference = this.favouritesModelService.favouritesMeliItems$.value?.filter(x => !this.favouritesModelService.favouritesMeliData$.value.ids?.includes(x))
      .concat(this.favouritesModelService.favouritesMeliData$.value.ids?.filter(x => !this.favouritesModelService.favouritesMeliItems$.value.includes(x)));
    if (difference.length > 0) {
      this.favouritesModelService.meliSearchFavourites();
    }
  }

  /* ngOnInit(): void {
     if (this.favouritesModelServiceService.favouritesMeliItems$.value !== []
       && this.favouritesModelServiceService.favouritesMeliItems$.value.length > 0) {
       try {
         this.favouritesModelServiceService.favouritesMeliItems$.value.forEach(x => {
           if (this.favouritesModelServiceService.favouritesMeliData$.value !== {}) {
             if (!this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.some(y => y.body.id === x)) {
               throw true;
             }
           }
         });
       } catch (e) {
         this.favouritesModelServiceService.meliSearchFavourites();
       }
     } else {
       this.favouritesModelServiceService.meliSearchFavourites();
     }
   }*/

  ngOnDestroy(): void {
    /*this.favouritesModelService.favouritesMeliData$.next({});*/
  }
}
