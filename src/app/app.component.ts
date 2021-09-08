import {Component, HostListener, OnInit} from '@angular/core';
import {EchartModelService} from './core/mode-services/echart-model.service';
import {UserDataModelService} from './core/mode-services/user-data-model.service';
import {CasaModelService} from './core/mode-services/casa-model.service';
import {MeliModelService} from './core/mode-services/meli-model.service';

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

  constructor(private casaModelService: CasaModelService) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): any {
    this.innerWidth = window.innerWidth;
  }

}
