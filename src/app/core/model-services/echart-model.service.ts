import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IBasicEchartLineModel} from '../interfaces/ibasic-echart-line-model';
import {EChartsOption} from 'echarts';

@Injectable()
export class EchartModelService {

  constructor(private httpClient: HttpClient) { }

  chartOption$: BehaviorSubject<EChartsOption> = new BehaviorSubject<EChartsOption>(null);

  getBasicLineEchartData(): Observable<IBasicEchartLineModel[]>{
    return this.httpClient.get<IBasicEchartLineModel[]>('assets/echart/basic-line-chart-data.json');
  }
}
