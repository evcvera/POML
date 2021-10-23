import {Component, Input, OnInit} from '@angular/core';
import {AvailableFiltersEntity} from '../../../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() filter: AvailableFiltersEntity;
  countItemsShow: number;

  constructor() {
  }

  ngOnInit(): void {
    this.countItemsShow = 9;
  }

  showAll(): void {
    this.countItemsShow = this.filter.values.length;
  }
}
