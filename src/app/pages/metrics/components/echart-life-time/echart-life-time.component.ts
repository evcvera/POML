import {Component, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {Subscription} from 'rxjs';
import {IBasicEchartLineModel} from '../../../../core/interfaces/ibasic-echart-line-model';
import {EchartModelService} from '../../../../core/mode-services/echart-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-echart-life-time',
  templateUrl: './echart-life-time.component.html',
  styleUrls: ['./echart-life-time.component.scss']
})
export class EchartLifeTimeComponent implements OnInit {

  _chartOption: EChartsOption;
  subscrition: Subscription;
  promProm: number;
  promWoman: number;
  promMan: number;
  dataEchart: IBasicEchartLineModel[];
  years: number;

  constructor(public echartModelService: EchartModelService,
              private userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    if (this.echartModelService.chartOption$.value === null) {
      this.dateSuscribe();
      this.setSubscriptionData();
    }
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
      /*console.log('prom ' + this.promProm * 365);
      console.log('mujer ' + this.promWoman * 365);
      console.log('hombre ' + this.promMan * 365);*/
      /*this.promProm = sumProm / this.dataEchart.length;
      this.promWoman = sumWoman / this.dataEchart.length;
      this.promMan = sumMan / this.dataEchart.length;*/

      const diffYears = 3000 - 2018;

      if (diffYears >= 0) {
        for (let i = 0; i < diffYears; i++) {
          const aux: IBasicEchartLineModel = {};
          aux.woman = this.dataEchart[this.dataEchart.length - 1].woman + this.promWoman;
          aux.man = this.dataEchart[this.dataEchart.length - 1].man + this.promMan;
          aux.prom = this.dataEchart[this.dataEchart.length - 1].prom + this.promProm;
          aux.year = this.dataEchart[this.dataEchart.length - 1].year + 1;
          aux.me = null;
          this.dataEchart.push(aux);
        }
      }

      this.buildNextYears();
    });
  }

  clickBuildNextYears(): void {
    if (this.dataEchart) {
      this.dataEchart.forEach(x => x.me = null);
      this.buildNextYears();
    }
  }

  dateSuscribe(): void {
    this.userDataModelService.userData$.subscribe(() => {
      this.clickBuildNextYears();
    });
  }

  buildNextYears(): void {
    let auxDataEchart: IBasicEchartLineModel[] = [];
    const auxBirthYear = this.dataEchart.findIndex(x => +x.year === this.userDataModelService.userData$.value?.birthday?.getUTCFullYear());
    if (this.userDataModelService.userData$.value.birthday !== undefined) {
      if (this.userDataModelService.userData$.value.gender === '0') {
        for (let i = (auxBirthYear); i < this.dataEchart.length; i++) {
          if (this.dataEchart[i - 1].me < this.dataEchart[i].man || this.dataEchart[i].man === null) {
            this.dataEchart[i].me = this.dataEchart[i - 1].me === null ? 0 : this.dataEchart[i - 1].me + 1;
          } else {
            break;
          }
        }
        auxDataEchart = this.dataEchart.filter(x => x.me >= 0 && x.me !== null);
      }
      if (this.userDataModelService.userData$.value.gender === '1') {
        for (let i = (auxBirthYear); i < this.dataEchart.length; i++) {
          if (this.dataEchart[i - 1].me < this.dataEchart[i].woman || this.dataEchart[i].woman === null) {
            this.dataEchart[i].me = this.dataEchart[i - 1].me === null ? 0 : this.dataEchart[i - 1].me + 1;
          } else {
            break;
          }
        }
        auxDataEchart = this.dataEchart.filter(x => x.me >= 0 && x.me !== null);
      }
      if (this.userDataModelService.userData$.value.gender === '2') {
        for (let i = (auxBirthYear); i < this.dataEchart.length; i++) {
          if (this.dataEchart[i - 1].me < this.dataEchart[i].prom || this.dataEchart[i].prom === null) {
            this.dataEchart[i].me = this.dataEchart[i - 1].me === null ? 0 : this.dataEchart[i - 1].me + 1;
          } else {
            break;
          }
        }
        auxDataEchart = this.dataEchart.filter(x => x.me >= 0 && x.me !== null);
      }
    } else {
      auxDataEchart = this.dataEchart.filter(x => parseInt(x.year, 10) >= 1960 && parseInt(x.year, 10) <= 2022);
    }
    this._initBasicLineChart(auxDataEchart);
  }

  _initBasicLineChart(chartData: IBasicEchartLineModel[]): void {
    const auxCharData: string[] = [];
    chartData.forEach(x => {
      auxCharData.push(x.year);
    });
    this._chartOption = {
      title: {
        text: 'Esperanza de vida',
        top: '23px',
        left: '10px',
        textStyle: {
          fontSize: '17px',
        }

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
          // saveAsImage: {}
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
    this.echartModelService.chartOption$.next(this._chartOption);
  }

}
