import { Component, OnInit } from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';

@Component({
  selector: 'app-price-dolar-peso',
  templateUrl: './price-dolar-peso.component.html',
  styleUrls: ['./price-dolar-peso.component.scss']
})
export class PriceDolarPesoComponent implements OnInit {

  constructor(public casaModelService: CasaModelService) { }

  ngOnInit(): void {
  }

}
