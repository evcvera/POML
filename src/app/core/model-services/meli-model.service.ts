import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {AvailableFiltersEntity, FiltersEntity, IMeliSearch, ResultsEntity} from '../interfaces/imeli-search';
import {BehaviorSubject, from, Observable, Subscription} from 'rxjs';
import {IMeliZipCode} from '../interfaces/imeli-zip-code';
import {IMeliSingleItem} from '../interfaces/imeli-single-item';
import {concatMap, map} from 'rxjs/operators';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';
import {FavouritesModelServiceService} from './favourites-model-service.service';
import {PriceTypeModelService} from './price-type-model.service';
import {IMeliItemCategory} from '../interfaces/imeli-item-category';
import {IMeliCompleteRecommendations} from '../interfaces/imeli-complete-recommendations';
import {IMeliItemImg} from '../interfaces/imeli-item-img';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient,
              private favouritesModelServiceService: FavouritesModelServiceService,
              private priceTypeModelService: PriceTypeModelService) {
  }

  zipCodeData: IMeliZipCode = JSON.parse(localStorage.getItem('zipCodeData'));
  nullZipCode: IMeliZipCode = {zip_code: '1425', state: {name: 'Capital Federal', id: 'AR-C'}};
  zipCodeData$: BehaviorSubject<IMeliZipCode> = new BehaviorSubject<IMeliZipCode>(this.zipCodeData ? this.zipCodeData : this.nullZipCode);

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);

  selectedFilters$: BehaviorSubject<AvailableFiltersEntity[]> = new BehaviorSubject<AvailableFiltersEntity[]>([]);
  categoryName$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  searchSortBy$: BehaviorSubject<string> = new BehaviorSubject<string>('relevance');
  favouritesItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  searchByInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  singleItemImages$: BehaviorSubject<IMeliItemImg[]> = new BehaviorSubject<IMeliItemImg[]>(undefined);

  blockUi$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public searchSortBy: string;

  searchSubscription: Subscription;
  zipCodeSubscription: Subscription;
  getImagesSingleItem: Subscription;
  getOpinionsSingleItem: Subscription;
  getRatingSingleItem: Subscription;


  meliSearch(search: string, pageNumber: number, sortPage = 'relevance'): any {

    /********************* BLOCK UI **********************/
    this.blockUi$.next(true);

    /********************** SET SORT ***************/
    sortPage = this.searchSortBy$.value;

    /*********************** ZIP CODE **************************/
    let zipCode = '';
    zipCode = this.zipCodeData$.value.zip_code;
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
        console.log(resp);
        this.setSearchResp(resp);
      });
    } else {
      this.searchSubscription = this.http.get(`${environment.api.meli}/sites/MLA/search?category=${search}&offset=${pageNumber * 50}&limit=50&zip_code=${zipCode}&sort=${sortPage}${filters}`).subscribe((resp: any) => {
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
        console.log("me ejecute 1");
        x.priceAndType = this.priceTypeModelService.buildPriceType(price, x.prices?.presentation.display_currency);
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
    /****************** SET BLOCK UI ***************/
    this.blockUi$.next(false);
  }

  async getZipcode(zipCode: string): Promise<boolean> {
    return new Promise(ret => {
      if (this.zipCodeSubscription) {
        this.zipCodeSubscription.unsubscribe();
      }
      this.zipCodeSubscription = this.http.get(`${environment.api.meli}/countries/AR/zip_codes/${zipCode}`).subscribe((resp: any) => {
        this.zipCodeData$.next(resp);
        localStorage.setItem('zipCodeData', JSON.stringify(resp));
        ret(true);
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
      const index = this.searchMeliData$.value?.results.findIndex(y => y.id === item.id);
      if (item.pictures) {
        item.pictures.forEach(z => {
          const imgUrlHttps = z.url.replace('http:', 'https:');
          this.searchMeliData$.value?.results[index]?.pictures?.push(imgUrlHttps);
        });
      }
    });
  }

  /***************************** GET RATING AND OPINIONS ***************************************/
  async getSingleItem(id: string): Promise<IMeliSingleItem> {
    return new Promise<IMeliSingleItem>((resp) => {
      this.http.get(`${environment.api.meli}/items/${id}`).subscribe((itemAny: any) => {
        const item: IMeliSingleItem = itemAny;
        const auxImages: IMeliItemImg[] = [];
        item.pictures.forEach((x, i) => {
          const aux: IMeliItemImg = {imgUrl: x.url, isSelected: i === 0, secure_url: x.secure_url};
          auxImages.push(aux);
        });
        this.singleItemImages$.next(auxImages);

        if (item.catalog_product_id) {
          this.getSingleMeliItemOpinionPromise2(item.catalog_product_id).then(x => {
            item.fullRecommendations = x;
            resp(item);
          });
        } else {
          resp(item);
        }
      });
    });
  }

  async getCategoryBySingleItem(id: string): Promise<IMeliItemCategory> {
    return new Promise<IMeliItemCategory>((resp) => {
      this.http.get(`${environment.api.meli}/categories/${id}`).subscribe((item: any) => {
        const itemCategory: IMeliItemCategory = item;
/*        if (JSON.stringify(item) !== JSON.stringify(itemCategory)) {
          // c console.log('AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        }*/
        resp(item);
      });
    });
  }

  /*  getTransferHistory(id: string): Observable<any> {
      return this.http.get(`${environment.api.meli}/items/${id}`)
        .pipe(map((resp) => {
          /!*console.log(resp);*!/
          return resp;
        }));
    }*/

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

  getOpinionsRatingSingle(ids: string[]): any {
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

  /************** https://api.mercadolibre.com/items/MLA1107341196/shipping_options?zip_code=5000 ***********/

  /**** FORMA COMPLETA PARA OBTENER RATINGS ****/
  getSingleMeliItemOpinionPromise1(catalogProductId: string): any {
    return this.http.get(`https://www.mercadolibre.com.ar/product-fe-recommendations/recommendations?site_id=MLA&product_id=${catalogProductId}&tracking=true&product_details=true&client=pdp_comparator`).subscribe((respQ: any) => {
      // c console.log(respQ);
    });
  }

  getSingleMeliItemOpinionPromise2(catalogProductId: string): Promise<IMeliCompleteRecommendations> {
    return new Promise<IMeliCompleteRecommendations>((resp) => {
      this.http.get(`https://www.mercadolibre.com.ar/product-fe-recommendations/recommendations?site_id=MLA&product_id=${catalogProductId}&tracking=true&product_details=true&client=pdp_comparator`).subscribe((respQ: any) => {
        const iMeliCompleteRecommendations: IMeliCompleteRecommendations = respQ;
        // c console.log(respQ);
        if (JSON.stringify(respQ) !== JSON.stringify(iMeliCompleteRecommendations)) {
          // c  console.log('AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        }
        resp(iMeliCompleteRecommendations);
      }, error => {
      });
    });
  }

  getSingleMeliItemOpinion2(catalogProductId: string, id: string, type: string): void {
    this.getSingleMeliItemOpinionPromise2(catalogProductId).then((resp) => {
      switch (type) {
        case 'search': {
          const index = this.searchMeliData$.value.results.findIndex(x => x.id === id);
          if (index !== -1 && resp.recommended_products) {
            this.searchMeliData$.value.results[index].rating_average = resp.recommended_products[0]?.product_details?.REVIEWS?.rating_average ?? null;
            this.searchMeliData$.value.results[index].comments_count = resp.recommended_products[0]?.product_details?.REVIEWS?.count_reviews ?? null;
          }
          break;
        }
        case 'favourite': {
          if (this.favouritesModelServiceService.favouritesMeliData$.value?.meliFavouriteItem !== undefined) {
            const index = this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem.findIndex(x => x.body.id === id);
            if (index !== -1 && resp.recommended_products) {
              this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem[index].body.rating_average = resp?.recommended_products[0]?.product_details?.REVIEWS?.rating_average ?? null;
              this.favouritesModelServiceService.favouritesMeliData$.value.meliFavouriteItem[index].body.comments_count = resp?.recommended_products[0]?.product_details?.REVIEWS?.count_reviews ?? null;
            }
            break;
          }
        }
      }
    });
  }

  /***************************** GET RATING AND OPINIONS ***************************************/

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
