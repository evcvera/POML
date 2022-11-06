import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {HttpClient} from '@angular/common/http';
import {IMeliItem} from '../interfaces/imeli-item';
import {IMeliFavouriteItems} from '../interfaces/imeli-favourite-items';
import {IMeliItemOpinion} from '../interfaces/imeli-item-opinion';
import {CasaModelService} from './casa-model.service';

@Injectable({
    providedIn: 'root'
})
export class FavouritesModelServiceService {

    favouritesMeliItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    favouritesMeliData$: BehaviorSubject<IMeliFavouriteItems> = new BehaviorSubject<IMeliFavouriteItems>({});
    forkJoinSubscription: Subscription;

    constructor(private http: HttpClient,
                private casaModelService: CasaModelService) {
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

        /***** ACTUALIZO LA SUMA CADA VEZ QUE REALIZO UN CAMBIO EN FAVORITOS *****/
        this.favouritesMeliData$.value.totalSum = 0;
        if (this.favouritesMeliData$.value.meliFavouriteItem) {
            this.favouritesMeliData$.value.meliFavouriteItem.forEach((x) => {
                this.favouritesMeliData$.value.totalSum += x.body.currency_id === 'USD' ? x.body.price * this.casaModelService.currentDollar$.value.blueProm : x.body.price;
            });
        }
        /***** *****/

        localStorage.setItem('favouriteItems', JSON.stringify(this.favouritesMeliItems$.value));
    }

    findFavouriteBoolean(id: string): boolean {
        //console.log(this.favouritesMeliItems$.value);
        return this.favouritesMeliItems$.value?.some(x => x === id);
    }

    async meliSearchFavouritesArrayString(): Promise<string[]> {
        return new Promise<string[]>(resolve => {
            const testAux: string[] = [];
            if (this.favouritesMeliItems$.value) {
                for (let i = 0; i < (this.favouritesMeliItems$.value.length / 20); i++) {
                    const slicedArray = this.favouritesMeliItems$.value.slice(i * 20, (i + 1) * 20);
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
        const arrayOfObs = [];
        let favouriteItems: IMeliItem[] = [];

        if (this.forkJoinSubscription) {
            this.forkJoinSubscription.unsubscribe();
        }

        this.meliSearchFavouritesArrayString().then(y => {
          for (let i = 0; i < y.length; i++) {
                arrayOfObs.push(this.getSearchFavourites(y[i]));
            }
            this.forkJoinSubscription = forkJoin(arrayOfObs).subscribe((resp: any) => {
                const response: IMeliItem[]  = resp;
                /*if (JSON.stringify(response) !== JSON.stringify(resp)) {
                  // c console.log('AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                }*/

                for (const item of Object.keys(response)) {
                    favouriteItems = favouriteItems.concat(response[item]);
                }
                if (favouriteItems) {
                    this.favouritesMeliData$.next({meliFavouriteItem: favouriteItems});
                    this.favouritesMeliData$.value.totalSum = 0;
                    this.favouritesMeliData$.value.ids = [];
                    this.favouritesMeliData$.value.meliFavouriteItem.forEach((x) => {
                        this.favouritesMeliData$.value.ids.push(x.body.id);
                        x.body.thumbnail = x.body?.thumbnail?.replace('-I.jpg', '-O.jpg');
                        x.body.thumbnail = x.body?.thumbnail?.replace('http:', 'https:');
                        this.favouritesMeliData$.value.totalSum += x.body.currency_id === 'USD' ? x.body.price * this.casaModelService.currentDollar$.value.blueProm : x.body.price;
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
