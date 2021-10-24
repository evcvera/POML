import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {CountryOrStateOrCityOrNeighborhoodOrAvailableSortsEntityOrPathFromRootEntityOrValuesEntityOrSort} from '../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-side-bar-filters',
  templateUrl: './side-bar-filters.component.html',
  styleUrls: ['./side-bar-filters.component.scss']
})
export class SideBarFiltersComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) { }

  ngOnInit(): void {
  }


  searchByCategory(category: CountryOrStateOrCityOrNeighborhoodOrAvailableSortsEntityOrPathFromRootEntityOrValuesEntityOrSort): void {
    this.meliModelService.categoryName$.next(category.name);
    this.meliModelService.selectedFilters$.next([]);
    this.meliModelService.searchSortBy$.next('relevance');
    this.meliModelService.searchByInput$.next(false);
    this.userDataModelService.pageNumber$.next(0);
    this.userDataModelService.searchDataByCategory$.next(category.id);
    this.userDataModelService.searchData$.next(category.id);
    /*this.meliModelService.meliSearch(this.userDataModelService.searchDataByCategory$.value,
      this.userDataModelService.pageNumber$.value);*/
  }

}
