import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {AvailableFiltersEntity, FiltersEntity, IMeliSearch, ResultsEntity} from '../interfaces/imeli-search';
import {BehaviorSubject, from, Observable, Subscription} from 'rxjs';
import {IMeliZipCode} from '../interfaces/imeli-zip-code';
import {IMeliSingleItem} from '../interfaces/imeli-single-item';
import {concatMap} from 'rxjs/operators';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';
import {FavouritesModelServiceService} from './favourites-model-service.service';
import {PriceTypeModelService} from './price-type-model.service';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient,
              private favouritesModelServiceService: FavouritesModelServiceService,
              private priceTypeModelService: PriceTypeModelService) {
  }

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);
  zipCodeData$: BehaviorSubject<IMeliZipCode> = new BehaviorSubject<IMeliZipCode>(undefined);

  selectedFilters$: BehaviorSubject<AvailableFiltersEntity[]> = new BehaviorSubject<AvailableFiltersEntity[]>([]);
  categoryName$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  searchSortBy$: BehaviorSubject<string> = new BehaviorSubject<string>('relevance');
  favouritesItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  searchByInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  blockUi$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public searchSortBy: string;

  searchSubscription: Subscription;
  zipCodeSubscription: Subscription;
  getImagesSingleItem: Subscription;
  getOpinionsSingleItem: Subscription;
  getRatingSingleItem: Subscription;
  defaultZipCode = '1425';


  meliSearch(search: string, pageNumber: number, sortPage = 'relevance'): any {

    /********************* BLOCK UI **********************/
    this.blockUi$.next(true);

    /********************** SET SORT ***************/
    sortPage = this.searchSortBy$.value;
    /*********************** ZIP CODE **************************/
    let zipCode = '';
    if (this.zipCodeData$.value) {
      zipCode = this.zipCodeData$.value.zip_code;
    } else {
      this.getZipcode(this.defaultZipCode).then();
      zipCode = this.defaultZipCode;
    }
    /*********************** ZIP CODE **************************/

    /*********************** FILTERS **************************/
    let filters = '';
    if (this.selectedFilters$.value !== []) {
      this.selectedFilters$.value.forEach(x => {
        filters += '&' + x.id + '=' + x.values[0].id;
      });
    }
    /*********************** FILTERS **************************/

    this.unSubscribe();
//&shipping_cost=free
    if (this.searchByInput$.value) {
      this.searchSubscription = this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=${pageNumber * 50}&limit=50&zip_code=${zipCode}&sort=${sortPage}${filters}`).subscribe((resp: any) => {
        // b console.log(resp);
        this.setSearchResp(resp);
      });
    } else {
      this.searchSubscription = this.http.get(`${environment.api.meli}/sites/MLA/search?category=${search}&offset=${pageNumber * 50}&limit=50&zip_code=${zipCode}&sort=${sortPage}${filters}`).subscribe((resp: any) => {
        // b console.log(resp);
        this.setSearchResp(resp);
      });
    }
  }

  setSearchResp(resp: any): void {
    const respAux: IMeliSearch = resp;
    respAux.itemIds = [];
    respAux.results.forEach((x) => {
      x.thumbnail = x.thumbnail.replace('-I.jpg', '-O.webp');
      //https://http2.mlstatic.com/D_NQ_NP_723831-MLA45658735494_042021-O.webp
      x.thumbnail = x.thumbnail.replace('http:', 'https:');
      x.thumbnail = x.thumbnail.replace('D_', 'D_NQ_NP_');
      x.pictures = [x.thumbnail];
      respAux.itemIds.push(x.id);
      if (this.favouritesModelServiceService.favouritesMeliItems$.value && this.favouritesModelServiceService.favouritesMeliItems$.value !== []) {
        x.isFavourite = this.favouritesModelServiceService.favouritesMeliItems$.value.some(r => r === x.id);
      }

      if (this.priceTypeModelService.priceType$.value.id !== 'standar') {
        const price = this.getCurrentPrice(x);
        x.priceAndType = this.priceTypeModelService.buildPriceType(price, x.prices.presentation.display_currency);
      }

    });
    const isClassified = respAux.results.find(x => x.buying_mode !== 'classified');
    respAux.classified = !isClassified;

    if (!this.searchByInput$.value) {
      respAux.query = this.categoryName$.value;
    }

    if (this.selectedFilters$.value.length === 0) {
      this.addCategorieFilter(respAux.filters[0]);
    }

    this.searchMeliData$.next(respAux);
    //this.getOpinionsRating(respAux.itemIds);

    /****************** SET BLOCK UI ***************/
    this.blockUi$.next(false);


  }

  async getZipcode(zipCode: string): Promise<boolean> {
    return new Promise(ret => {
      if (this.zipCodeSubscription) {
        this.zipCodeSubscription.unsubscribe();
      }
      this.zipCodeSubscription = this.http.get(`${environment.api.meli}/countries/AR/zip_codes/${zipCode}`).subscribe((resp: any) => {
        // a console.log(resp);
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
      // b console.log(item);
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


  getSingleMeliItemOpinionPromise(id: string): Promise<IMeliItemOpinion> {
    return new Promise<IMeliItemOpinion>((resp) => {
      this.http.get(`${environment.api.meli}/reviews/item/${id}`).subscribe((respQ: IMeliItemOpinion) => {
        resp(respQ);
      });
    });
  }

  getSingleMeliItemOpinion(id: string, type: string): void {
    /*if(this.getRatingSingleItem){
      this.getRatingSingleItem.unsubscribe();
    }*/
    this.getSingleMeliItemOpinionPromise(id).then((resp) => {
      switch (type) {
        case 'search': {
          const index = this.searchMeliData$.value.results.findIndex(x => x.id === id);
          if (index !== -1) {
            this.searchMeliData$.value.results[index].rating_average = resp.rating_average;
            this.searchMeliData$.value.results[index].comments_count = resp.paging.total;
          }
          break;
        }
        case 'favourite': {
          if (this.favouritesModelServiceService.favouritesMeliData$.value?.meliFavouriteItem !== undefined) {
            const index = this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.findIndex(x => x.body.id === id);
            if (index !== -1) {
              this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem[index].body.rating_average = resp.rating_average;
              this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem[index].body.comments_count = resp.paging.total;
            }
            break;
          }
        }
      }
    });
  }

  addCategorieFilter(filter: FiltersEntity): void {
    if (filter && filter.id !== undefined) {
      const auxFilter: AvailableFiltersEntity = {id: filter.id, name: filter.name, type: filter.type, values: [{}]};
      auxFilter.values[0] = {name: filter.values[0].name, id: filter.values[0].id};
      this.selectedFilters$.value.push(auxFilter);
    }
  }

  getCurrentPrice(x: ResultsEntity): number {
    if (x.prices?.prices?.length) {
      if (x.prices?.prices[x.prices?.prices?.length - 1]?.amount) {
        return Number(x.prices?.prices[x.prices?.prices?.length - 1]?.amount?.toFixed(0));
      }
    }
    if (x.price) {
      return Number(x.price.toFixed(0));
    }
    return 0;
  }
}
