import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICoinCasa} from '../interfaces/icoin-casa';
import {BehaviorSubject, Observable} from 'rxjs';
import {CoinCasa} from '../interfaces/coin-casa';

@Injectable({
  providedIn: 'root'
})
export class CasaModelService {

  result: any;
  casaArray: ICoinCasa[] = [];
  currentDollar$: BehaviorSubject<ICoinCasa[]> = new BehaviorSubject<ICoinCasa[]>([]);

  constructor(private http: HttpClient) {
  }

  getDollar(): any {
    this.http.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales').subscribe((resp: ICoinCasa[]) => {
      console.log(resp);
      this.currentDollar$.next(resp);
    });
  }
}
