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

  searchMeliData$: BehaviorSubject<IMeliSearch> = new BehaviorSubject<IMeliSearch>({});

  meliSearch(search: string): any {
    this.http.get(`${environment.api.meli}/sites/MLA/search?q=${search}`).subscribe((resp: IMeliSearch) => {
      this.searchMeliData$.next(resp);
    });
  }
}
