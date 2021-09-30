import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {HttpClient} from '@angular/common/http';
import {IMeliItem} from '../interfaces/imeli-item';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';

@Injectable({
  providedIn: 'root'
})
export class FavouritesModelServiceService {

  favouritesMeliItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  favouritesMeliData$: BehaviorSubject<IMeliFavouriteItems> = new BehaviorSubject<IMeliFavouriteItems>({});
  searchFavouritesSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  upSertFavouriteItem(id: string, addItem: boolean): void {
    if (addItem) {
      this.favouritesMeliItems$.value.push(id);
    } else {
      const index = this.favouritesMeliItems$.value.findIndex(x => x === id);
      if (index > -1) {
        this.favouritesMeliItems$.value.splice(index, 1);
      }
    }
    localStorage.setItem('favouriteItems', JSON.stringify(this.favouritesMeliItems$.value));
  }

  meliSearchFavourites(): any {
    if (this.searchFavouritesSubscription) {
      this.searchFavouritesSubscription.unsubscribe();
    }

    let auxIds = '';
    if (this.favouritesMeliData$.value) {
      this.favouritesMeliItems$.value.forEach((x, index) => {
        if (index < 20) {
          auxIds += x + ',';
          console.log(auxIds);
        }
      });
    }

    if (auxIds !== '') {
      this.searchFavouritesSubscription = this.http.get(`${environment.api.meli}/items?ids=${auxIds}`).subscribe((resp: IMeliItem[]) => {
        if (resp) {
          this.favouritesMeliData$.next({meliFavouriteItem: resp});
          console.log(resp);
          this.favouritesMeliData$.value.meliFavouriteItem.forEach((x) => {
            x.body.thumbnail = x.body.thumbnail.replace('-I.jpg', '-O.jpg');

            if (this.favouritesMeliItems$.value && this.favouritesMeliItems$.value !== []) {
              x.body.isFavourite = this.favouritesMeliItems$.value.some(r => r === x.body.id);
            }
          });
          const isClassified = this.favouritesMeliData$.value.meliFavouriteItem.find(x => x.body.buying_mode !== 'classified');
          this.favouritesMeliData$.value.classified = !isClassified;
        }
      });
    }
  }
}
