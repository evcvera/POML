import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {HttpClient} from '@angular/common/http';
import {IMeliItem} from '../interfaces/imeli-item';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';

@Injectable({
  providedIn: 'root'
})
export class FavouritesModelServiceService {

  favouritesMeliItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  favouritesMeliData$: BehaviorSubject<IMeliFavouriteItems> = new BehaviorSubject<IMeliFavouriteItems>({});
  forkJoinSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  upSertFavouriteItem(id: string, addItem: boolean): void {
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
    localStorage.setItem('favouriteItems', JSON.stringify(this.favouritesMeliItems$.value));
  }

  async meliSearchFavouritesArrayString(): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      const testAux: string[] = [];
      if (this.favouritesMeliItems$.value) {
        for (let i = 0; i < (this.favouritesMeliItems$.value.length / 20); i++) {
          const slicedArray = this.favouritesMeliItems$.value.slice(i * 20, (i + 1) * 20);
          console.log(slicedArray);
          let auxIds = '';
          slicedArray.forEach((x) => {
            auxIds += x + ',';
          });
          testAux.push(auxIds);
        }
      }
      resolve(testAux);
    });
  }

  meliSearchFavourites(): any {
    if (this.forkJoinSubscription) {
      this.forkJoinSubscription.unsubscribe();
    }

    const arrayOfObs = [];
    let favouriteItems: IMeliItem[] = [];
    this.meliSearchFavouritesArrayString().then(y => {
      for (let i = 0; i < y.length; i++) {
        arrayOfObs.push(this.getSearchFavourites(y[i]));
      }

      this.forkJoinSubscription = forkJoin(arrayOfObs).subscribe((response: IMeliItem[]) => {
        for (const item of Object.keys(response)) {
          favouriteItems = favouriteItems.concat(response[item]);
        }
        if (favouriteItems) {
          this.favouritesMeliData$.next({meliFavouriteItem: favouriteItems});
          console.log(favouriteItems);
          this.favouritesMeliData$.value.totalSum = 0;
          this.favouritesMeliData$.value.meliFavouriteItem.forEach((x) => {
            x.body.thumbnail = x.body.thumbnail.replace('-I.jpg', '-O.jpg');
            this.favouritesMeliData$.value.totalSum += x.body.price;
            if (this.favouritesMeliItems$.value && this.favouritesMeliItems$.value !== []) {
              x.body.isFavourite = this.favouritesMeliItems$.value.some(r => r === x.body.id);
            }

          });
          const isClassified = this.favouritesMeliData$.value.meliFavouriteItem.find(x => x.body.buying_mode !== 'classified');
          this.favouritesMeliData$.value.classified = !isClassified;
        }
      }, error => {
        console.error(error);
      });

    });
  }

  public getSearchFavourites(ids: string): any {
    return this.http.get(`${environment.api.meli}/items?ids=${ids}`);
  }
}
