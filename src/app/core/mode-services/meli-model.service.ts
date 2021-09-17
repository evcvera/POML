import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IMeliItem} from '../interfaces/imeli-item';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient) {
  }

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);
  subscription: Subscription;
  array20Ids: string [] = [];
  first20Ids = '';
  seconds20Ids = '';
  thirds20Ids = '';
  imagesSubscriptions1: Subscription;
  imagesSubscriptions2: Subscription;
  imagesSubscriptions3: Subscription;
  iMeliItem1: IMeliItem [] = [];
  iMeliItem2: IMeliItem [] = [];
  iMeliItem3: IMeliItem [] = [];


  meliSearch(search: string, pageNumber: number, sortPage = 'relevance'): any {

    /*********************  CLEAR IMAGES ******************************/
    this.first20Ids = '';
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
    }
    /************************************* ****************************/

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    /*this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=50`).subscribe((resp: any) => {*/
    /*this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&limit=50&zip_code=5000`).subscribe((resp: any) => {*/
    this.subscription = this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=${pageNumber * 50}&limit=50&zip_code=5000&sort=${sortPage}`).subscribe((resp: any) => {
      this.searchMeliData$.next(resp);
      console.log(resp);
    });
  }


  images(): any {

    this.searchMeliData$.subscribe(resp => {
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
              resp.results[index].thumbnail = x.body.pictures[0].url;
            });
          });
        }
        if (this.seconds20Ids !== '') {
          this.imagesSubscriptions2 = this.http.get(`${environment.api.meli}/items?ids=${this.seconds20Ids}`).subscribe((items2: any) => {
            console.log(items2);
            this.iMeliItem2 = items2;
            this.iMeliItem2.forEach(x => {
              const index = resp.results.findIndex(y => y.id === x.body?.id);
              resp.results[index].thumbnail = x.body.pictures[0].url;
            });
          });
        }
        if (this.thirds20Ids !== '') {
          this.imagesSubscriptions3 = this.http.get(`${environment.api.meli}/items?ids=${this.thirds20Ids}`).subscribe((items3: any) => {
            console.log(items3);
            this.iMeliItem3 = items3;
            this.iMeliItem3.forEach(x => {
              const index = resp.results.findIndex(y => y.id === x.body?.id);
              resp.results[index].thumbnail = x.body.pictures[0].url;
            });
          });
        }
      }
    });
  }

}
