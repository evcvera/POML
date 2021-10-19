import {Component, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {EChartsOption} from 'echarts';
import {IBasicEchartLineModel} from '../../../../core/interfaces/ibasic-echart-line-model';

@Component({
  selector: 'app-expected-time-remaining',
  templateUrl: './expected-time-remaining.component.html',
  styleUrls: ['./expected-time-remaining.component.scss']
})
export class ExpectedTimeRemainingComponent implements OnInit {

  age: number;
  retirement: number;
  expectedAge: number;
  completedAge: string;

  agePercent: number;
  retirementPercent: number;
  expectedAgePercent: number;

  _chartOption: EChartsOption;
  dataEchart: IBasicEchartLineModel[];

  constructor(public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.userDataModelService.userData$.subscribe(x => {
      this.getAge(x.birthday);
      this.retirement = x.gender === '1' ? 65 : x.gender === '0' ? 60 : 65;
      this.expectedAge = x.expectedAge;
      this.buildCompleteAge(x.birthday);

      this.agePercent = (this.age / this.expectedAge) * 100;
      this.retirementPercent = ((this.retirement - this.age) / this.expectedAge) * 100;
      this.expectedAgePercent = ((this.expectedAge - this.retirement ) / this.expectedAge) * 100;

      this.buildEchartGraph();

      /*const timeDiff = Math.abs(Date.now() - x.birthday.getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      console.log(age);*/


    });

  }

  getAge(dateString: Date): void {
    const today = new Date();
    const birthDate = new Date(dateString);
    this.age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age--;
    }
  }

  showme(): void {
    console.log(this.userDataModelService.userData$.value);
  }

  buildCompleteAge(birthday: Date): void {
    if (birthday !== undefined) {
      const todayDate = new Date();
      let ageyear = todayDate.getFullYear() - birthday.getFullYear();
      let agemonth = todayDate.getMonth() - birthday.getMonth();
      let ageday = todayDate.getDate() - birthday.getDate();

      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (new Date() < birthday) {
        agemonth--;
        ageday = 30 + ageday;
      }
      if (agemonth === 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }

      const year = ageyear + (ageyear < 2 ? ' año' : ' años');
      const mounth = agemonth + (agemonth < 2 ? ' mes' : ' meses');
      const day = ageday + (ageday < 2 ? ' dia' : ' dias');

      this.completedAge = year + ', ' + mounth + ', ' + day;
      //alert('Age in Year:' + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday);
    }
  }

  buildEchartGraph(): void {
    this._chartOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#212326',
        borderColor: '#00000000',
        textStyle: {
          color: '#FFFFFF',
        },
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          //name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              /***  TEXTO DEL CENTRO   ***/
              /*fontSize: '40',
              fontWeight: 'bold'*/
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: this.agePercent, name: 'Edad porcentual actual'},
            {value: this.retirementPercent, name: 'Tiempo porcentual para jubilación'},
            {value: this.expectedAgePercent, name: 'Tiempo porcentual con jubilación'},
          ]
        }
      ]
    };
  }

}