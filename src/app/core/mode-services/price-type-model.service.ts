import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ValuesEntity2} from '../interfaces/imeli-search';

@Injectable({
  providedIn: 'root'
})
export class PriceTypeModelService {

  princeType$: BehaviorSubject<ValuesEntity2> = new BehaviorSubject<ValuesEntity2>({name: 'Estandar', id: 'standar'});

  constructor() {
  }

}
