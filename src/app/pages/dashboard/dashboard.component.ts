import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EchartModelService} from '../../core/model-services/echart-model.service';
import {IBasicEchartLineModel} from '../../core/interfaces/ibasic-echart-line-model';
import {EChartsOption} from 'echarts';
import {CasaModelService} from '../../core/model-services/casa-model.service';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {Casa} from '../../core/interfaces/casa';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
              public userDataModelService: UserDataModelService) {
  }

  toggleForm(): void {
    this.userDataModelService.toggleForm$.next(true);
  }

  ngOnInit(): void {
  }
}
