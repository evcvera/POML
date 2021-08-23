import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBasicEchartLineModel} from '../interfaces/ibasic-echart-line-model';

@Injectable()
export class EchartModelService {

  constructor(private httpClient: HttpClient) { }

  getBasicLineEchartData() : Observable<IBasicEchartLineModel[]>{
    return this.httpClient.get<IBasicEchartLineModel[]>('assets/echart/basic-line-chart-data.json');
  }
}
