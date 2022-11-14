import {Component, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/model-services/casa-model.service';
import {UserDataModelService} from '../../../../core/model-services/user-data-model.service';
import {EChartsOption} from 'echarts';
import {IBasicEchartLineModel} from '../../../../core/interfaces/ibasic-echart-line-model';
import {ISideBarForm} from '../../../../core/interfaces/iside-bar-form';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-expected-time-remaining',
  templateUrl: './expected-time-remaining.component.html',
  styleUrls: ['./expected-time-remaining.component.scss']
})
export class ExpectedTimeRemainingComponent implements OnInit {

  age: number;
  retirement: number;
  expectedAge: number;
  //completedAge: string;
  completedAgeNew: string;

  agePercent: number;
  retirementPercent: number;
  expectedAgePercent: number;

  expectedDateLeftTimeFrom: Date;
  expectedDateLeftTimeTo: Date;

  incomeBefore: number;
  incomeBeforeSavingCapacity: number;

  incomeBeforeOpositiveOff = 0;
  incomeBeforeSavingCapacityOpositiveOff = 0;

  incomeBeforeOpositiveBlue = 0;
  incomeBeforeSavingCapacityOpositiveBlue = 0;


  userDataSubscription: Subscription;

  _chartOption: EChartsOption;
  dataEchart: IBasicEchartLineModel[];

  isPercent: boolean;

  constructor(public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.isPercent = false;
    this.startImg();
    this.infoData();
  }

  infoData(): void {
  }

  startImg(): void {
    this.isPercent = !this.isPercent;
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }

    this.userDataSubscription = this.userDataModelService.userData$.subscribe(x => {

      this.getAge(x.birthday);
      this.completedAgeNew = this.getAgeCompleted(this.datePipe.transform(x.birthday, 'MM-dd-yyyy'));
      this.retirement = x.gender === '0' ? 65 : x.gender === '1' ? 60 : 65;
      this.expectedAge = x.expectedAge;
      this.expectedDateLeftTimeTo = new Date(x.birthday);
      this.expectedDateLeftTimeTo.setDate(x.birthday.getDate() + (x.expectedAge * 365.25));
      this.expectedDateLeftTimeFrom = new Date(this.expectedDateLeftTimeTo);
      this.expectedDateLeftTimeFrom.setDate(this.expectedDateLeftTimeTo.getDate() - 365.25);
      //this.buildCompleteAge(x.birthday);

      if (this.isPercent) {
        this.agePercent = (this.age / this.expectedAge) * 100;
        this.retirementPercent = ((this.retirement - this.age) / this.expectedAge) * 100;
        this.expectedAgePercent = ((this.expectedAge - this.retirement) / this.expectedAge) * 100;
      } else {
        this.agePercent = this.age;
        this.retirementPercent = this.retirement - this.age > 0 ? this.retirement - this.age : 0;
        this.expectedAgePercent = (this.expectedAge - this.retirement);
      }


      const auxLeftRetirment = this.retirement - this.age > 0 ? this.retirement - this.age : 0;
      const auxSalary = x.is_depen_relationship ? x.salary * 13 : x.salary * 12;
      const auxSavingCapacityInt = x.is_depen_relationship ? x.saving_capacity * 13 : x.saving_capacity * 12;
      this.incomeBefore = auxLeftRetirment * auxSalary;
      this.incomeBeforeSavingCapacity = x.is_percent ? auxLeftRetirment * auxSalary * (x.saving_capacity / 100) :
        auxLeftRetirment * auxSavingCapacityInt;

      if (this.userDataModelService.userData$?.value?.is_dollar) {
        this.incomeBeforeOpositiveOff = this.incomeBefore * this.casaModelService.currentDollar$.value.oficialProm;
        this.incomeBeforeSavingCapacityOpositiveOff = this.incomeBeforeSavingCapacity * this.casaModelService.currentDollar$.value.oficialProm;

        this.incomeBeforeOpositiveBlue = this.incomeBefore * this.casaModelService.currentDollar$.value.blueProm;
        this.incomeBeforeSavingCapacityOpositiveBlue = this.incomeBeforeSavingCapacity * this.casaModelService.currentDollar$.value.blueProm;
      } else {
        this.incomeBeforeOpositiveOff = this.incomeBefore / this.casaModelService.currentDollar$.value.oficialProm;
        this.incomeBeforeSavingCapacityOpositiveOff = this.incomeBeforeSavingCapacity / this.casaModelService.currentDollar$.value.oficialProm;

        this.incomeBeforeOpositiveBlue = this.incomeBefore / this.casaModelService.currentDollar$.value.blueProm;
        this.incomeBeforeSavingCapacityOpositiveBlue = this.incomeBeforeSavingCapacity / this.casaModelService.currentDollar$.value.blueProm;
      }


      this.buildEchartGraph();
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

  getAgeCompleted(dateString): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dateNow = now.getDate();

    const dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5)
    );

    const yearDob = dob.getFullYear();
    const monthDob = dob.getMonth();
    const dateDob = dob.getDate();
    let ageString = '';
    let yearString = '';
    let monthString = '';
    let dayString = '';


    let yearAge = yearNow - yearDob;
    let monthAge = 0;

    if (monthNow >= monthDob) {
      monthAge = monthNow - monthDob;
    } else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }

    let dateAge = 0;
    if (dateNow >= dateDob) {
      dateAge = dateNow - dateDob;
    } else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    const age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
    };

    if (age.years > 1) {
      yearString = ' años';
    } else {
      yearString = ' año';
    }
    if (age.months > 1) {
      monthString = ' meses';
    } else {
      monthString = ' mes';
    }
    if (age.days > 1) {
      dayString = ' días';
    } else {
      dayString = ' día';
    }


    if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.years + yearString + ', ' + age.months + monthString + ', y ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) {
      ageString = 'Solo ' + age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) {
      ageString = age.years + yearString + ' Feliz cumpleaños!!';
    } else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.years + yearString + ' y ' + age.months + monthString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.months + monthString + ' y ' + age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) {
      ageString = age.years + yearString + ' y ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.months + monthString;
    } else {
      ageString = 'Oops! No podemos calcular tu edad!';
    }

    return ageString;
  }

  /*  buildCompleteAge(birthday: Date): void {
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
    }*/

  buildEchartGraph(): void {
    this._chartOption = {
      /*tooltip: {
        trigger: 'item',
        backgroundColor: '#212326',
        borderColor: '#00000000',
        textStyle: {
          color: '#FFFFFF',
        },
      },*/
      tooltip: {
        trigger: 'item',
        backgroundColor: '#1f4e96',
        borderColor: '#00000000',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#1f4e96',
          }
        },
        textStyle: {
          color: '#FFFFFF',
        },
        position: 'inside',
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
            /*{value: this.agePercent, name: this.isPercent ? 'Edad porcentual actual' : 'Edad actual'},
            {value: this.retirementPercent, name: this.isPercent ? 'Tiempo porcentual para jubilación' : 'Tiempo para jubilación'},
            {value: this.expectedAgePercent, name: this.isPercent ? 'Tiempo porcentual con jubilación' : 'Tiempo con jubilacíon'},*/
            {value: Number((this.agePercent).toFixed(2)), name: this.isPercent ? 'Edad porcentual actual' : 'Edad actual'},
            {
              value: Number((this.retirementPercent).toFixed(2)),
              name: this.isPercent ? 'Tiempo porcentual para jubilación' : 'Tiempo para jubilación'
            },
            {
              value: Number((this.expectedAgePercent).toFixed(2)),
              name: this.isPercent ? 'Tiempo porcentual con jubilación' : 'Tiempo con jubilacíon'
            },
          ]
        }
      ]
    };
  }

}
