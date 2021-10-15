import { Component, OnInit } from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';

@Component({
  selector: 'app-card-metric-info',
  templateUrl: './card-metric-info.component.html',
  styleUrls: ['./card-metric-info.component.scss']
})
export class CardMetricInfoComponent implements OnInit {

  constructor(public casaModelService: CasaModelService) { }

  ngOnInit(): void {
  }

}
