import {Component, OnInit} from '@angular/core';
import {EchartModelService} from './core/mode-services/echart-model.service';
import {UserDataModelService} from './core/mode-services/user-data-model.service';
import {CasaModelService} from './core/mode-services/casa-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'POML';
  width = 0;

  public get tabletOrLess(): boolean {
    return this.width <= 991;
  }

  constructor(private casaModelService: CasaModelService) {
    this.width = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }
  }

}
