import {Component, Input, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';
import {IDollarInfo} from '../../../../core/interfaces/idollar-info';
import {IMetricCard} from '../../../../core/interfaces/imetric-card';
import {IMetricCardSubtitle} from '../../../../core/interfaces/imetric-card-subtitle';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-current-dolar',
  templateUrl: './current-dolar.component.html',
  styleUrls: ['./current-dolar.component.scss']
})
export class CurrentDolarComponent implements OnInit {

  @Input() dollarInfo: IDollarInfo;

  currentDate: Date;
  titleLeft: string;
  titleRight: string;
  cardInfo: IMetricCard;
  cardSubInfo: IMetricCardSubtitle = {};

  constructor(public casaModelService: CasaModelService,
              public datetime: DatePipe) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.titleLeft = 'DOLAR';
    this.titleRight = this.datetime.transform(this.currentDate, 'dd/MM/yyyy');
    this.cardInfo = {
      leftTitle: 'DOLAR',
      rightTitle: this.datetime.transform(this.currentDate, 'dd/MM/yyyy'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at dolor, enim illum ipsam laborum\n' +
        '        laudantium natus necessitatibus nostrum pariatur possimus quod sequi similique tenetur, unde vel vitae\n' +
        '        voluptatem voluptates.',
      subtitleItems: [],
    };
    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial compra:',
      rightSubtitle: this.dollarInfo.oficialCompra,
      typeOfCurrency: '$',
    });

    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial venta:',
      rightSubtitle: this.dollarInfo.oficialVenta,
      typeOfCurrency: '$',
    });

    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Oficial promedio:',
      rightSubtitle: this.dollarInfo.oficialProm,
      typeOfCurrency: '$',
    });

    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue compra:',
      rightSubtitle: this.dollarInfo.blueCompra,
      typeOfCurrency: '$',
    });

    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue venta:',
      rightSubtitle: this.dollarInfo.blueVenta,
      typeOfCurrency: '$',
    });

    this.cardInfo.subtitleItems.push(this.cardSubInfo = {
      leftSubtitle: 'Blue promedio:',
      rightSubtitle: this.dollarInfo.blueProm,
      typeOfCurrency: '$',
    });
  }

}
