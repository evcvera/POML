import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CasaModelService} from '../../../../core/model-services/casa-model.service';
import {DatePipe} from '@angular/common';
import {IMetricCard} from '../../../../core/interfaces/imetric-card';
import {IMetricCardSubtitle} from '../../../../core/interfaces/imetric-card-subtitle';
import {IDollarInfo} from '../../../../core/interfaces/idollar-info';

@Component({
  selector: 'app-card-metric-info',
  templateUrl: './card-metric-info.component.html',
  styleUrls: ['./card-metric-info.component.scss']
})
export class CardMetricInfoComponent implements OnInit, OnChanges {

  @Input() cardInfo: IMetricCard;

  moreInfo: boolean;

  constructor(public casaModelService: CasaModelService,
              public datetime: DatePipe) {
  }

  ngOnInit(): void {
    this.moreInfo = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.cardInfo);
    //console.log(changes);
  }

  showMoreInfo(): void{
    this.moreInfo = !this.moreInfo;
  }

}
