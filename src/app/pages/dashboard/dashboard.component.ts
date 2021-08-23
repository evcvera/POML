import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EchartModelService} from '../../core/mode-services/echart-model.service';
import {IBasicEchartLineModel} from '../../core/interfaces/ibasic-echart-line-model';
import {EChartsOption} from 'echarts';
import {CasaModelService} from '../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Casa} from '../../core/interfaces/casa';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  _chartOption: EChartsOption;
  subscrition: Subscription;
  promProm: number;
  promWoman: number;
  promMan: number;
  dataEchart: IBasicEchartLineModel[];
  years: number;

  constructor(private echartModelService: EchartModelService,
              private userDataModelService: UserDataModelService,
              private casaModelService: CasaModelService,
  ) {
  }

  ngOnInit(): void {
    this.casaModelService.getDollar();
    this.setSubscriptionData();
  }

  setSubscriptionData(): void {
    this.subscrition = this.echartModelService.getBasicLineEchartData().subscribe(data => {
      data.forEach(x => x.me = null);
      data.reverse();
      this.dataEchart = data;
      /*let sumProm = 0;
      let sumWoman = 0;
      let sumMan = 0;
      for (let i = 0; i < this.dataEchart.length - 1; i++) {
        sumProm += this.dataEchart[i + 1].prom - this.dataEchart[i].prom;
        sumWoman += this.dataEchart[i + 1].woman - this.dataEchart[i].woman;
        sumMan += this.dataEchart[i + 1].man - this.dataEchart[i].man;
      }*/
      this.promProm = 0.19423728813559313;
      this.promWoman = 0.19847457627118634;
      this.promMan = 0.18067796610169487;
      /*this.promProm = sumProm / this.dataEchart.length;
      this.promWoman = sumWoman / this.dataEchart.length;
      this.promMan = sumMan / this.dataEchart.length;*/
      this.buildNextYears();
    });
  }

  clickBuildNextYears(years: number = 2018): void {
    console.log(this.promProm + ' ' +
      this.promWoman + ' ' +
      this.promMan);
    this.buildNextYears(years);
    this.echartModelService.getBasicLineEchartData().subscribe(data => {
      data.reverse();
      this.dataEchart = data;
    });
  }

  buildNextYears(years: number = 2018): void {

    const diffYears = years - 2018;

    if (diffYears >= 0) {
      for (let i = 0; i < diffYears; i++) {
        const aux: IBasicEchartLineModel = {};
        aux.woman = this.dataEchart[this.dataEchart.length - 1].woman + this.promWoman;
        aux.man = this.dataEchart[this.dataEchart.length - 1].man + this.promMan;
        aux.prom = this.dataEchart[this.dataEchart.length - 1].prom + this.promProm;
        aux.year = this.dataEchart[this.dataEchart.length - 1].year + 1;
        this.dataEchart.push(aux);
      }
    }

    if (this.userDataModelService.userData$.value.birthday !== undefined) {
      const auxBirthYear = this.dataEchart.findIndex(x => +x.year === this.userDataModelService.userData$.value.birthday.getUTCFullYear());
      for (let i = (auxBirthYear); i < this.dataEchart.length; i++) {
        if (this.dataEchart[i - 1].me < this.dataEchart[i].woman || this.dataEchart[i].woman === null) {
          this.dataEchart[i].me = this.dataEchart[i - 1].me === null ? 0 : this.dataEchart[i - 1].me + 1;
        } else {
          break;
        }
      }
    }

    this._initBasicLineChart(this.dataEchart);

  }

  _initBasicLineChart(chartData: IBasicEchartLineModel[]): void {

    const auxCharData: string[] = [];
    chartData.forEach(x => {
      auxCharData.push(x.year);
    });

    this._chartOption = {
      title: {
        text: 'Esperanza de vida'
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#212326',
        textStyle: {
          color: '#FFFFFF',
        },
      },
      legend: {
        data: ['Mujer', 'Hombre', 'Promedio', 'Yo']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: auxCharData
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Mujer',
          type: 'line',
          data: chartData.map(m => ({
            value: m.woman === null ? null : m.woman.toFixed(2),
          })),
        },
        {
          name: 'Hombre',
          type: 'line',
          data: chartData.map(m => ({
            value: m.man === null ? null : m.man.toFixed(2),
          })),
        },
        {
          name: 'Promedio',
          type: 'line',
          data: chartData.map(m => ({
            value: m.prom === null ? null : m.prom.toFixed(2),
          })),
        },
        {
          name: 'Yo',
          type: 'line',
          data: chartData.map(m => ({
            value: m.me,
          })),
        }
      ]
    };
  }
}
