import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {ResultsEntity} from '../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.scss']
})
export class SalesItemComponent implements OnInit {

  private _resultsEntity: ResultsEntity;
  @Input('resultsEntity') set resultsEntity(value: ResultsEntity){
      this._resultsEntity = value;
  }

  get resultsEntity(): ResultsEntity {
    return this._resultsEntity;
  }

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
