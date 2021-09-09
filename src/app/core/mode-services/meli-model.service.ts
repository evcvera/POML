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

  meliSearch(search: string, pageNumber: number): any {
    /*this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=50`).subscribe((resp: any) => {*/
    /*this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&limit=50&zip_code=5000`).subscribe((resp: any) => {*/
    this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}&offset=${pageNumber * 50}&limit=50&zip_code=5000`).subscribe((resp: any) => {
      this.searchMeliData$.next(resp);
      console.log(resp);
    });
  }
}
