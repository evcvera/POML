import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {BehaviorSubject, from, Subscription} from 'rxjs';
import {IMeliItem} from '../interfaces/imeli-item';
import {IMeliZipCode} from '../interfaces/imeli-zip-code';
import {IMeliSingleItem} from '../interfaces/imeli-single-item';
import {concatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient) {
  }

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);
  zipCodeData$: BehaviorSubject<IMeliZipCode> = new BehaviorSubject<IMeliZipCode>(undefined);
  favouritesItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  searchSubscription: Subscription;
  zipCodeSubscription: Subscription;
  getImagesSingleItem: Subscription;
  getOpinionsSingleItem: Subscription;
  /*  array20Ids: string [] = [];
    first20Ids = '';
    seconds20Ids = '';
    thirds20Ids = '';
    imagesSubscriptions1: Subscription;
    imagesSubscriptions2: Subscription;
    imagesSubscriptions3: Subscription;
    iMeliItem1: IMeliItem [] = [];
    iMeliItem2: IMeliItem [] = [];
    iMeliItem3: IMeliItem [] = [];*/
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

    /*********************** OPINIONS *************************/
    if (this.getOpinionsSingleItem) {
      this.getOpinionsSingleItem.unsubscribe();
    }
    /*********************** OPINIONS *************************/

    /*********************  CLEAR IMAGES ******************************/
    /*    this.first20Ids = '';
        this.seconds20Ids = '';
        this.thirds20Ids = '';
        if (this.imagesSubscriptions1) {
          this.imagesSubscriptions1.unsubscribe();
        }
        if (this.imagesSubscriptions2) {
          this.imagesSubscriptions2.unsubscribe();
        }
        if (this.imagesSubscriptions3) {
          this.imagesSubscriptions3.unsubscribe();
        }*/
    /************************************* ****************************/

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=${pageNumber * 50}&limit=50&zip_code=${zipCode}&sort=${sortPage}`).subscribe((resp: any) => {
      const respAux: IMeliSearch = resp;
      respAux.itemIds = [];
      console.log(resp);
      respAux.results.forEach((x) => {
        x.thumbnail = x.thumbnail.replace('-I.jpg', '-O.jpg');
        x.pictures = [x.thumbnail];
        respAux.itemIds.push(x.id);

        const found = this.favouritesItems$.value.some(r => r === x.id);
        if (found) {
          x.isFavourite = true;
        } else {
          x.isFavourite = false;
        }
      });
      const isClassified = respAux.results.find(x => x.buying_mode !== 'classified');
      if (isClassified) {
        //this.images(respAux);
        respAux.classified = false;
      } else {
        respAux.classified = true;
      }

      this.searchMeliData$.next(respAux);
      this.getOpinionsRating(respAux.itemIds);
    });
  }


  /*  images(resp: IMeliSearch): any {

      if (resp) {
        if (resp.results) {
          resp.results.forEach((x) => {
            this.array20Ids.push(x.id);
          });

        }

        for (let i = 0; i < resp.results.length; i++) {
          if (i < 20) {
            this.first20Ids = this.first20Ids + resp.results[i].id + ',';
            this.first20Ids.slice(0, -1);
          }
          if (i > 19 && i < 40) {
            this.seconds20Ids = this.seconds20Ids + resp.results[i].id + ',';
            this.seconds20Ids.slice(0, -1);
          }
          if (i > 39 && i < 60) {
            this.thirds20Ids = this.thirds20Ids + resp.results[i].id + ',';
            this.thirds20Ids.slice(0, -1);
          }
        }

        if (this.first20Ids !== '') {
          this.imagesSubscriptions1 = this.http.get(`${environment.api.meli}/items?ids=${this.first20Ids}`).subscribe((items1: any) => {
            console.log(items1);
            this.iMeliItem1 = items1;
            this.iMeliItem1.forEach(x => {
              const index = resp.results.findIndex(y => y.id === x.body?.id);
              //resp.results[index].thumbnail = x.body.pictures[0].url;
              //resp.results[index].variations = x.body.variations;
              x.body.pictures.shift();
              if (x.body.pictures) {
                x.body.pictures.forEach(z =>
                  resp.results[index].pictures.push(z.url));
              }
            });
          });
        }
        if (this.seconds20Ids !== '') {
          this.imagesSubscriptions2 = this.http.get(`${environment.api.meli}/items?ids=${this.seconds20Ids}`).subscribe((items2: any) => {
            console.log(items2);
            this.iMeliItem2 = items2;
            this.iMeliItem2.forEach(x => {
              const index = resp.results.findIndex(y => y.id === x.body?.id);
              //resp.results[index].thumbnail = x.body.pictures[0].url;
              //resp.results[index].variations = x.body.variations;
              x.body.pictures.shift();
              if (x.body.pictures) {
                x.body.pictures.forEach(z =>
                  resp.results[index].pictures.push(z.url));
              }
            });
          });
        }
        if (this.thirds20Ids !== '') {
          this.imagesSubscriptions3 = this.http.get(`${environment.api.meli}/items?ids=${this.thirds20Ids}`).subscribe((items3: any) => {
            console.log(items3);
            this.iMeliItem3 = items3;
            this.iMeliItem3.forEach(x => {
              const index = resp.results.findIndex(y => y.id === x.body?.id);
              //resp.results[index].thumbnail = x.body.pictures[0].url;
              //resp.results[index].variations = x.body.variations;
              x.body.pictures.shift();
              if (x.body.pictures) {
                x.body.pictures.forEach(z =>
                  resp.results[index].pictures.push(z.url));
              }
            });
          });
        }
      }
    }*/

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

  /***************************** ADD FAVOURITES ***************************************/
  upsertFavourites(id: string, typeAction: boolean): void {
    if (typeAction) {
      this.favouritesItems$.value.push(id);
    } else {
      const index = this.favouritesItems$.value.findIndex(x => x === id);
      if (index > -1) {
        this.favouritesItems$.value.splice(index, 1);
      }
    }
    console.log(this.favouritesItems$.value);
  }


  /***************************** ADD FAVOURITES ***************************************/
}
