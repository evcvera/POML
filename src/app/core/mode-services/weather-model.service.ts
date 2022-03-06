import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {IWeather} from '../interfaces/iweather';

@Injectable({
  providedIn: 'root'
})
export class WeatherModelService {
  searchSubscription: Subscription;
  weatherData$: BehaviorSubject<IWeather> = new BehaviorSubject<IWeather>(null);

  constructor(private http: HttpClient) {
  }

  getWeather(aux: string): void {
    if (aux) {
      if (aux === 'Capital Federal') {
        aux = 'Buenos%20Aires';
      }
      const city = aux.replace(' ', '%20');

      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
      //buenos%20aires
      this.searchSubscription = this.http.get(`${environment.api.weather}${city},AR&appid=45c01786a7c18126d3d88795cde0453b&units=metric`).subscribe((resp: IWeather) => {
        this.weatherData$.next(resp);
      });
    }
  }
}
