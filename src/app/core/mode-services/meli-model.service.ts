import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {BehaviorSubject, from, Observable, Subscription} from 'rxjs';
import {IMeliZipCode} from '../interfaces/imeli-zip-code';
import {IMeliSingleItem} from '../interfaces/imeli-single-item';
import {concatMap} from 'rxjs/operators';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';
import {FavouritesModelServiceService} from './favourites-model-service.service';
import {CartModelService} from './cart-model.service';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient,
              private favouritesModelServiceService: FavouritesModelServiceService,
              private cartModelService: CartModelService) {
  }

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);
  zipCodeData$: BehaviorSubject<IMeliZipCode> = new BehaviorSubject<IMeliZipCode>(undefined);
  favouritesItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  searchSubscription: Subscription;
  zipCodeSubscription: Subscription;
  getImagesSingleItem: Subscription;
  getOpinionsSingleItem: Subscription;
  getRatingSingleItem: Subscription;
  defaultZipCode = '1425';


  meliSearch(search: string, pageNumber: number, sortPage = 'relevance'): any {

    /*********************** ZIP CODE **************************/
    let zipCode = '';
    if (this.zipCodeData$.value) {
      zipCode = this.zipCodeData$.value.zip_code;
    } else {
      this.getZipcode(this.defaultZipCode).then();
      zipCode = this.defaultZipCode;
    }
    /*********************** ZIP CODE **************************/

    this.unSubscribe();

    this.searchSubscription = this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=${pageNumber * 50}&limit=50&zip_code=${zipCode}&sort=${sortPage}`).subscribe((resp: any) => {
      const respAux: IMeliSearch = resp;
      respAux.itemIds = [];
      console.log(resp);
      respAux.results.forEach((x) => {
        x.thumbnail = x.thumbnail.replace('-I.jpg', '-O.jpg');
        x.pictures = [x.thumbnail];
        respAux.itemIds.push(x.id);

        if (this.favouritesModelServiceService.favouritesMeliItems$.value && this.favouritesModelServiceService.favouritesMeliItems$.value !== []) {
          x.isFavourite = this.favouritesModelServiceService.favouritesMeliItems$.value.some(r => r === x.id);
        }
        if (this.cartModelService.cartMeliItems$.value && this.cartModelService.cartMeliItems$.value !== []) {
          x.isCart = this.cartModelService.cartMeliItems$.value.some(r => r === x.id);
        }
      });
      const isClassified = respAux.results.find(x => x.buying_mode !== 'classified');
      respAux.classified = !isClassified;

      this.searchMeliData$.next(respAux);
      //this.getOpinionsRating(respAux.itemIds);
    });
  }

  async getZipcode(zipCode: string): Promise<boolean> {
    return new Promise(ret => {
      if (this.zipCodeSubscription) {
        this.zipCodeSubscription.unsubscribe();
      }
      this.zipCodeSubscription = this.http.get(`${environment.api.meli}/countries/AR/zip_codes/${zipCode}`).subscribe((resp: any) => {
        console.log(resp);
        this.zipCodeData$.next(resp);
        localStorage.setItem('zipCodeData', JSON.stringify(resp));
        ret(true);
      }, (error) => {
        ret(false);
      });
    });
  }

  unSubscribe(): void {
    if (this.getOpinionsSingleItem) {
      this.getOpinionsSingleItem.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.getRatingSingleItem) {
      this.getRatingSingleItem.unsubscribe();
    }
  }

  getImages(id: string): void {
    this.getImagesSingleItem = this.http.get(`${environment.api.meli}/items/${id}`).subscribe((item: IMeliSingleItem) => {
      item.pictures.shift();
      const index = this.searchMeliData$.value.results.findIndex(y => y.id === item.id);
      if (item.pictures) {
        item.pictures.forEach(z =>
          this.searchMeliData$.value.results[index].pictures.push(z.url));
      }
    });
  }

  /***************************** GET RATING AND OPINIONS ***************************************/
  getOpinionsRatingObservable(ids: string[]): any {
    return from(ids).pipe(
      concatMap(id => <Observable<IMeliItemOpinion>> this.http.get(`${environment.api.meli}/reviews/item/${id}`))
    );
  }

  getOpinionsRating(ids: string[]): any {
    let auxItemOpinion: IMeliItemOpinion = null;
    this.getOpinionsSingleItem = this.getOpinionsRatingObservable(ids).subscribe(response => {
      console.log(response);
      auxItemOpinion = response;
      if (auxItemOpinion !== null && auxItemOpinion.rating_average) {
        const index = this.searchMeliData$.value.results.findIndex(x => x.rating_average === undefined);
        if (index !== -1) {
          this.searchMeliData$.value.results[index].rating_average = auxItemOpinion.rating_average;
        }
      } else {
        const index = this.searchMeliData$.value.results.findIndex(x => x.rating_average === undefined);
        if (index !== -1) {
          this.searchMeliData$.value.results[index].rating_average = 0;
        }
      }
    }, error => {
      console.error(error);
    });
  }

  /***************************** GET RATING AND OPINIONS ***************************************/


  getSingleMeliItemOpinionObservable(id: string): Observable<number> {
    return new Observable<number>((resp) => {
      this.http.get(`${environment.api.meli}/reviews/item/${id}`).subscribe((respQ: IMeliItemOpinion) => {
        //console.log(respQ);
        resp.next(respQ.rating_average);
      });
    });
  }

  getSingleMeliItemOpinion(id: string, type: string): void {
    this.getRatingSingleItem = this.getSingleMeliItemOpinionObservable(id).subscribe((resp) => {
      switch (type) {
        case 'search': {
          const index = this.searchMeliData$.value.results.findIndex(x => x.id === id);
          if (index !== -1) {
            this.searchMeliData$.value.results[index].rating_average = resp;
          }
          break;
        }
        case 'favourite': {
          if (this.favouritesModelServiceService.favouritesMeliData$.value?.meliFavouriteItem !== undefined) {
            const index = this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.findIndex(x => x.body.id === id);
            if (index !== -1) {
              this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem[index].body.rating_average = resp;
            }
            break;
          }
        }
      }
    });
  }
}
