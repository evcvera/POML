import { Component, OnInit } from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';

@Component({
  selector: 'app-current-dolar',
  templateUrl: './current-dolar.component.html',
  styleUrls: ['./current-dolar.component.scss']
})
export class CurrentDolarComponent implements OnInit {

  constructor(public casaModelService: CasaModelService) { }

  ngOnInit(): void {
  }

}
