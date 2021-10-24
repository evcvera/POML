import {Component, Input, OnInit} from '@angular/core';
import {AvailableFiltersEntity, ValuesEntity2} from '../../../../../../core/interfaces/imeli-search';
import {MeliModelService} from '../../../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() filter: AvailableFiltersEntity;
  countItemsShow: number;

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.countItemsShow = 9;
  }

  showAll(): void {
    this.countItemsShow = this.filter.values.length;
  }

  addFilter(selectedFilter: ValuesEntity2): void{
    const aux: AvailableFiltersEntity = {};
    aux.name = this.filter.name;
    aux.id = this.filter.id;
    aux.type = this.filter.type;
    aux.values = [];
    console.log(this.meliModelService.selectedFilters$.value);
    aux.values.push(selectedFilter);
    this.meliModelService.selectedFilters$.value.push(aux);
    console.log(this.meliModelService.selectedFilters$.value);
    console.log(this.meliModelService.selectedFilters$.value);
    console.log(this.meliModelService.selectedFilters$.value);
    this.userDataModelService.pageNumber$.next(0);
    this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
      this.userDataModelService.pageNumber$.value,
      this.meliModelService.searchSortBy$.value);
  }
}
