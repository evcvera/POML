import {Component, HostListener, OnInit} from '@angular/core';
import {EchartModelService} from './core/model-services/echart-model.service';
import {UserDataModelService} from './core/model-services/user-data-model.service';
import {CasaModelService} from './core/model-services/casa-model.service';
import {MeliModelService} from './core/model-services/meli-model.service';
import {ISideBarForm} from './core/interfaces/iside-bar-form';
import {IMeliZipCode} from './core/interfaces/imeli-zip-code';
import {FavouritesModelServiceService} from './core/model-services/favourites-model-service.service';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {WeatherModelService} from './core/model-services/weather-model.service';
import {Title} from '@angular/platform-browser';
import {IWeather} from './core/interfaces/iweather';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  favIcon: HTMLLinkElement = document.querySelector('#appIcon');
  title: HTMLLinkElement = document.querySelector('#appTitle');

  intervaTitleFavIcon$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  titleAndFavFlag = false;

  constructor(private casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService,
              private meliModelService: MeliModelService,
              private favouritesModelServiceService: FavouritesModelServiceService,
              private router: Router,
              private weatherModelService: WeatherModelService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }

    /*const cacheUserData: ISideBarForm = JSON.parse(localStorage.getItem('userData'));
    if (cacheUserData?.birthday !== undefined) {
      cacheUserData.birthday = new Date(cacheUserData.birthday);
      this.userDataModelService.userData$.next(cacheUserData);
    }*/

    const zipCodeData: IMeliZipCode = JSON.parse(localStorage.getItem('zipCodeData'));
    if (zipCodeData !== null && this.meliModelService.zipCodeData$.value === undefined) {
      this.meliModelService.zipCodeData$.next(zipCodeData);
    }
    if (this.meliModelService.zipCodeData$.value === undefined) {
      this.meliModelService.getZipcode('1425');
    }


    const favouriteItems: string[] = JSON.parse(localStorage.getItem('favouriteItems'));
    if (favouriteItems !== null && favouriteItems !== []) {
      const result = favouriteItems.filter((item, index) => {
        return favouriteItems.indexOf(item) === index;
      });
      this.favouritesModelServiceService.favouritesMeliItems$.next(result);
    }

    this.weatherModelService.weatherData$.subscribe((x: IWeather) => {
      if (x) {
        clearInterval(this.intervaTitleFavIcon$.value);
        this.intervaTitleFavIcon$.next(setInterval(() => {
          this.setWeather(x);
        }, 10 * 1000));
      }
    });

    this.meliModelService.zipCodeData$.subscribe(x => {
      this.weatherModelService.getWeather(x.state.name);
    });
  }


  setWeather(weatherData: IWeather): void {
    let cityName = this.meliModelService.zipCodeData$.value.state.name;
    if (!this.titleAndFavFlag) {
      if (cityName === 'Capital Federal') {
        cityName = 'Buenos Aires';
      }
      this.favIcon.href = `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`;
      this.titleService.setTitle(`${Math.round(weatherData.main.temp)}°C ${cityName}`);
    } else {
      this.favIcon.href = `moon.png`;
      this.titleService.setTitle(`Tiempo de las cosas`);
    }
    this.titleAndFavFlag = !this.titleAndFavFlag;
  }


}
