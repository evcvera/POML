import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {IMeliItem} from '../interfaces/imeli-item';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';
import {CasaModelService} from './casa-model.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesModelService {

  favouritesMeliItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  favouritesMeliData$: BehaviorSubject<IMeliFavouriteItems> = new BehaviorSubject<IMeliFavouriteItems>({});
  forkJoinSubscription: Subscription;

  constructor(private http: HttpClient,
              private casaModelService: CasaModelService) {
  }

/*  upSertFavouriteItem(id: string, addItem: boolean): void {
    if (addItem) {
      if (!this.favouritesMeliItems$.value.find(x => x === id)) {
        this.favouritesMeliItems$.value.push(id);
      }
    } else {
      const index = this.favouritesMeliItems$.value.findIndex(x => x === id);
      if (index > -1) {
        this.favouritesMeliItems$.value.splice(index, 1);
      }
    }

    /!***** ACTUALIZO LA SUMA CADA VEZ QUE REALIZO UN CAMBIO EN FAVORITOS *****!/
    this.favouritesMeliData$.value.totalSum = 0;
    if (this.favouritesMeliData$.value.meliFavouriteItem) {
      this.favouritesMeliData$.value.meliFavouriteItem.forEach((x) => {
        this.favouritesMeliData$.value.totalSum += x.body.currency_id === 'USD' ? x.body.price * this.casaModelService.currentDollar$.value.blueProm : x.body.price;
        this.favouritesMeliData$.next(this.favouritesMeliData$.value)
      });
    }
    /!***** *****!/

    localStorage.setItem('favouriteItems', JSON.stringify(this.favouritesMeliItems$.value));
  }*/

  upSertFavouriteItem(id: string, addItem: boolean): void {
    const favouritesItems = this.favouritesMeliItems$.value;
    const favouritesData = this.favouritesMeliData$.value;

    if (addItem) {
      if (!favouritesItems.includes(id)) {
        favouritesItems.push(id);
      }
    } else {
      const index = favouritesItems.indexOf(id);
      if (index > -1) {
        favouritesItems.splice(index, 1);
      }
    }

    favouritesData.totalSum = 0;
    /***** ACTUALIZO LA SUMA CADA VEZ QUE REALIZO UN CAMBIO EN FAVORITOS *****/
    if (favouritesData.meliFavouriteItem) {
      favouritesData.meliFavouriteItem.forEach((x) => {
        const price = x.body.currency_id === 'USD' ? x.body.price * this.casaModelService.currentDollar$.value.blueProm : x.body.price;
        favouritesData.totalSum += price;
      });
    }
    /***** *****/
    this.favouritesMeliData$.next(favouritesData);
    localStorage.setItem('favouriteItems', JSON.stringify(favouritesItems));
  }

  findFavouriteBoolean(id: string): boolean {
    return this.favouritesMeliItems$.value?.some(x => x === id);
  }

  async meliSearchFavouritesArrayString(): Promise<string[]> {
    const favouritesMeliItemsValue = this.favouritesMeliItems$.value;
    const result: string[] = [];
    const chunkSize = 20;

    for (let i = 0; i < favouritesMeliItemsValue.length; i += chunkSize) {
      const chunk = favouritesMeliItemsValue.slice(i, i + chunkSize);
      result.push(chunk.join(','));
    }

    return result;
  }

  meliSearchFavourites(): void {
    if (this.forkJoinSubscription) {
      this.forkJoinSubscription.unsubscribe();
    }

    this.meliSearchFavouritesArrayString()
      .then(async (y: string[]) => {
        const arrayOfObs: Observable<IMeliItem>[] = y.map(item => this.getSearchFavourites(item));

        this.forkJoinSubscription = forkJoin(arrayOfObs)
          .subscribe((resp: any) => {
              const response: IMeliItem[] = [].concat(...resp);

              const favouritesMeliData = this.favouritesMeliData$.value;
              favouritesMeliData.totalSum = 0;
              favouritesMeliData.ids = [];
              favouritesMeliData.meliFavouriteItem = response.map((x: IMeliItem) => {
                x.body.thumbnail = x.body?.thumbnail?.replace('-I.jpg', '-O.jpg')?.replace('http:', 'https:');
                const price = x.body.currency_id === 'USD' ? x.body.price * this.casaModelService.currentDollar$.value.blueProm : x.body.price;
                favouritesMeliData.totalSum += price;
                x.body.isFavourite = this.favouritesMeliItems$.value?.some(r => r === x.body.id);
                favouritesMeliData.ids.push(x.body.id);
                return x;
              });

              const isClassified = favouritesMeliData.meliFavouriteItem.some(x => x.body.buying_mode !== 'classified');
              favouritesMeliData.classified = !isClassified;

              this.favouritesMeliData$.next(favouritesMeliData);
            },
            error => {
              console.error(error);
            });
      });
  }

  public getSearchFavourites(ids: string): any {
    return this.http.get(`${environment.api.meli}/items?ids=${ids}`);
  }
}
