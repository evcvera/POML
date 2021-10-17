import {Component, Input, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {IDollarInfo} from '../../../../core/interfaces/idollar-info';
import {ISideBarForm} from '../../../../core/interfaces/iside-bar-form';
import {IMetricCard} from '../../../../core/interfaces/imetric-card';
import {IMetricCardSubtitle} from '../../../../core/interfaces/imetric-card-subtitle';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-metrics',
  templateUrl: './user-metrics.component.html',
  styleUrls: ['./user-metrics.component.scss']
})
export class UserMetricsComponent implements OnInit {

  @Input() dollarInfo: IDollarInfo;
  formData: ISideBarForm;
  income: IMetricCard;
  incomeUsdByTime: IMetricCard;
  oficialProm: IMetricCard;
  blueProm: IMetricCard;
  savingCapacityIncomeUsdByTime: IMetricCard;
  savingCapacityOficialProm: IMetricCard;
  savingCapacityBlueProm: IMetricCard;
  savingCapacityIncome: IMetricCard;
  cardsInfo: IMetricCard[];
  cardSubInfo: IMetricCardSubtitle = {};
  userData: Subscription;

  localSavingCapacity: number;

  constructor(public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService,
              public datetime: DatePipe) {
  }

  ngOnInit(): void {
    if (this.userData) {
      this.userData.unsubscribe();
    }
    this.userData = this.userDataModelService.userData$.subscribe(x => {
      this.formData = x;
      this.localSavingCapacity = this.formData.isPercent ? (this.formData.salary * this.formData.savingCapacity / 100) : this.formData.savingCapacity;
      this.buildIncome();
      this.buildIncomeUsdByTime();
      this.buildOficialProm();
      this.buildBlueProm();
      this.buildSavingCapacityIncome();
      this.buildSavingCapacityIncomeUsdByTime();
      this.buildSavingCapacityOficialProm();
      this.buildSavingCapacityBlueProm();
    });
  }

  buildIncome(): IMetricCard {
    /*this.currentDate = new Date();
    this.titleLeft = 'DOLAR';
    this.titleRight = this.datetime.transform(this.currentDate, 'dd/MM/yyyy');*/
    const salary = this.transform(this.formData.salary);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.income = {
      leftTitle: `Ingresos a ${oppositionTypeSalary}`,
      rightTitle: `${salary} ${typeSalary}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial compra:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.oficialCompra).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.oficialCompra).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial venta:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.oficialVenta).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.oficialVenta).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial promedio:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.oficialProm).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.oficialProm).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue compra:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.blueCompra).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.blueCompra).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue venta:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.blueVenta).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.blueVenta).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.income.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue promedio:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.formData.salary * this.dollarInfo.blueProm).toFixed(0)) :
        this.transform((this.formData.salary / this.dollarInfo.blueProm).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.income;
  }

  buildIncomeUsdByTime(): IMetricCard {
    const salary = this.transform(this.formData.salary);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.incomeUsdByTime = {
      leftTitle: `Ingresos en ${typeSalary} por tiempo`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.incomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.formData.salary * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    return this.incomeUsdByTime;
  }

  buildOficialProm(): IMetricCard {
    const salary = this.transform(this.formData.salary);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.oficialProm = {
      leftTitle: `Ingresos en ${oppositionTypeSalary} oficial promedio`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.oficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.inverseOficialProm * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.oficialProm;
  }

  buildBlueProm(): IMetricCard {
    const salary = this.transform(this.formData.salary);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.blueProm = {
      leftTitle: `Ingresos en ${oppositionTypeSalary} blue promedio`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.blueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.inverseBlueProm * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.blueProm;
  }

  buildSavingCapacityIncome(): IMetricCard {
    //const savingCapacity = this.formData.isPercent ? (this.formData.salary * this.formData.savingCapacity / 100) : this.formData.savingCapacity;
    const salary = this.transform(this.localSavingCapacity);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.savingCapacityIncome = {
      leftTitle: `Ahorro a ${oppositionTypeSalary}`,
      rightTitle: `${salary} ${typeSalary}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial compra:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.oficialCompra).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.oficialCompra).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial venta:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.oficialVenta).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.oficialVenta).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial promedio:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.oficialProm).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.oficialProm).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue compra:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.blueCompra).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.blueCompra).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue venta:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.blueVenta).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.blueVenta).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityIncome.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue promedio:',
      rightSubtitle: this.formData.isDollar ?
        this.transform((this.localSavingCapacity * this.dollarInfo.blueProm).toFixed(0)) :
        this.transform((this.localSavingCapacity / this.dollarInfo.blueProm).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.savingCapacityIncome;
  }

  buildSavingCapacityIncomeUsdByTime(): IMetricCard {
    const salary = this.transform(this.localSavingCapacity);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.savingCapacityIncomeUsdByTime = {
      leftTitle: `Ahorro en ${typeSalary} por tiempo`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    this.savingCapacityIncomeUsdByTime.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.localSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${typeSalary}`,
    });

    return this.savingCapacityIncomeUsdByTime;
  }

  buildSavingCapacityOficialProm(): IMetricCard {
    const salary = this.transform(this.localSavingCapacity);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.savingCapacityOficialProm = {
      leftTitle: `Ahorro en ${oppositionTypeSalary} oficial promedio`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityOficialProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.inverseOficialPromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.savingCapacityOficialProm;
  }

  buildSavingCapacityBlueProm(): IMetricCard {
    const salary = this.transform(this.localSavingCapacity);
    const typeSalary = this.formData.isDollar ? `U$D` : `AR$`;
    const oppositionTypeSalary = !this.formData.isDollar ? `U$D` : `AR$`;
    this.savingCapacityBlueProm = {
      leftTitle: `Ahorro en ${oppositionTypeSalary} blue promedio`,
      rightTitle: ``,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],

    };

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Anual:',
      rightSubtitle: this.transform((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12)).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Mensual:',
      rightSubtitle: this.transform((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12).toFixed(0)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Semanal:',
      rightSubtitle: this.transform(((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 12) / 4).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Diario:',
      rightSubtitle: this.transform(((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232)).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Hora:',
      rightSubtitle: this.transform(((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours).toFixed(1)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    this.savingCapacityBlueProm.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Minuto:',
      rightSubtitle: this.transform((((this.inverseBluePromSavingCapacity * (this.formData.isDepenRelationship ? 13 : 12) / 232) / this.formData.dailyHours) / 60).toFixed(2)),
      typeOfCurrency: ` ${oppositionTypeSalary}`,
    });

    return this.savingCapacityBlueProm;
  }

  get inverseOficialProm(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.userDataModelService.userData$.value.salary * this.casaModelService.currentDollar$.value.oficialProm;
      } else {
        return this.userDataModelService.userData$.value.salary / this.casaModelService.currentDollar$.value.oficialProm;
      }
    } else {
      return 0;
    }
  }

  get inverseBlueProm(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.userDataModelService.userData$.value.salary * this.casaModelService.currentDollar$.value.blueProm;
      } else {
        return this.userDataModelService.userData$.value.salary / this.casaModelService.currentDollar$.value.blueProm;
      }
    } else {
      return 0;
    }
  }

  get inverseOficialPromSavingCapacity(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.localSavingCapacity * this.casaModelService.currentDollar$.value.oficialProm;
      } else {
        return this.localSavingCapacity / this.casaModelService.currentDollar$.value.oficialProm;
      }
    } else {
      return 0;
    }
  }

  get inverseBluePromSavingCapacity(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.localSavingCapacity * this.casaModelService.currentDollar$.value.blueProm;
      } else {
        return this.localSavingCapacity / this.casaModelService.currentDollar$.value.blueProm;
      }
    } else {
      return 0;
    }
  }

  public transform(value: any): string {
    if (value !== null) {
      const aux = value.toString().replace('.', ',');
      return aux.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
      return null;
    }
  }
}
