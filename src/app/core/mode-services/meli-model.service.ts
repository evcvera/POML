import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IMeliSearch} from '../interfaces/imeli-search';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeliModelService {

  constructor(private http: HttpClient) { }

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>(undefined);

  meliSearch(search: string): any {
    this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=50`).subscribe((resp: any) => {
      this.searchMeliData$.next(resp);
      console.log(resp);
    });
  }
}
