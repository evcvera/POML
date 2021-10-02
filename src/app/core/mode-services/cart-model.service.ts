import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IMeliItem} from '../interfaces/imeli-item';

@Injectable({
  providedIn: 'root'
})
export class CartModelService {

  cartMeliItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  cartMeliData$: BehaviorSubject<IMeliFavouriteItems> = new BehaviorSubject<IMeliFavouriteItems>({});
  searchCartSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  upSertCartItem(id: string, addItem: boolean): void {
    if (addItem) {
      this.cartMeliItems$.value.push(id);
    } else {
      const index = this.cartMeliItems$.value.findIndex(x => x === id);
      if (index > -1) {
        this.cartMeliItems$.value.splice(index, 1);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartMeliItems$.value));
  }

  meliSearchCartData(): any {
    if (this.searchCartSubscription) {
      this.searchCartSubscription.unsubscribe();
    }

    let auxIds = '';
    if (this.cartMeliData$.value) {
      this.cartMeliItems$.value.forEach((x, index) => {
        if (index < 20) {
          auxIds += x + ',';
        }
      });
    }

    if (auxIds !== '') {
      this.searchCartSubscription = this.http.get(`${environment.api.meli}/items?ids=${auxIds}`).subscribe((resp: IMeliItem[]) => {
        if (resp) {
          this.cartMeliData$.next({meliFavouriteItem: resp});
          console.log(resp);
          this.cartMeliData$.value.meliFavouriteItem.forEach((x) => {
            x.body.thumbnail = x.body.thumbnail.replace('-I.jpg', '-O.jpg');

            if (this.cartMeliItems$.value && this.cartMeliItems$.value !== []) {
              x.body.isCart = this.cartMeliItems$.value.some(r => r === x.body.id);
            }
          });
          const isClassified = this.cartMeliData$.value.meliFavouriteItem.find(x => x.body.buying_mode !== 'classified');
          this.cartMeliData$.value.classified = !isClassified;
        }
      });
    }
  }

}
