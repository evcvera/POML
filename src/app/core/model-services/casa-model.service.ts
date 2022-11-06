import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICoinCasa} from '../interfaces/icoin-casa';
import {BehaviorSubject, Observable} from 'rxjs';
import {IDollarInfo} from '../interfaces/idollar-info';

@Injectable({
  providedIn: 'root'
})
export class CasaModelService {

  result: any;
  casaArray: ICoinCasa[] = [];
  currentDollar$: BehaviorSubject<IDollarInfo> = new BehaviorSubject<IDollarInfo>({});

  constructor(private http: HttpClient) {
  }

  getDollar(): any {
    this.http.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales').subscribe((resp: ICoinCasa[]) => {
      const auxCurrentDollar: IDollarInfo = {};
      auxCurrentDollar.oficialCompra = parseInt(resp[0].casa.compra, 10);
      auxCurrentDollar.oficialVenta = parseInt(resp[0].casa.venta, 10);
      auxCurrentDollar.oficialProm = (auxCurrentDollar.oficialCompra + auxCurrentDollar.oficialVenta) / 2;
      auxCurrentDollar.blueCompra = parseInt(resp[1].casa.compra, 10);
      auxCurrentDollar.blueVenta = parseInt(resp[1].casa.venta, 10);
      auxCurrentDollar.blueProm = (auxCurrentDollar.blueCompra + auxCurrentDollar.blueVenta) / 2;
      this.currentDollar$.next(auxCurrentDollar);
    });
  }


}
