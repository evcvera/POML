import {Component, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-card-metric-info',
  templateUrl: './card-metric-info.component.html',
  styleUrls: ['./card-metric-info.component.scss']
})
export class CardMetricInfoComponent implements OnInit {

  currentDate: Date;
  titleLeft: string;
  titleRight: string;


  constructor(public casaModelService: CasaModelService,
              public datetime: DatePipe) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.titleLeft = 'DOLAR';
    this.titleRight = this.datetime.transform(this.currentDate, 'dd/MM/yyyy');
  }

}
