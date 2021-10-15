import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {FavouritesModelServiceService} from '../../core/mode-services/favourites-model-service.service';
import {CasaModelService} from '../../core/mode-services/casa-model.service';

@Component({
  selector: 'app-sales-favourites',
  templateUrl: './sales-favourites.component.html',
  styleUrls: ['./sales-favourites.component.scss']
})
export class SalesFavouritesComponent implements OnInit, OnDestroy {

  constructor(public meliModelService: MeliModelService,
              public favouritesModelService: FavouritesModelServiceService,
              public casaModelService: CasaModelService) {
  }

  ngOnInit(): void {
    /*const result = this.favouritesModelService.favouritesMeliItems$.value
      .filter(x => !this.favouritesModelService.favouritesMeliData$.value?.ids?.includes(x))
      .concat(this.favouritesModelService.favouritesMeliData$.value?.ids?.filter(x => !this.favouritesModelService.favouritesMeliItems$.value?.includes(x)));*/
    /*console.log('AAAAAAAAAAAA');
    console.log(this.favouritesModelService.favouritesMeliItems$.value);
    console.log('AAAAAAAAAAAA');
    console.log('BBBBBBBBBBBB');
    console.log(this.favouritesModelService.favouritesMeliData$.value.ids);
    console.log('BBBBBBBBBBBB');
    const result = this.favouritesModelService.favouritesMeliItems$.value?.filter(x => this.favouritesModelService.favouritesMeliData$.value?.ids?.includes(x));
    console.log('CCCCCCCCCCCC');
    console.log(result);
    console.log('CCCCCCCCCCCC');*/

    const difference = this.favouritesModelService.favouritesMeliItems$.value?.filter(x => !this.favouritesModelService.favouritesMeliData$.value.ids?.includes(x))
      .concat(this.favouritesModelService.favouritesMeliData$.value.ids?.filter(x => !this.favouritesModelService.favouritesMeliItems$.value.includes(x)));

    /*console.log('DDDDDDDDDDDD');
    console.log(difference);
    console.log('DDDDDDDDDDDD');*/

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
    /*this.favouritesModelService.favouritesMeliData$.next({});*/
  }
}
