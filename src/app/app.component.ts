import {Component, HostListener, OnInit} from '@angular/core';
import {EchartModelService} from './core/mode-services/echart-model.service';
import {UserDataModelService} from './core/mode-services/user-data-model.service';
import {CasaModelService} from './core/mode-services/casa-model.service';
import {MeliModelService} from './core/mode-services/meli-model.service';
import {ISideBarForm} from './core/interfaces/iside-bar-form';
import {IMeliZipCode} from './core/interfaces/imeli-zip-code';
import {FavouritesModelServiceService} from './core/mode-services/favourites-model-service.service';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'POML';

  constructor(private casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService,
              private meliModelService: MeliModelService,
              private favouritesModelServiceService: FavouritesModelServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }

    const cacheUserData: ISideBarForm = JSON.parse(localStorage.getItem('userData'));
    if (cacheUserData?.birthday !== undefined) {
      cacheUserData.birthday = new Date(cacheUserData.birthday);
      /*cacheUserData.isDepenRelationship = cacheUserData.isDepenRelationship === 'true';
      cacheUserData.isDollar = cacheUserData.isDollar === 'true';
      cacheUserData.isPercent = cacheUserData.isPercent === 'true';*/
      this.userDataModelService.userData$.next(cacheUserData);
    }

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

    const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-184146642-1', {
        'page_path': event.urlAfterRedirects
      });
    });
  }


}
