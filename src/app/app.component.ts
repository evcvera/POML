import {Component, HostListener, OnInit} from '@angular/core';
import {EchartModelService} from './core/mode-services/echart-model.service';
import {UserDataModelService} from './core/mode-services/user-data-model.service';
import {CasaModelService} from './core/mode-services/casa-model.service';
import {MeliModelService} from './core/mode-services/meli-model.service';
import {ISideBarForm} from './core/interfaces/iside-bar-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'POML';
  public innerWidth: any;

  public get tabletOrLess(): boolean {
    return this.innerWidth <= 991;
  }

  constructor(private casaModelService: CasaModelService,
              private userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }

    const cacheUserData: ISideBarForm = JSON.parse(localStorage.getItem('userData'));
    if (cacheUserData?.birthday !== undefined) {
      cacheUserData.birthday = new Date(cacheUserData.birthday);
      cacheUserData.isDepenRelationship = cacheUserData.isDepenRelationship === 'true';
      cacheUserData.isDollar = cacheUserData.isDollar === 'true';
      cacheUserData.isPercent = cacheUserData.isPercent === 'true';
      this.userDataModelService.userData$.next(cacheUserData);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): any {
    this.innerWidth = window.innerWidth;
  }

}
