import { Component, OnInit } from '@angular/core';
import {CasaModelService} from '../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  constructor(public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService) { }

  ngOnInit(): void {

  }

}
