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

  constructor(private casaModelService: CasaModelService) {
  }

  ngOnInit(): void {
    if (this.casaModelService.currentDollar$.value !== []) {
      this.casaModelService.getDollar();
    }
  }

}
