import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-meli-filters',
  templateUrl: './meli-filters.component.html',
  styleUrls: ['./meli-filters.component.scss']
})
export class MeliFiltersComponent implements OnInit {

  constructor(public meliModelService: MeliModelService) { }

  ngOnInit(): void {
  }

}
